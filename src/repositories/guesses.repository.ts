import { QueryResult } from "pg";
import connection from "../database/database.js";
import { Guess, GuessEntity } from "../protocols/guesses.js";

async function insertGuess(guess: Guess): Promise<QueryResult<GuessEntity>> {
	const response = await connection.query(
		`
        INSERT INTO guesses 
        (
            "teamAId", 
            "teamAGoals", 
            "teamBId", 
            "teamBGoals", 
            "userId"
            ) 
        VALUES 
        ($1, $2, $3, $4, $5);
    `,
		[
			guess.teamAId,
			guess.teamAGoals,
			guess.teamBId,
			guess.teamBGoals,
			guess.userId,
		]
	);
	return response;
}

async function selectAllGuesses(): Promise<QueryResult<GuessEntity>> {
	const response = await connection.query(`
        SELECT 
            guesses.id,
            tA.team AS "teamA", 
            guesses."teamAGoals",
            tB.team AS "teamB",
            guesses."teamBGoals",
            users.name
        FROM guesses
        JOIN teams tA ON tA.id = guesses."teamAId"
        JOIN teams tB ON tB.id = guesses."teamBId"
        JOIN users ON users.id = guesses."userId"
        ; 
    `);
	return response;
}

async function deleteGuess(guess: Partial<GuessEntity>): Promise<QueryResult> {
	const response = await connection.query(
		`
        DELETE FROM guesses WHERE id = $1;
    `,
		[guess.id]
	);
	return response;
}

async function updateGuess(guess: Partial<GuessEntity>): Promise<QueryResult> {
	const response = await connection.query(
		`
        UPDATE guesses SET "teamAGoals" =  $1 , "teamBGoals" = $2 
        WHERE id = $3;
    `,
		[guess.teamAGoals, guess.teamBGoals, guess.id]
	);
	return response;
}

export { insertGuess, selectAllGuesses, deleteGuess, updateGuess };
