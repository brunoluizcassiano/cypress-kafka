Feature: kafka

    @corporate @TRBC-T884 @COE
    Scenario: Validar mensagem no topico do kafka
        Given que foi realizado uma comunicacao
        When a transacao esta no topico
        Then eu valido a mensagem com cypress