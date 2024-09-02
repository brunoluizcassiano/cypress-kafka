// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getListTopics', () => {
    return cy.task('getListTopics')
});

Cypress.Commands.add('consumeKafkaGetPartitionCount', (topic) => {
    return cy.task('consumeKafkaGetPartitionCount', topic)
});

Cypress.Commands.add('consumeKafkaGetLatesOffset', (topic, partition) => {
    return cy.task('consumeKafkaGetLatesOffset', { topic, partition })
});

Cypress.Commands.add('fetchConsumerGroupOffsets', (topic) => {
    return cy.task('fetchConsumerGroupOffsets', topic)
});

Cypress.Commands.add('listGroups', () => {
    return cy.task('listGroups')
});

Cypress.Commands.add('deleteGroups', (groupId) => {
    return cy.task('deleteGroups', groupId)
});

Cypress.Commands.add('consumeFromSpecificOffset', (topic, partition, offsetst) => {
    return cy.task('consumeFromSpecificOffset', { topic, partition, offsetst })
});