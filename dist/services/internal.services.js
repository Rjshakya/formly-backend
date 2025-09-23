import db from "../db/config.js";
import { eq } from "drizzle-orm";
import { account } from "../db/schema/auth-schema.js";
import logger from "../utils/logger.js";
import { auth } from "../utils/auth.js";
const accessToken = async (userId) => {
  try {
    const _acc = await db.select({
      accountId: account.id,
      accessToken: account.accessToken,
      providerId: account.providerId
    }).from(account)?.where(eq(account.userId, userId));
    const token = await auth.api?.getAccessToken({
      body: {
        providerId: _acc[0]?.providerId,
        accountId: _acc[0]?.accountId,
        userId
      }
    });
    logger.info(`returning access token`);
    return token.accessToken;
  } catch (e) {
    logger.error(`${JSON.stringify(e)}- accessToken`);
    throw new Error(JSON.stringify(e));
  }
};
export {
  accessToken
};
