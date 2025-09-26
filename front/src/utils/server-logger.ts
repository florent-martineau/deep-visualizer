import { env } from "@/env";
import { Node as LogtailServer } from "@logtail/js";

export const serverLogger = new LogtailServer(env.BETTERSTACK_TOKEN, {
	endpoint: `https://${env.BETTERSTACK_INGESTING_HOST}`,
});
