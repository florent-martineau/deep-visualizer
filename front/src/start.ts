import { createStart } from "@tanstack/react-start";
import { errorHandlingGlobalMiddleware } from "./utils/middlewares/errorHandlingMiddleware";

export const startInstance = createStart(() => {
	return {
		functionMiddleware: [errorHandlingGlobalMiddleware],
	};
});
