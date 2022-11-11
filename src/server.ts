import express from "express";
import dotenv from "dotenv";
import { showUsers } from "./controllers/users.controller.js";
import {
	changeGuess,
	createGuess,
	excludeGuess,
	showGuesses,
} from "./controllers/guesses.controller.js";

dotenv.config();

const server = express();
server.use(express.json());

server.get("/users", showUsers);
server.post("/guess", createGuess);
server.get("/guess", showGuesses);
server.put("/guess", changeGuess);
server.delete("/guess", excludeGuess);

server.listen(4000, () => {
	console.log(`Running on port ${process.env.PORT}...`);
});
