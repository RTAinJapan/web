import { useId } from "react";
import { useLogin } from "react-admin";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
	const { register, handleSubmit } = useForm<{ email: string }>();
	const emailInputId = useId();
	const login = useLogin();

	return (
		<div>
			<h1>Login</h1>
			<form
				onSubmit={handleSubmit(async (data) => {
					await login(data);
				})}
			>
				<label htmlFor={emailInputId}>Email</label>
				<input
					type="email"
					autoComplete="email"
					id={emailInputId}
					{...register("email")}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};
