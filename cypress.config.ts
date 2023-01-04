import { defineConfig } from "cypress";
import { plugins } from "cypress-social-logins";

// Populate process.env with values from .env file
require("dotenv").config();

export default defineConfig({
  projectId: "97krk6",
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    setupNodeEvents(on) {
      on("task", {
        GoogleSocialLogin: plugins.GoogleSocialLogin,
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
