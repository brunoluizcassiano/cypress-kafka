const { Kafka } = require('kafkajs')

module.exports = (on, config) => {

    const kafka = new Kafka({
        clientId: 'app-cypress-automation-test',
        brokers: ['localhost:9092'],
      })

    async function getPartition(topic) {
        const admin = kafka.admin();
        await admin.connect();
        const metadata = await admin.fetchTopicMetadata({ topic: [topic] });
        const topicMetadata = metadata.topics.find(t => t.name === topic);
        const partitionCount = topicMetadata.partitions.lenght;
        await admin.disconnect();
        console.log(partitionCount);
        return partitionCount;
    };

    async function getLatesOffset(topic, partition) {
        const admin = kafka.admin();
        await admin.connect();
        const offsets = await admin.fetchTopicOffsets(topic);
        const partitionOffsets = offsets.find(p => p.partition === partition);
        const latestOffset = partitionOffsets.high;
        await admin.disconnect();
        return latestOffset;
    }

    async function consumeFromSpecificOffset(topic, partition, offsets) {
        const consumer = kafka.consumer(
            {
                groupId: 'cypress-automation-test-group',
                sessionTimeout: 90000
            }
        );

        await consumer.connect();
        await consumer.subscribe({ topic: topic, fromBeginning: false });
        const message = [];
        await consumer.run({
            eachMessage: async ({ topic, partition: msgPartition, message}) => {
                if(msgPartition === partition) {
                    message.push({
                        partition: msgPartition,
                        offset: message.offset,
                        value: message.value.toString()
                    });
                }
            }
        })

        consumer.disconnect
        return message
    }

    on('task', {
        async consumeKafkaGetPartitionCount(topic) {
            return await getPartition(topic);
        }
    });

    on('task', {
        async consumeKafkaGetLatesOffset(topic, partition) {
            return await getLatesOffset(topic, partition);
        }
    });

    on('task', {
        async consumeFromSpecificOffset(topic, partition, offsets) {
            return await consumeFromSpecificOffset(topic, partition, offsets);
        }
    });

    return config;
}