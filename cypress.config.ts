import { defineConfig } from "cypress";
const { GoogleSocialLogin } = require("cypress-social-logins").plugins;

// Populate process.env with values from .env file
require("dotenv").config();

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on("task", {
        GoogleSocialLogin: GoogleSocialLogin,
      });
    },
  },
  env: {
    GOOGLE_USER: process.env.GOOGLE_USER,
    GOOGLE_PW: process.env.GOOGLE_PW,
    COOKIE_NAME: "next-auth.session-token",
    SITE_NAME: "http://localhost:3000",
  },
});
