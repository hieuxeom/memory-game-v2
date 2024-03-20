export type GameIconType = "icon" | "image";

export interface IGameData {
	icon: string;
	value: string;
}

export interface IGameThemeResponse {
	_id: string;
	themeName: string;
	themeData: IGameData[];
	rawData: string;
	themeThumbnail: string;
	type: GameIconType;
	played: number;
}
