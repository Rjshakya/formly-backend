// import { google } from "googleapis";
// import logger from "../../../utils/logger.js";

// export class GoogleService {
//   private auth: any;
//   constructor(accessToken: string) {
//     this.auth = new google.auth.OAuth2();
//     this.auth.setCredentials({
//       access_token: accessToken,
//     });
//   }

//   private async commonErr(e: unknown) {
//     logger.error(`${e}`);
//     throw e
//   } 

//   async getSheet() {
//     const sheets = google.sheets({ version: "v4", auth: this.auth });
//     return sheets;
//   }

//   async createSpreadSheets(title: string) {
//     try {
//       const sheets = (await this.getSheet()).spreadsheets.create({
//         requestBody: {
//           properties: {
//             title,
//           },
//         },
//         auth: this.auth,
//       });

//       return sheets;
//     } catch (error) {
//       this.commonErr(error);
//     }
//   }

//   async appendValues({
//     spreadsheetId,
//     value,
//     range,
//     values,
//   }: {
//     spreadsheetId: string;
//     value?: string[];
//     range: string;
//     values?: string[][];
//   }) {
//     try {
//       const sheets = await this.getSheet();
//       const res = await sheets.spreadsheets.values.append({
//         spreadsheetId,
//         range: range,
//         valueInputOption: "USER_ENTERED",
//         requestBody: {
//           values: values || [value!],
//         },
//       });

//       return res.ok;
//     } catch (e) {
//       this.commonErr(e);
//     }
//   }

//   async updateValues({
//     spreadsheetId,
//     heads,
//     range,
//   }: {
//     spreadsheetId: string;
//     heads: string[];
//     range?: string;
//   }) {
//     if (!heads) return;
//     try {
//       const sheets = await this.getSheet();
//       const res = await sheets.spreadsheets.values.update({
//         spreadsheetId,
//         range: range || "Sheet1!A1",
//         valueInputOption: "USER_ENTERED",
//         requestBody: {
//           values: [heads],
//         },
//       });

//       return res?.ok;
//     } catch (e) {
//       this.commonErr(e);
//     }
//   }

//   async clearAllValues(spreadsheetId: string) {
//     try {
//       const sheets = await this.getSheet();
//       await sheets.spreadsheets.values.clear({
//         spreadsheetId,
//         range: `Sheet1`,
//       });

//       return true;
//     } catch (e) {
//       this.commonErr(e);
//     }
//   }
// }
