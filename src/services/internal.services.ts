import db from "../db/config";
import { eq } from "drizzle-orm";
import { account } from "../db/schema/auth-schema";

import logger from "../utils/logger";
import { auth } from "../utils/auth";

export const accessToken = async (userId: string) => {
  try {
    const _acc = await db
      .select({
        accountId: account.id,
        accessToken: account.accessToken,
        providerId: account.providerId,
      })
      .from(account)
      ?.where(eq(account.userId, userId));

    const token = await auth.api?.getAccessToken({
      body: {
        providerId: _acc[0]?.providerId,
        accountId: _acc[0]?.accountId,
        userId: userId,
      },
    });

    // const isExpired = isExpiredfn(token.accessTokenExpiresAt!);

    // if (isExpired) {
    //   const refreshedtoken = await auth.api.refreshToken({
    //     body: {
    //       providerId: _acc[0]?.providerId,
    //       accountId: _acc[0]?.accountId,
    //       userId: userId,
    //     },
    //   });

    //   logger.info(`returning refreshed access token`);
    //   return refreshedtoken.accessToken;
    // }

    logger.info(`returning access token`);
    return token.accessToken;
  } catch (e) {
    logger.error(`${JSON.stringify(e)}- accessToken`);
    throw new Error(JSON.stringify(e));
  }
};