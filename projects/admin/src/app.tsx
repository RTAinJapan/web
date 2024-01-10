import { Admin, ListGuesser, Resource } from "react-admin";
import { dataProvider } from "./data-provider/data-provider";
import { UserEdit, UserList } from "./users";
import { LoginPage } from "./login";
import { authProvider } from "./auth-provider";

export const App = () => {
	return (
		<Admin
			loginPage={LoginPage}
			authProvider={authProvider}
			dataProvider={dataProvider}
		>
			<Resource
				name="users"
				list={UserList}
				edit={UserEdit}
				recordRepresentation="email"
			/>
			<Resource name="events" list={ListGuesser} />
		</Admin>
	);
};
