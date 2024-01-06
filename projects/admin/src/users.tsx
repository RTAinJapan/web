import {
	Datagrid,
	DateField,
	EmailField,
	List,
	TextField,
	Edit,
	SimpleForm,
	TextInput,
} from "react-admin";

export const UserList = () => (
	<List>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<EmailField source="email" />
			<DateField source="createdAt" />
			<DateField source="updatedAt" />
		</Datagrid>
	</List>
);

export const UserEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="email" />
		</SimpleForm>
	</Edit>
);
