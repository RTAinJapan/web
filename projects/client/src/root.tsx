import { AppBar, Button, Toolbar } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { trpc } from "./trpc";

export const Component = () => {
	const trpcUtils = trpc.useUtils();
	const { data: signedIn } = trpc.validateSession.useQuery();
	const { mutate: signOut } = trpc.authentication.signOut.useMutation({
		onSuccess: async () => {
			await trpcUtils.validateSession.invalidate();
		},
	});

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					{signedIn ? (
						<Button
							color="inherit"
							onClick={() => {
								signOut();
							}}
						>
							ログアウト
						</Button>
					) : (
						<>
							<Button color="inherit" component={Link} to="/sign-in">
								ログイン
							</Button>
							<Button color="inherit" component={Link} to="/register">
								新規登録
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
			<Outlet />
		</>
	);
};
