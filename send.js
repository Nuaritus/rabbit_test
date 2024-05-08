const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost'); // Укажите ваш URL RabbitMQ
    const channel = await connection.createChannel();

    const exchangeName = 'bot_wb'; // Имя вашего существующего обменника
    const queueName = 'bot_q'; // Имя вашей существующей очереди

    // Убедитесь, что обменник существует
    await channel.checkExchange(exchangeName);

    // Убедитесь, что очередь существует
    await channel.checkQueue(queueName);

    console.log('Connected to RabbitMQ');
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

// // Использование
// connect().then((channel) => {
//   // Теперь вы можете использовать канал для публикации и подписки на сообщения
//   // Например, channel.publish(), channel.consume(), и т.д.
// });

module.exports = connect;
