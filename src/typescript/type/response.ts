type responseStatus = "success" | "fail" | "error";

type errorResponse = {
    name: string,
    message: string,
}

export interface IApiResponse {
    status: responseStatus,
    message?: string,
    data?: any;
    error?: errorResponse,
}