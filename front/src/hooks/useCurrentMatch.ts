import { useMatches } from "@tanstack/react-router";

export const useCurrentMatch = () => {
	const matches = useMatches();
	return matches[matches.length - 1];
};
