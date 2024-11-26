import { headers } from "next/headers";

export function createApiRouteUrl(endpoint: string) {
	let api = "";
	if (typeof window === "undefined") {
		const headersData = headers();
		const host = headersData.get("host") as string;
		const protocol =
			(headersData.get("x-forwarded-proto") ?? host.startsWith("localhost"))
				? "http"
				: "https";
		api = `${protocol}://${host}/${endpoint}`;
	} else {
		api = endpoint;
	}
	return api;
}
