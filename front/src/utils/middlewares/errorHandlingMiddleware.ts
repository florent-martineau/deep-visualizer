import * as Sentry from "@sentry/react";
import { createMiddleware } from "@tanstack/react-start";
import { env } from "@/env";

export const errorHandlingGlobalMiddleware = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
	Sentry.init({
		dsn: env.SENTRY_DSN,
		environment: env.NODE_ENV,
	});

	return next();
});
