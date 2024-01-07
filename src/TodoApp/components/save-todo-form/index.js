import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import useSaveTodoForm from './useSaveTodoForm';

import Pills from '../pills';

import { CATEGORIES, PRIORITIES, COLORS } from '../../utils/constants';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 30,
		paddingHorizontal: 10,

		gap: 16,
	},
	inputContainer: {},
	textInput: {
		height: 40,
		borderRadius: 4,
		paddingHorizontal: 16,
		backgroundColor: COLORS.gray3,
	},
	inputLabel: {
		color: COLORS.black,
		marginBottom: 2,
	},
	saveButton: {
		borderRadius: 4,
		flexDirection: 'row',
		paddingVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
	},
	saveButtonText: {
		color: COLORS.white,
		fontWeight: 'bold',
		fontSize: 20,
		marginRight: 10,
	},
});

const SaveTodoForm = ({ todo, onSave }) => {
	const { data, onChangeValue, onSubmit } = useSaveTodoForm({
		todo,
		onSave,
	});

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					value={data.task}
					onChangeText={onChangeValue('task')}
					style={styles.textInput}
					placeholder='Write your task...'
					placeholderTextColor={COLORS.black}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>Select Category</Text>
				<Pills
					items={CATEGORIES}
					selectedItem={data.category}
					onSelect={onChangeValue('category')}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>Select Priority</Text>
				<Pills
					items={PRIORITIES}
					selectedItem={data.priority}
					onSelect={onChangeValue('priority')}
				/>
			</View>

			<Pressable
				style={({ pressed }) => [
					styles.saveButton,
					pressed && { opacity: 0.5 },
				]}
				onPress={onSubmit}
			>
				<Text style={styles.saveButtonText}>SAVE</Text>
			</Pressable>
		</View>
	);
};

export default SaveTodoForm;
