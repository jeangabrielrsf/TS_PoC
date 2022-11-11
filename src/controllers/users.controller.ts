import { Request, Response } from "express";
import { selectUsers } from "../repositories/users.repository.js";

async function showUsers(req: Request, res: Response) {
	try {
		const response = await selectUsers();
		return res.send(response.rows);
	} catch (error) {
		console.log(error);
		return res.status(500);
	}
}

export { showUsers };
