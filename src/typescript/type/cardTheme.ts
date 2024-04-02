export interface ICardThemeResponse {
    _id: string;
    cardBack: string;
    cardFront: string;
    themeName: string;
    isVip: boolean
    price: number;
    isDeleted: boolean;
}

export interface ICardFilterResponse {
    title: string,
    data: ICardThemeResponse[]
}
