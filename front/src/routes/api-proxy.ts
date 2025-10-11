import { createFileRoute } from "@tanstack/react-router";
import { env } from "@/env";

const proxy = async ({ request }: { request: Request }) => {
	const url = new URL(request.url);

	const newUrl = new URL(url);
	newUrl.protocol = env.API_PROTOCOL;
	newUrl.hostname = env.API_HOST;
	newUrl.port = env.API_PORT.toString();

	const headers = new Headers(request.headers);
	headers.set("host", env.API_HOST);

	newUrl.pathname = newUrl.pathname.replace(/^\/api-proxy/, "");

	const response = await fetch(newUrl, {
		method: request.method,
		headers,
		body: request.body,
	});

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers,
	});
};

export const Route = createFileRoute("/api-proxy")({
	staticData: {
		title: "API Proxy",
		description: "Proxy to the API",
	},
	server: {
		handlers: {
			ALL: proxy,
			GET: proxy,
			POST: proxy,
			PUT: proxy,
			PATCH: proxy,
			DELETE: proxy,
			OPTIONS: proxy,
			HEAD: proxy,
		},
	},
});
