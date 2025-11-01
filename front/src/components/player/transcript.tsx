import ReactMarkdown from "react-markdown";
import { H1, H2, P } from "../ui/typography";

/**
 * Responsible for displaying the transcript of an explanation
 */
export const Transcript = () => {
	const markdownContent = `# Title

Foo bar

## Subtitle

* This is
* A list
* Including
* [A link](/activation-functions)
	`;
	return (
		<ReactMarkdown
			components={{
				h1: ({ node, ...props }) => <H1 {...props}>{props.children}</H1>,
				h2: ({ node, ...props }) => <H2 {...props}>{props.children}</H2>,
				p: ({ node, ...props }) => <P {...props}>{props.children}</P>,
			}}
		>
			{markdownContent}
		</ReactMarkdown>
	);
};
