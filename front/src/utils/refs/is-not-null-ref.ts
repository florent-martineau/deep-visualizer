export const isNotNullRef = <T>(
	ref: React.RefObject<T | null>,
): ref is React.RefObject<T> => {
	return ref.current !== null;
};
