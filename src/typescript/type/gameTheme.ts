export type TypeGameIcon = "icon" | "image";

export interface IGameData {
	icon: string;
	value: string;
	type: TypeGameIcon;
}

export interface IGameThemeResponse {
	_id: string;
	themeName: string;
	themeData: IGameData[];
	played: number;
}
