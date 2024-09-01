const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

const kafkaPlugin = require('./cypress/support/kafkaConsumer');

module.exports = defineConfig({
  e2e: {
    retries: 0,
    responseTimeout: 30000,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/features/execution/*.feature',
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      });

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);

      kafkaPlugin(on, config);
      return config
    },
  },
});
