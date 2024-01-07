import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { COLORS, getPriorityColor } from '../../utils/constants';

const styles = StyleSheet.create({
	container: {
		padding: 16,

		borderLeftWidth: 6,

		borderRadius: 8,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,

		backgroundColor: '#fff',

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 16,
	},
	containerIsCompleted: {
		backgroundColor: '#c0c3c9',
		borderLeftColor: '#7e8491',
	},
	contentContainer: {
		flex: 1,
		gap: 8,
	},
	task: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',

		textTransform: 'capitalize',
	},
	taskIsCompleted: {
		// textDecorationLine: 'line-through',
		// textDecorationColor: '#333',
	},
	otherContentContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	categoryContainer: {
		borderWidth: 1,
		borderColor: COLORS.primary,
		borderRadius: 25,

		paddingVertical: 2,
		paddingHorizontal: 8,
	},
	category: {
		textTransform: 'uppercase',
		fontSize: 12,
		fontWeight: 'bold',
		color: COLORS.primary,
	},
	priorityContainer: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 25,

		paddingVertical: 2,
		paddingHorizontal: 8,
	},
	priority: {
		textTransform: 'uppercase',
		fontSize: 12,
		fontWeight: 'bold',
		color: '#ccc',
	},
});

const TodoItem = ({ item, onPressContent, onPressCheckbox }) => {
	const priorityColor = getPriorityColor(item.priority);

	return (
		<View
			style={[
				styles.container,
				{ borderLeftColor: priorityColor },
				item.completed && styles.containerIsCompleted,
			]}
		>
			<Pressable
				style={styles.contentContainer}
				onPress={onPressContent}
			>
				<Text
					style={[
						styles.task,
						item.completed && styles.taskIsCompleted,
					]}
				>
					{item.task}
				</Text>

				<View style={styles.otherContentContainer}>
					<View style={styles.categoryContainer}>
						<Text style={styles.category}>{item.category}</Text>
					</View>

					<View
						style={[
							styles.priorityContainer,
							{
								borderColor: priorityColor,
							},
						]}
					>
						<Text
							style={[styles.priority, { color: priorityColor }]}
						>
							{item.priority || 'low'}
						</Text>
					</View>
				</View>
			</Pressable>

			<Pressable onPress={onPressCheckbox}>
				<Feather
					name={item.completed ? 'check-square' : 'square'}
					size={24}
					color={COLORS.primary}
				/>
			</Pressable>
		</View>
	);
};

export default TodoItem;
