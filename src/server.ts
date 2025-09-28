import { httpServerHandler } from "cloudflare:node";
import { app } from "./app";

const port = Number(process.env.PORT);
app.listen(port);
export default httpServerHandler({ port });
