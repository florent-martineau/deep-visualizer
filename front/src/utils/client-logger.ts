import { env } from "@/env";
import { Browser as LogtailBrowser } from "@logtail/js";

export const clientLogger = new LogtailBrowser(env.VITE_BETTERSTACK_TOKEN, {
	endpoint: `https://${env.VITE_BETTERSTACK_INGESTING_HOST}`,
});
