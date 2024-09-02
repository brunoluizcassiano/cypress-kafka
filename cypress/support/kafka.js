// const { Kafka } = require('kafkajs');

// const kafka = new Kafka({
//     clientId: 'app-cypress-automation-test',
//     brokers: ['localhost:9092'], // Certifique-se de que esta configuração está correta para o seu broker
// });

// const consumer = kafka.consumer({ 
//     groupId: 'my-gael',
//     sessionTimeout: 300000, // 5 minutos
//     heartbeatInterval: 5000, // Envia heartbeats a cada 5 segundos
// });

// const run = async () => {
//     // Conecte o consumidor
//     await consumer.connect();

//     // Subscreva ao tópico customer_topic
//     await consumer.subscribe({ topic: 'customer_topic', fromBeginning: true });

//     // Consuma as mensagens
//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log({
//                 partition,
//                 offset: message.offset,
//                 value: message.value.toString(),
//             });
//         },
//     });

// };

// // Captura erros e tenta reconectar
// consumer.on(consumer.events.CRASH, async (event) => {
//     console.error('Error in consumer:', event.payload.error);
//     console.log('Trying to reconnect...');
//     await consumer.disconnect();
//     await run();
// });

// run().catch(e => console.error(`[KafkaJS] Error: ${e.message}`, e));


// const { Kafka } = require('kafkajs');

// const kafka = new Kafka({
//     clientId: 'app-cypress-automation-test',
//     brokers: ['localhost:9092'],
// });

// const consumer = kafka.consumer({ 
//     groupId: 'group-cypress-gael2',
//     sessionTimeout: 300000, // 5 minutos
// });

// const run = async () => {
//     await consumer.connect();
//     await consumer.subscribe({ topic: 'customer_topic', fromBeginning: true });

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log({
//                 partition,
//                 offset: message.offset,
//                 value: message.value.toString(),
//             });
//         },
//     });
// };

// // Captura erros e tenta reconectar
// consumer.on(consumer.events.CRASH, async (event) => {
//     console.error('Error in consumer:', event.payload.error);
//     console.log('Trying to reconnect...');
//     await consumer.disconnect();
//     await run();
// });

// // Manuseio de sinais de encerramento do processo para desconectar o consumidor
// const gracefulShutdown = async () => {
//     try {
//         console.log('Disconnecting consumer...');
//         await consumer.disconnect();
//         console.log('Consumer disconnected successfully.');
//     } catch (error) {
//         console.error('Error while disconnecting consumer:', error);
//     } finally {
//         process.exit(0);
//     }
// };

// // Captura sinais de encerramento para desconectar o consumidor adequadamente
// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);

// // run().catch(e => console.error(`[KafkaJS] Error: ${e.message}`, e));

// run()
//   .then(() => console.log('Consumer running'))
//   .catch(async e => {
//     console.error(`[KafkaJS] Error: ${e.message}`, e);
//     await consumer.disconnect();
//   });


// const { Kafka } = require('kafkajs');

// const kafka = new Kafka({
//     clientId: 'app-cypress-automation-test',
//         brokers: ['localhost:9092'],
//         connectionTimeout: 180000,
//         requestTimeout: 180000,
//         authenticationTimeout: 180000
// });

// const consumer = kafka.consumer({ 
//     groupId: 'group-cypress-bruno-test',
//     sessionTimeout: 300000, // 5 minutos
// });

// const run = async () => {
//     await consumer.connect();
//     await consumer.subscribe({ topic: 'customer_topic', fromBeginning: true });

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log({
//                 partition,
//                 offset: message.offset,
//                 value: message.value.toString(),
//             });
//         },
//     });
// };

// // Função para finalizar a conexão e sair do grupo
// const gracefulShutdown = async () => {
//     try {
//         console.log('Iniciando desconexão do consumidor...');
//         await consumer.stop();  // Para garantir que o consumidor pare de consumir
//         await consumer.disconnect();  // Desconecta após parar
//         console.log('Consumidor desconectado com sucesso.');
//     } catch (error) {
//         console.error('Erro ao desconectar o consumidor:', error);
//     } finally {
//         process.exit(0);  // Encerra o processo de forma segura
//     }
// };

// // Captura erros e tenta reconectar
// consumer.on(consumer.events.CRASH, async (event) => {
//     console.error('Erro no consumidor:', event.payload.error);
//     console.log('Tentando reconectar...');
//     await gracefulShutdown();  // Desconecta e encerra corretamente
//     await run();  // Reinicia o consumidor
// });

// // Manuseio de sinais de encerramento do processo
// process.on('SIGINT', gracefulShutdown);  // Ctrl+C no terminal
// process.on('SIGTERM', gracefulShutdown);  // Sinal de término do processo

// run().catch(e => console.error(`[KafkaJS] Erro: ${e.message}`, e));


// const { Kafka } = require('kafkajs');

// const kafka = new Kafka({
//     clientId: 'app-cypress-automation-test',
//     brokers: ['localhost:9092'],
// });

// const consumer = kafka.consumer({
//     groupId: 'group-cypress-luh-bruno-gael',
//     // sessionTimeout: 300000, // 5 minutos
// });

// let isConsuming = true;

// const run = async () => {
//     await consumer.connect();
//     await consumer.subscribe({ topic: 'customer_topic', fromBeginning: true });

//     consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log({
//                 partition,
//                 offset: message.offset,
//                 value: message.value.toString(),
//             });

//             // Condição para parar após ler um número específico de mensagens
//             if (message.offset === '10') {  // Ajuste conforme necessário
//                 console.log('Número limite de mensagens consumidas. Finalizando...');
//                 // isConsuming = false;
//                 await consumer.stop();  // Certifique-se de parar o consumidor primeiro
//                 consumer.disconnect();
//                 await stopConsumer();
//             }
//         },
//     });

// };

// // Função para parar o consumidor e desconectar
// const stopConsumer = async () => {
//     try {
//         if (isConsuming) {
//             console.log('Parando o consumidor...');
//             await consumer.stop();  // Certifique-se de parar o consumidor primeiro
//             console.log('Consumidor parado.');
//         }
//         await consumer.disconnect();
//         console.log('Consumidor desconectado com sucesso.');
//         process.exit(0); // Finaliza o processo após desconectar
//     } catch (error) {
//         console.error('Erro ao desconectar o consumidor:', error);
//         process.exit(1);  // Encerra com erro
//     }
// };

// // Captura sinais de encerramento para finalizar o consumidor
// process.on('SIGINT', stopConsumer);
// process.on('SIGTERM', stopConsumer);

// run().catch(async (e) => {
//     console.error(`[KafkaJS] Erro: ${e.message}`, e);
//     await stopConsumer();
// });


const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'app-cypress-automation-test',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ 
    groupId: 'luh-group-cypress',
    sessionTimeout: 300000, // 5 minutos
});

const maxMessages = 10; // Defina o limite de mensagens que deseja consumir
let messageCount = 0;  // Contador de mensagens

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'customer_topic', fromBeginning: true });

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });

            messageCount++;

            if (messageCount >= maxMessages) {
                console.log('Número limite de mensagens consumidas. Finalizando...');
                await consumer.disconnect();
                process.exit(0);  // Força a saída do processo após a desconexão
            }
        },
    });
};

// Captura erros e tenta reconectar
consumer.on(consumer.events.CRASH, async (event) => {
    console.error('Error in consumer:', event.payload.error);
    console.log('Trying to reconnect...');
    await consumer.disconnect();
    await run();
});

run().catch(e => console.error(`[KafkaJS] Error: ${e.message}`, e));
