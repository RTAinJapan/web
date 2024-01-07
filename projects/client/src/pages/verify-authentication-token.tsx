import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { trpc } from "../trpc";

export const Component = () => {
	const trpcUtils = trpc.useUtils();
	const navigate = useNavigate();
	const { mutate } = trpc.authentication.verifyToken.useMutation({
		onSuccess: async () => {
			await trpcUtils.validateSession.invalidate();
			// TODO: open last opened page
			navigate("/");
		},
	});

	const running = useRef(false);
	useEffect(() => {
		if (running.current) {
			return;
		}
		running.current = true;

		const searchParams = new URLSearchParams(window.location.search);
		const token = searchParams.get("token");
		if (!token) {
			return;
		}
		mutate({ token });
	}, [mutate]);
};
