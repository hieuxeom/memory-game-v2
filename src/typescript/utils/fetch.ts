

const RequestGetInit = (): RequestInit => {
    return {
        method: "GET"
    }
}

const RequestPostFormInit = (body: any): RequestInit => {
    return {
        method: "GET",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: body
    }
}

export class FetchHelpers {
    url: string;
    body: any;
    // requestConfig:
    constructor(url: string, body?: any  ) {
        this.url = url;
        this.body = body
    }

    async get() {
        return fetch(this.url, RequestGetInit()).then(res => res.json())
    }
}
