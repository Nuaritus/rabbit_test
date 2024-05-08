const amqp = require('amqplib');

let channel; // Переменная для хранения канала

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost'); // Укажите ваш URL RabbitMQ
    channel = await connection.createChannel();

    const exchangeName = 'bot_wb'; // Имя вашего существующего обменника
    const queueName = 'bot_q'; // Имя вашей существующей очереди

    // Убедитесь, что очередь существует
    await channel.assertQueue(queueName, { durable: true });

    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

async function sendMessage(queueName, message) {
  try {
    if (!channel) {
      await connect(); // Создаем канал, если его нет
    }

    // Отправка сообщения в очередь
    channel.sendToQueue(queueName, Buffer.from(message));

    console.log('Message sent successfully:', message);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Экспортируем функцию sendMessage для доступа из других файлов
module.exports = {
  sendMessage,
};
