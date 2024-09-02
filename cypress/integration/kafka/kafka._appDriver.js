const topic = 'customer_topic';

class appDriveKafka {

    getMessageTopic() {
        
        // cy.getListTopics().then((listTopics) => {
        //     cy.log(`listTopics: ${listTopics}`);
        // })

        // cy.consumeKafkaGetPartitionCount(topic).then((partition) => {
        //         cy.log(`partition: ${partition}`);
        //     })

        // cy.consumeKafkaGetLatesOffset(topic, 1).then((offset) => {
        //     cy.log(`offset: ${offset}`);
        // })

        // cy.fetchConsumerGroupOffsets(topic).then((messageTopic) => {
        //     cy.log(`messageTopic: ${messageTopic}`);
        // })

        // cy.listGroups().then((listGroups) => {
        //     cy.log(`listGroups: ${JSON.stringify(listGroups)}`);
        // })

        // cy.deleteGroups('group-cypress-luh-bruno-gael2').then((deleteGroups) => {
        //     cy.log(`deleteGroups: ${JSON.stringify(deleteGroups)}`);
        // })

        cy.consumeFromSpecificOffset(topic, 0, 1).then((messageTopic) => {
                cy.log(`messageTopic: ${messageTopic}`);
            })
    }

}

export default appDriveKafka