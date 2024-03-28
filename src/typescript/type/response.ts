type responseStatus = "success" | "fail" | "error" | "redirect";

type errorResponse = {
    name: string,
    message: string,
}

export interface IApiResponse {
    status: responseStatus,
    message?: string,
    url?: string,
    data?: any;
    error?: errorResponse,
}