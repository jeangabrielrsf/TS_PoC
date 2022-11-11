import { Request, Response } from "express";
import { Guess, GuessEntity } from "../protocols/guesses";
import {
	deleteGuess,
	insertGuess,
	selectAllGuesses,
	updateGuess,
} from "../repositories/guesses.repository.js";

async function createGuess(req: Request, res: Response) {
	try {
		const newGuess = req.body as Guess;
		const result = await insertGuess(newGuess);
		return res
			.send({ message: `created ${result.rowCount} guess` })
			.status(201);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

async function showGuesses(req: Request, res: Response) {
	try {
		const result = await selectAllGuesses();
		return res.send(result.rows);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

async function changeGuess(req: Request, res: Response) {
	try {
		const changedGoals = req.body as Partial<GuessEntity>;
		const result = await updateGuess(changedGoals);
		return res.send({ message: `changed ${result.rowCount} guess` });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

async function excludeGuess(req: Request, res: Response) {
	try {
		const guess = req.body as Partial<GuessEntity>;
		const result = await deleteGuess(guess);
		return res.send({ message: `deleted ${result.rowCount} guess` });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export { createGuess, showGuesses, changeGuess, excludeGuess };
