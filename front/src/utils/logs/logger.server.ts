import { env } from "@/env";

export const serverLogger = () => {
	const { Logtail } = require("@logtail/node");

	return new Logtail(env.BETTERSTACK_TOKEN, {
		endpoint: `https://${env.BETTERSTACK_INGESTING_HOST}`,
	});
};
