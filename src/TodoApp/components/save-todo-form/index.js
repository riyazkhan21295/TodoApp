import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { CATEGORIES, COLORS } from '../../utils/constants';
import useSaveTodoForm from './useSaveTodoForm';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 30,
		paddingHorizontal: 10,
	},
	textInput: {
		height: 40,
		borderRadius: 5,
		paddingHorizontal: 10,
		backgroundColor: COLORS.primaryBg,
	},
	saveButton: {
		borderRadius: 5,
		flexDirection: 'row',
		paddingVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
	},
	saveButtonText: {
		color: '#fff',
		fontSize: 20,
		marginRight: 10,
	},

	labelContainer: {
		marginVertical: 10,
	},
	labelText: {
		color: '#000',
	},
	labelTextPressed: {
		color: '#fff',
	},
	labelItem: {
		borderRadius: 5,
		marginRight: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: COLORS.primaryBg,
	},
	labelItemPressed: {
		backgroundColor: COLORS.primary,
	},
});

const LabelsSelector = ({ selectedLabel, onLabelSelected }) => {
	return (
		<ScrollView
			horizontal
			style={styles.labelContainer}
			showsHorizontalScrollIndicator={false}
		>
			{CATEGORIES.map((label) => {
				const isSelected = label === selectedLabel;
				return (
					<Pressable
						key={label}
						style={({ pressed }) => [
							styles.labelItem,
							pressed || (isSelected && styles.labelItemPressed),
						]}
						onPress={() => onLabelSelected(label)}
					>
						{({ pressed }) => (
							<Text
								style={[
									styles.labelText,
									pressed ||
										(isSelected && styles.labelTextPressed),
								]}
							>
								{label}
							</Text>
						)}
					</Pressable>
				);
			})}
		</ScrollView>
	);
};

const SaveTodoForm = ({ todo, onSave }) => {
	const { data, onChangeTask, onSelectCategory, onSubmit } = useSaveTodoForm({
		todo,
		onSave,
	});

	return (
		<View style={styles.container}>
			<TextInput
				value={data.task}
				onChangeText={onChangeTask}
				style={styles.textInput}
				placeholder='Write your task...'
			/>

			<LabelsSelector
				selectedLabel={data.category}
				onLabelSelected={onSelectCategory}
			/>

			<Pressable
				style={({ pressed }) => [
					styles.saveButton,
					pressed && { opacity: 0.5 },
				]}
				onPress={onSubmit}
			>
				<Text style={styles.saveButtonText}>Save</Text>
				<Entypo
					name='chevron-with-circle-right'
					size={24}
					color='#fff'
				/>
			</Pressable>
		</View>
	);
};

export default SaveTodoForm;
