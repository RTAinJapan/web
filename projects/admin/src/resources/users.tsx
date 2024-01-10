import {
	Datagrid,
	DateField,
	EmailField,
	List,
	TextField,
	Edit,
	SimpleForm,
	TextInput,
	ArrayField,
	SingleFieldList,
} from "react-admin";

export const UserList = () => (
	<List>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<EmailField source="email" />
			<TextField source="username" />
			<ArrayField source="userRoles">
				<SingleFieldList linkType={false}>
					<TextField source="role" />
				</SingleFieldList>
			</ArrayField>
			<DateField source="lastLogin" />
		</Datagrid>
	</List>
);

export const UserEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="email" />
			<TextField source="username" />
		</SimpleForm>
	</Edit>
);
