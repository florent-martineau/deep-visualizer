import { useRouter } from "@tanstack/react-router";
import type { FileRoutesById } from "@/routeTree.gen";

export const useRoute = (routeId: keyof FileRoutesById) => {
	const router = useRouter();
	const route = router.routesById[routeId];

	return {
		route,
		staticData: route.options.staticData,
	};
};
