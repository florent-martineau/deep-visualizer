export type WithHighlight<T> = T & {
	toggleHighlight: (highlighted: boolean) => void;
};
