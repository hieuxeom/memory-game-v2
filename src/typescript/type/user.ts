export interface IUser {
    _id: string;
    displayName: string;
    email: string;
    photoURL: string;
    provider: string;
    highestScore: number;
    averageScore: number;
    gamePlayed: number;
    mostPlayedSize: string;
    mostPlayedTime: number;
    createdAt: string;
    updatedAt: string;
}
