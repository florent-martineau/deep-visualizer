import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField } from "../ui/form";
import { Textarea } from "../ui/textarea";

const chatBoxFormSchema = z.object({
	message: z.string().min(1).max(5_000),
});
type ChatBoxFormValues = z.infer<typeof chatBoxFormSchema>;

type ChatBoxProps = {
	onSubmit: (values: ChatBoxFormValues) => void;
};
export const ChatBox = (props: ChatBoxProps) => {
	const form = useForm<ChatBoxFormValues>({
		resolver: zodResolver(chatBoxFormSchema),
		defaultValues: {
			message: "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(props.onSubmit)}
				className="flex gap-2 w-full max-w-[800px] items-center justify-center relative"
			>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormControl>
							<Textarea
								className="pb-12"
								placeholder="Teach me how GPT-5 works"
								{...field}
							/>
						</FormControl>
					)}
				/>

				<div className="absolute bottom-2 right-2">
					<Button
						type="submit"
						variant="ghost"
						className="h-full"
						disabled={!form.formState.isValid || form.formState.isSubmitting}
					>
						<Send />
					</Button>
				</div>
			</form>
		</Form>
	);
};
