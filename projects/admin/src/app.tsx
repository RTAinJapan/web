import { Admin, Resource } from "react-admin";
import { dataProvider } from "./data-provider/data-provider";
import { UserEdit, UserList } from "./users";

export const App = () => {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name="users"
				list={UserList}
				edit={UserEdit}
				recordRepresentation="email"
			/>
		</Admin>
	);
};
