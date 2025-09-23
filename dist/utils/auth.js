import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db/config.js";
import {
  account,
  user,
  session,
  verification
} from "../db/schema/auth-schema.js";
const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification
    }
  }),
  trustedOrigins: ["http://localhost:3000", "http://localhost:3005"],
  socialProviders: {
    google: {
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      display: "wap"
    }
  }
});
export {
  auth
};
