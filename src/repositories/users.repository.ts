import { QueryResult } from "pg";
import connection from "../database/database.js";
import { User, UserEntity } from "../protocols/users";

async function selectUsers(): Promise<QueryResult<User>> {
	const users = await connection.query(
		`
        SELECT 
            users.name,
            COUNT(guesses."userId") AS "qtdGuess"
        FROM users
        JOIN guesses ON guesses."userId" = users.id
        GROUP BY (users.id);
    `
	);

	return users;
}

export { selectUsers };
