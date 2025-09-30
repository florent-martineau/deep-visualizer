import { isServer } from "../isServer";
import { clientLogger } from "./logger.client";
import { serverLogger } from "./logger.server";

export const logger = () => {
	if (isServer) return serverLogger();
	return clientLogger();
};
