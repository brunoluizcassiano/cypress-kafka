const { Kafka, logLevel } = require('kafkajs')
let messages = [];

module.exports = (on, config) => {

    const kafka = new Kafka({
        clientId: 'app-cypress-automation-test',
        brokers: ['localhost:9092'],
        // logLevel: logLevel.DEBUG,
        connectionTimeout: 60000,
        requestTimeout: 60000
    });

    const consumer = kafka.consumer(
        {
            groupId: 'group-cypress-automation-test4',
            sessionTimeout: 180000
        }
    );

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function disconnect() {
        await delay(500)
        await consumer.stop();
        await consumer.disconnect();
    }
    
    async function getListTopics() {
        const admin = kafka.admin();
        await admin.connect();
        const listTopics = await admin.listTopics();
        return listTopics;
    }

    async function getPartition(topic) {
        const admin = kafka.admin();
        await admin.connect();
        const metadata = await admin.fetchTopicMetadata({ topic: [topic] });
        const topicMetadata = metadata.topics.find(t => t.name === topic);
        const partitionCount = topicMetadata.partitions.length;
        await admin.disconnect();
        console.log(partitionCount);
        return partitionCount;
    };

    async function getLatesOffset(topic) {
        const admin = kafka.admin();
        await admin.connect();
        const offsets = await admin.fetchTopicOffsets(topic); // Corrigido: use a variável 'topic' em vez de 'product_topic'
        const partitionOffsets = offsets.find(p => p.partition === partitionTopic); // Verifica a partição correta
        const latestOffset = partitionOffsets ? partitionOffsets.offset : null; // Acessa o offset correto
        await admin.disconnect();
        return latestOffset;
    }

    async function getFetchConsumerGroupOffsets(topic) {
        const admin = kafka.admin();
        await admin.connect();
        const returnConsumerGroup = await admin.fetchOffsets({ groupId: 'group-cypress', topics: [topic] })
        await admin.disconnect();
        return returnConsumerGroup;
    }

    async function listGroups() {
        const admin = kafka.admin();
        await admin.connect();
        const listGroups = await admin.listGroups()
        await admin.disconnect();
        return listGroups;
    }

    async function deleteGroups(groupId) {
        const admin = kafka.admin();
        await admin.connect();
        const deleteGroups = await admin.deleteGroups([groupId])
        await admin.disconnect();
        return deleteGroups;
    }

    async function consumeFromSpecificOffset(topic, partition, offset) {

        await consumer.connect();
        await consumer.subscribe({ topic: 'customer_topic', fromBeginning: true });
        
        const messages = [];

        await consumer.run({
            autoCommit: false,
            eachMessage: async ({ topic, partition: msgPartition, message }) => {
                if (msgPartition === partition) {
                    console.log({
                        partition: msgPartition,
                        offset: message.offset,
                        value: message.value.toString(),
                    });
                    messages.push(message.value.toString());
                }
            },
        });

        await disconnect();
        return messages;
    }

    on('task', {
        async getListTopics() {
            return await getListTopics();
        }
    });

    on('task', {
        async consumeKafkaGetPartitionCount(topic) {
            return await getPartition(topic);
        }
    });

    on('task', {
        async consumeKafkaGetLatesOffset({ topic, partition }) {
            return await getLatesOffset(topic, partition);
        }
    });

    on('task', {
        async fetchConsumerGroupOffsets(topic) {
            return await getFetchConsumerGroupOffsets(topic);
        }
    });

    on('task', {
        async listGroups() {
            return await listGroups();
        }
    });

    on('task', {
        async deleteGroups(groupId) {
            return await deleteGroups(groupId);
        }
    });

    on('task', {
        async consumeFromSpecificOffset({ topic, partition, offsets }) {
            return await consumeFromSpecificOffset(topic, partition, offsets);
        }
    });

    return config;
}