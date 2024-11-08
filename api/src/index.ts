import { serve } from "@hono/node-server";
import { Hono } from "hono";
import postgres from "postgres";
import { parseRSS } from "./rssParse.js";
import { cors } from "hono/cors";

const sql = postgres({
	host: "db",
	port: 5432,
	username: "postgres",
	password: "melker",
	database: "ntipeople",
});

const app = new Hono();

app.use(
	"*",
	cors({
		origin: "*", // Allow all origins
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
		allowHeaders: ["Content-Type", "Authorization"], // Allowed headers
		credentials: true, // Allow credentials (cookies, auth headers)
	})
);

app.get("/", (c) => {
	return c.text(`
		Attention: Your request appears to be misdirected.

		The intended resources may be accessed via the following paths:

		For student records, please navigate to /students/{student_id} (example format: /students/sod21051).

		For todays and tomorrows school lunch use /mat and for weekly school lunch use /mat/weeks
	`);
});

app.get("/students/:id", async (c) => {
	const query = c.req.param("id");
	const students = await sql`
    SELECT * 
    FROM people
    WHERE id ILIKE ${"%" + query + "%"}
  `;

	return c.json(students[0]);
});

app.get("/mat", async (c) => {
	const response = await fetch(
		"https://skolmaten.se/nti-gymnasiet-sodertorn/rss/days/?limit=2"
	);
	const text = await response.text();
	const rssJson = parseRSS(text);

	rssJson.items[0].description =
		rssJson.items[0].description +
		"<div style='color:green; font-size: 32rem'></div>";
	return c.json(rssJson);
});

app.get("/mat/weeks", async (c) => {
	const response = await fetch(
		"https://skolmaten.se/nti-gymnasiet-sodertorn/rss/weeks/"
	);
	const text = await response.text();
	const rssJson = parseRSS(text);
	return c.json(rssJson);
});

const port = 1337;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
