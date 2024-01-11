import { createServer, IncomingMessage, ServerResponse } from "http";
import { createClient } from "redis";
import { readFile } from "fs/promises";
import { resolve } from "path";

const client = createClient({
  password: Bun.env.REDIS_PASSWORD,
  socket: {
    host: Bun.env.REDIS_HOST,
    port: 17835,
  },
});

const serverAddress = "0.0.0.0";
const serverPort = 12000;

client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await client.connect();

  createServer(async (req: IncomingMessage, res: any) => {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );

    try {
      if (path === "/index.html") {
        // Serve the index.html file
        const htmlContent = await readFile(
          resolve(__dirname, "index.html"),
          "utf-8"
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(htmlContent);
        return;
      }

      if (path === "/facts") {
        const count = await client.get("counter");
        const id = getRandomInt(count);
        const factid = "cat:" + id;
        const value = await client.get(factid);
        console.log(value);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(value));
        return;
      }

      if (path === "/submit-fact" && req.method === "POST") {
        const body: Uint8Array[] = [];
        req.on("data", (chunk) => body.push(chunk));
        req.on("end", async () => {
          const requestBody = JSON.parse(Buffer.concat(body).toString());
          const newFact = requestBody.fact;
          const currentID = await client.get("counter");
          // Store the new fact in Redis
          const newFactId = "cat:" + currentID;
          await client.set(newFactId, newFact);
          await client.incr("counter");

          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Fact submitted successfully!");
        });
        return;
      }

      // Handle other routes or return a 404 response
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }).listen(serverPort, serverAddress, () => {
    console.log(`Server is running on http://${serverAddress}:${serverPort}`);
  });
})();

function getRandomInt(max: any): any {
  return Math.floor(Math.random() * max);
}
