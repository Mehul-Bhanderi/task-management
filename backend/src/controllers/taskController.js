const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const TaskLog = require('../models/TaskLog');
const User = require('../models/User');
const { sendTaskNotification } = require('../utils/emailService');

const createLog = async (taskId, userId, action, changes = {}) => {
  try {
    await TaskLog.create({
      taskId,
      userId,
      action,
      changes
    });
  } catch (error) {
    console.error('Error creating task log:', error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, dueDate, priority, tags } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      tags: tags || [],
      createdBy: req.user.id,
      files: []
    });

    if (req.files && req.files.length > 0) {
      task.files = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      }));
    }

    await task.save();
    await createLog(task._id, req.user.id, 'Created');

    const user = await User.findById(req.user.id);
    await sendTaskNotification(task, user.email);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      priority,
      status,
      dueDateFrom,
      dueDateTo,
      search,
      sort = '-createdAt'
    } = req.query;

    let filter = {};

    if (req.user.role !== 'admin') {
      filter.createdBy = req.user.id;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (status) {
      filter.status = status;
    }

    if (dueDateFrom || dueDateTo) {
      filter.dueDate = {};
      if (dueDateFrom) {
        filter.dueDate.$gte = new Date(dueDateFrom);
      }
      if (dueDateTo) {
        filter.dueDate.$lte = new Date(dueDateTo);
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await Task.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'email firstName lastName');

    const total = await Task.countDocuments(filter);

    res.json({
      success: true,
      data: tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('createdBy', 'email firstName lastName');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (req.user.role !== 'admin' && task.createdBy._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to view this task' });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this task' });
    }

    const oldStatus = task.status;
    const updates = req.body;

    Object.assign(task, updates);

    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      }));
      task.files = [...task.files, ...newFiles];
    }

    await task.save();

    const changes = {};
    if (oldStatus !== task.status) {
      changes.status = { old: oldStatus, new: task.status };
    }
    Object.keys(updates).forEach(key => {
      if (key !== 'files' && updates[key] !== task[key]) {
        changes[key] = updates[key];
      }
    });

    const action = oldStatus !== task.status ? 'StatusChanged' : 'Updated';
    await createLog(task._id, req.user.id, action, changes);

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);
    await createLog(req.params.id, req.user.id, 'Deleted');

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getTaskLogs = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to view task logs' });
    }

    const logs = await TaskLog.find({ taskId })
      .sort('-timestamp')
      .populate('userId', 'email firstName lastName');

    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskLogs
};
