const amqp = require('amqplib');

async function createConsumer2(connection, channel) {
  try {
    const queueName = 'bot_q'; // Имя вашей очереди

    // Убедитесь, что очередь существует
    await channel.assertQueue(queueName, { durable: true });

    // Определение обработчика сообщений
    channel.consume(queueName, (message) => {
      if (message !== null) {
     

        setTimeout(() => {
          console.log('Received message2:', message.content.toString());
          // Здесь вы можете обработать сообщение как вам угодно
          // Например, сохранить в базу данных, отправить ответ клиенту и т. д.
          
          // Подтверждение получения сообщения
          channel.ack(message);
          console.log('Timeout expired2');
        }, 5000);
      }
    });

    console.log('Consumer2 started');
  } catch (error) {
    console.error('Error connecting2 to RabbitMQ:', error);
  }
}

module.exports = {
  createConsumer2
};