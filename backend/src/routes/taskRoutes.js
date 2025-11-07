const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const { auth } = require('../middleware/auth');
const upload = require('../utils/multerConfig');

const router = express.Router();

router.post('/', auth, upload.array('files', 5), [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('dueDate').isISO8601().withMessage('Please provide a valid due date'),
  body('priority').isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], taskController.createTask);

router.get('/', auth, taskController.getTasks);

router.get('/:id', auth, taskController.getTaskById);

router.put('/:id', auth, upload.array('files', 5), [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('dueDate').optional().isISO8601().withMessage('Please provide a valid due date'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
  body('status').optional().isIn(['Pending', 'In-Progress', 'Completed']).withMessage('Invalid status'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], taskController.updateTask);

router.delete('/:id', auth, taskController.deleteTask);

router.get('/:taskId/logs', auth, taskController.getTaskLogs);

module.exports = router;
