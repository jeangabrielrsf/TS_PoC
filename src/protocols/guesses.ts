export type GuessEntity = {
	id: number;
	teamAId: number;
	teamAGoals: number;
	teamBId: number;
	teamBGoals: number;
	userId: number;
};

export type Guess = Omit<GuessEntity, "id">;
