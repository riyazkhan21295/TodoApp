import { Pressable, StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { COLORS } from '../utils/constants';

const styles = StyleSheet.create({
	container: {
		gap: 16,
		padding: 16,
	},
	button: {
		flex: 1,
		height: 60,

		borderWidth: 1,
		borderRadius: 8,

		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',

		padding: 16,

		backgroundColor: 'transparent',
	},
	buttonText: {
		fontSize: 18,
	},
	editButton: {
		borderColor: COLORS.primary,
	},
	editButtonText: {
		color: COLORS.primary,
	},
	deleteButton: {
		borderColor: 'red',
	},
	deleteButtonText: {
		color: 'red',
	},
});

const ActionButtons = ({ onPressEdit, onPressDelete }) => {
	return (
		<View style={[styles.container]}>
			<Pressable
				style={[styles.button, styles.editButton]}
				onPress={onPressEdit}
			>
				<Text style={[styles.buttonText, styles.editButtonText]}>
					Edit
				</Text>

				<Entypo
					name='pencil'
					size={24}
					color={COLORS.primary}
				/>
			</Pressable>

			<Pressable
				style={[styles.button, styles.deleteButton]}
				onPress={onPressDelete}
			>
				<Text style={[styles.buttonText, styles.deleteButtonText]}>
					Delete
				</Text>

				<Entypo
					name='trash'
					size={24}
					color='red'
				/>
			</Pressable>
		</View>
	);
};

export default ActionButtons;
