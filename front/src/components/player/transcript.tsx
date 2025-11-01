import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { H1, H2, OL, P, UL } from "../ui/typography";

/**
 * Responsible for displaying the transcript of an explanation
 */
export const Transcript = () => {
	const markdownContent = `# Title

Foo <mark>bar</mark>	

<script>alert('foo')</script>

## Subtitle

Unordered list:
* This is
* A list
* Including
* [A link](/activation-functions)

Ordered list:
1. Foo
1. Bar
1. Baz
	`;
	return (
		<ReactMarkdown
			rehypePlugins={[
				rehypeRaw,
				() =>
					rehypeSanitize({
						tagNames: ["h1", "h2", "p", "mark", "ul", "ol", "li", "a"],
					}),
			]}
			components={{
				h1: ({ node, ...props }) => <H1 {...props}>{props.children}</H1>,
				h2: ({ node, ...props }) => <H2 {...props}>{props.children}</H2>,
				p: ({ node, ...props }) => <P {...props}>{props.children}</P>,
				ul: ({ node, ...props }) => <UL {...props}>{props.children}</UL>,
				ol: ({ node, ...props }) => <OL {...props}>{props.children}</OL>,
				mark: ({ node, ...props }) => (
					<span className="text-pink-500" {...props}>
						{props.children}
					</span>
				),
			}}
		>
			{markdownContent}
		</ReactMarkdown>
	);
};
