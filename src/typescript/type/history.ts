export interface IHistoryResponse {
    "_id": string,
    "userId": string,
    "gameThemeId": string,
    "cardThemeId": string,
    "gameTime": number;
    "gameSize": number;
    "createdAt": string;
    "updatedAt": string;
    "turns": number;
}