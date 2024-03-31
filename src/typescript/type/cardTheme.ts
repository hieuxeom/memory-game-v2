export interface ICardThemeResponse {
    _id: string;
    cardBack: string;
    cardFront: string;
    themeName: string;
    isVip: boolean
    price: number;
}

export interface ICardFilterResponse {
    title: string,
    data: ICardThemeResponse[]
}
