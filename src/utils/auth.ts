// import "dotenv/config"
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db/config.js";
import {
  account,
  user,
  session,
  verification,
} from "../db/schema/auth-schema.js";

const trusted_url = process.env.FRONTEND_URL

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      account,
      session,
      verification,
    },
  }),
  trustedOrigins: [trusted_url],
  socialProviders: {
    google: {
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      accessType: "offline",
      display: "wap",
    },
  },

});
