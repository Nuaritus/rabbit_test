const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const rabbitmq = require('./rabbit_mq');

router.post('/send-message', async (req, res) => {
  const { queueName = 'bot_q', message } = req.body;

  if (!queueName || !message) {
    console.log({ error: 'Message is required' });
    return res.status(400).json({ error: 'Message is required' });
  }

  let messageToSend;

  if (Array.isArray(message)) {
    // Если сообщение - это массив, преобразуем его в строку JSON
    messageToSend = JSON.stringify(message);
  } else {
    // В противном случае просто используем сообщение как есть
    messageToSend = typeof message === 'number' ? message.toString() : message;
  }

  rabbitmq.sendMessage(queueName, messageToSend);

  console.log({ success: true, message: 'Message sent successfully' });
  return res.json({ success: true, message: 'Message sent successfully' });
});

module.exports = router;
