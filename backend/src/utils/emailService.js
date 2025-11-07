// emailService.js
require('dotenv').config();               // ensure envs are loaded here too
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,            // should be 'smtp.gmail.com'
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,                          // STARTTLS on 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS           // 16-char app password, NO SPACES
  }
});

// Log + verify so we can see what's actually used
(async () => {
  console.log('[MAIL] host:', process.env.SMTP_HOST, 'port:', process.env.SMTP_PORT);
  console.log('[MAIL] user:', process.env.SMTP_USER);
  try {
    await transporter.verify();
    console.log('[MAIL] SMTP ready');
  } catch (e) {
    console.error('[MAIL] verify error:', e.message);
  }
})();

const sendTaskNotification = async (task, userEmail) => {
  try {
    await transporter.sendMail({
      from: `"Task Manager" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Task Created: ${task.title}`,
      html: `
        <h2>New Task Created</h2>
        <p><strong>Title:</strong> ${task.title}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
        <p><strong>Created by:</strong> ${userEmail}</p>
        <p><strong>Description:</strong> ${task.description || 'N/A'}</p>
        <hr />
        <p>Task ID: ${task._id}</p>
      `
    });
  } catch (err) {
    console.error('Email sending failed:', err.message);
  }
};

module.exports = { sendTaskNotification };
