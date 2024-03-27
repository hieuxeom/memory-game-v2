export interface ICardThemeResponse {
    _id: string;
    cardBack: string;
    cardFront: string;
    themeName: string;
}

export interface ICardFilterResponse {
    title: string,
    data: ICardThemeResponse[]
}
