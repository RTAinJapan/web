import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { trpc } from "../trpc";
import { useState } from "react";

const formSchema = z.object({
	email: z.string().email(),
});

export const Component = () => {
	const [emailSent, setEmailSent] = useState(false);
	const { register, handleSubmit, formState } = useForm<{ email: string }>({
		resolver: zodResolver(formSchema),
	});
	const { mutate } = trpc.authentication.initialize.useMutation({
		onSuccess: () => {
			setEmailSent(true);
		},
	});

	return (
		<>
			<Typography variant="h1">ログイン</Typography>
			{emailSent ? (
				<Typography variant="body1">
					メールを送信しました。メールに記載されているURLにアクセスしログインを完了してください。
				</Typography>
			) : (
				<form
					onSubmit={handleSubmit((data) => {
						const callbackUrl = new URL(
							"/verify-authentication-token",
							window.location.origin,
						);
						mutate({
							email: data.email,
							callbackUrl: callbackUrl.href,
						});
					})}
				>
					<TextField
						label="メールアドレス"
						autoComplete="email"
						inputProps={register("email")}
						error={formState.errors.email !== undefined}
						helperText={formState.errors.email?.message}
					/>
					<Button type="submit">ログイン</Button>
				</form>
			)}
		</>
	);
};
