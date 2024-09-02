import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import AppDriverKafka from './kafka._appDriver';
const appDriverKafka = new AppDriverKafka;

Given("que foi realizado uma comunicacao", () => {
    appDriverKafka.getMessageTopic();
})

When("a transacao esta no topico", () => {
    cy.log('teste');
})

Then("eu valido a mensagem com cypress", () => {
    cy.log('teste');
})