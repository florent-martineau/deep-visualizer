import { Logtail } from "@logtail/browser";
import { env } from "@/env";

export const clientLogger = () => {
	return new Logtail(env.VITE_BETTERSTACK_TOKEN, {
		endpoint: `https://${env.VITE_BETTERSTACK_INGESTING_HOST}`,
	});
};
