const amqp = require('amqplib');
const { createConsumer1 } = require('./consumer1');
const { createConsumer2 } = require('./consumer2');

async function startConsumer1() {
  try {
    const connection = await amqp.connect('amqp://localhost'); // Укажите ваш URL RabbitMQ
    const channel = await connection.createChannel();

    // Запуск консьюмера
    await createConsumer1(connection, channel);
  } catch (error) {
    console.error('Error starting consumer1:', error);
  }
}

async function startConsumer2() {
    try {
      const connection = await amqp.connect('amqp://localhost'); // Укажите ваш URL RabbitMQ
      const channel = await connection.createChannel();
  
      // Запуск консьюмера
      await createConsumer2(connection, channel);
    } catch (error) {
      console.error('Error starting consumer2:', error);
    }
  }

startConsumer1();
startConsumer2();