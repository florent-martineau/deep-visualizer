import { Logtail } from "@logtail/node";
import { env } from "@/env";

export const serverLogger = () => {
	return new Logtail(env.BETTERSTACK_TOKEN, {
		endpoint: `https://${env.BETTERSTACK_INGESTING_HOST}`,
	});
};
