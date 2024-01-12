import {
	Create,
	DateTimeInput,
	SimpleForm,
	TextInput,
	required,
	BooleanField,
	Datagrid,
	DateField,
	List,
	TextField,
	CheckboxGroupInput,
	Edit,
	BooleanInput,
	RadioButtonGroupInput,
} from "react-admin";

export const EventCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="name" validate={[required()]} />
				<DateTimeInput source="startsAt" validate={[required()]} />
				<DateTimeInput source="endsAt" validate={[required()]} />
				<CheckboxGroupInput
					source="marathonTypes"
					choices={[
						{ id: "ONSITE", name: "Onsite" },
						{ id: "ONLINE", name: "Online" },
					]}
				/>
			</SimpleForm>
		</Create>
	);
};

export const EventList = () => (
	<List>
		<Datagrid rowClick="edit">
			<TextField source="name" />
			<DateField showTime source="startsAt" />
			<DateField showTime source="endsAt" />
			<TextField source="type" />
			<BooleanField source="published" />
		</Datagrid>
	</List>
);

export const EventEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
			<DateTimeInput source="startsAt" validate={[required()]} />
			<DateTimeInput source="endsAt" validate={[required()]} />
			<RadioButtonGroupInput
				source="type"
				choices={[
					{ id: "Onsite", name: "Onsite" },
					{ id: "Online", name: "Online" },
				]}
			/>
			<BooleanInput source="published" />
		</SimpleForm>
	</Edit>
);
