class appDriveKafka {

    getMessageTopic(topic) {
        cy.consumeFromSpecificOffset(topic, 0, 5)
    }

}

export default appDriveKafka