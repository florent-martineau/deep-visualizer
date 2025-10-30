/**
 * Looks like this:
 *
 * ------------ OR --------------
 *
 */
export const OrSeparator = () => {
	return (
		<div className="flex gap-8 items-center w-fit">
			<div className="w-48 h-px bg-border" />
			<span>OR</span>
			<div className="w-48 h-px bg-border" />
		</div>
	);
};
