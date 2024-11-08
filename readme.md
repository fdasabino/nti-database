# Documentation for Hono Node Server Application

This documentation describes the components and functionality of a Hono-based server application that retrieves and serves student records and school lunch information from various endpoints. The server uses PostgreSQL for data storage and connects to external RSS feeds for real-time lunch updates.

Table of Contents
Setup
Configuration
Middleware
Endpoints
GET /
GET /students/:id
GET /mat
GET /mat/weeks
Server Startup
Setup
This server is built using the Hono framework and uses PostgreSQL for data management. The postgres module manages the database connection, and hono/cors enables cross-origin requests.

Required Dependencies
Install the necessary dependencies before starting:

Kopiera kod
npm install hono postgres
Ensure you have a running PostgreSQL instance and configure access for the server.

Configuration
The following environment variables need to be set up for proper operation:

host: The database host, set to "db".
port: The PostgreSQL server port, set to 5432.
username: The database username, here "postgres".
password: The password for the database, here "melker".
database: The name of the database, here "ntipeople".
These parameters establish a connection to a PostgreSQL database instance named ntipeople.

Middleware
The application uses the following middleware:

CORS (Cross-Origin Resource Sharing): Configured to allow all origins and standard HTTP methods (GET, POST, PUT, DELETE, and OPTIONS) to access the server’s endpoints. This enables the server to be accessible across different domains.
Endpoints
GET /
Provides a default route with instructions for available API paths.

Description: Informs the user of available resources with a message.
Response: Returns a 200 OK status and a text message with guidance on API usage.
GET /students/:id
Fetches student records based on a provided student ID.

Description: Retrieves student records from the database where the ID matches the provided parameter, with case-insensitive partial matching.
Parameter: id (string) - Student ID or a partial ID.
Example Request: GET /students/sod21051
Response: Returns a 200 OK status and a JSON array of matching student records.
GET /mat
Fetches the school lunch menu for today and tomorrow.

Description: Uses an RSS feed to fetch lunch information and parses it into JSON format.
External Source: https://skolmaten.se/nti-gymnasiet-sodertorn/rss/days/?limit=2
Example Request: GET /mat
Response: Returns a 200 OK status and a JSON object with today’s and tomorrow’s lunch menu.
GET /mat/weeks
Fetches the school lunch menu for the week.

Description: Uses an RSS feed to fetch weekly lunch information and parses it into JSON format.
External Source: https://skolmaten.se/nti-gymnasiet-sodertorn/rss/weeks/
Example Request: GET /mat/weeks
Response: Returns a 200 OK status and a JSON object with the weekly lunch menu.
Server Startup
The server is configured to listen on port 1337. Once started, it is accessible via http://localhost:1337.

Run Command
To start the server, use the following command:

php
Kopiera kod
node <filename>.js
Replace <filename> with the name of the file containing the server code.

Notes
Ensure rssParse.js contains the appropriate RSS parsing logic to handle the feeds.
Adjust database and server settings as required by your deployment environment.
