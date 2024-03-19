type contentType = "application/json" | "multipart/form-data";
type MethodFetchType = "GET" | "POST" | "PUT" | "DELETE";

interface FetchBody {
	method: MethodFetchType;
	headers: {
		"Content-Type": contentType;
	};
	body: any;
}

class Fetch {
	// constructor(method: MethodFetchType) {
	//     this.method = method;
	//     ths
	// }
}
