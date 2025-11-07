const mongoose = require('mongoose');

const taskLogSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['Created', 'Updated', 'StatusChanged', 'Deleted'],
    required: true
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

taskLogSchema.index({ taskId: 1, timestamp: -1 });
taskLogSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('TaskLog', taskLogSchema);
