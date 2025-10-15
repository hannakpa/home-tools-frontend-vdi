import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  ///en  cypress.config.ts, los reportes se generan automáticamente en: /cypress/reports/html
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportPageTitle: "My Cypress Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
    html: true,
    json: true,
    screenshotOnRunFailure: true,
    saveAllAttempts: true,
  },
  e2e: {
    baseUrl: "http://localhost:4200",
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ):Promise<Cypress.PluginConfigOptions>{
      //add cucumber plug in
      await addCucumberPreprocessorPlugin(on, config);
      //  Import dinámico compatible con TS
      //await import("cypress-mochawesome-reporter/plugin").then((plugin) => plugin.default(on));
      //configurar el preprocesador de ESBuild
      on(
        "file:preprocessor",
        createBundler({
        plugins: [createEsbuildPlugin(config)],
      })
      );
    //plugin de mockawesome
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },
  },
});
