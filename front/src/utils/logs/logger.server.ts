import { env } from "@/env";

export const serverLogger = () => {
	const { Logtail } = require("@logtail/node");

	return new Logtail(env.FRONT_BETTERSTACK_TOKEN, {
		endpoint: `https://${env.FRONT_BETTERSTACK_INGESTING_HOST}`,
	});
};
