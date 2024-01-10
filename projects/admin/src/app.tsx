import { Admin, Resource } from "react-admin";
import { dataProvider } from "./data-provider/data-provider";
import { UserEdit, UserList } from "./resources/users";
import { LoginPage } from "./login";
import { authProvider } from "./auth-provider";
import { EventCreate, EventEdit, EventList } from "./resources/events";

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
			<Resource
				name="events"
				create={EventCreate}
				list={EventList}
				edit={EventEdit}
			/>
		</Admin>
	);
};
