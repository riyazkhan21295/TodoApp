import { Text, StyleSheet, View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Animated, {
	withTiming,
	withDelay,
	runOnJS,
	interpolate,
	Extrapolate,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

import { COLORS } from './utils/constants';

export const TodoList = ({
	todoList,
	toggleTodoComplete,
	onPressEditTodo,
	deleteTodo,
	onScroll,
}) => {
	return (
		<>
			<View style={{ height: 30 }} />
			<Animated.FlatList
				onScroll={onScroll}
				contentContainerStyle={styles.container}
				scrollEventThrottle={16}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={
					<View>
						<Text>No Todo</Text>
					</View>
				}
				renderItem={({ item }) => (
					<Item
						item={item}
						onToggle={() => toggleTodoComplete(item.id)}
						onEdit={() => onPressEditTodo(item.id)}
						onDelete={() => deleteTodo(item.id)}
					/>
				)}
				data={todoList}
			/>
		</>
	);
};

const Item = ({ item, onToggle, onEdit, onDelete }) => {
	const height = useSharedValue(80);
	const completed = useSharedValue(item.completed ? 1 : 0);

	const onPress = () => {
		if (item.completed) {
			completed.value = withTiming(0, { duration: 500 }, () => {
				runOnJS(onToggle)();
			});
		} else {
			completed.value = withTiming(1.5, { duration: 500 }, () => {
				runOnJS(onToggle)();
			});
			completed.value = withDelay(500, withTiming(1, null));
		}
	};

	const _delete = () => {
		height.value = withTiming(0, {}, () => {
			runOnJS(onDelete)();
		});
	};

	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			height: height.value,
		};
	});

	const animatedStrikeStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				completed.value,
				[0, 1],
				[0, 100],
				Extrapolate.CLAMP
			),
		};
	});

	const animatedCheckStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: completed.value }],
		};
	});

	return (
		<Animated.View style={animatedContainerStyle}>
			<View
				style={[
					styles.item,
					{ backgroundColor: item.completed ? '#c0c3c9' : '#fff' },
				]}
			>
				<View
					style={{
						padding: 8,
						position: 'absolute',
						top: 0,
						right: 0,
						backgroundColor: '#ccc',
						borderBottomLeftRadius: 8,
					}}
				>
					<Pressable onPress={() => onPress()}>
						<View style={[styles.checkBox]}>
							<Animated.View style={animatedCheckStyle}>
								<Entypo
									name='check'
									size={18}
									color={COLORS.primary}
								/>
							</Animated.View>
						</View>
					</Pressable>
				</View>

				<View style={styles.content}>
					<View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<View>
								<Text>{item.task}</Text>
								<Animated.View
									style={[
										{
											width: '100%',
											position: 'absolute',
											bottom: 8,
											height: 2,
											backgroundColor: COLORS.primary,
										},
										animatedStrikeStyle,
									]}
								/>
							</View>
							<View style={styles.label}>
								<Text style={styles.labelText}>
									{item.category}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.actions}>
					<Pressable onPress={onEdit}>
						<Entypo
							name='pencil'
							size={18}
							color={COLORS.primary}
						/>
					</Pressable>
					<Pressable onPress={_delete}>
						<Entypo
							name='trash'
							size={18}
							color={'red'}
						/>
					</Pressable>
				</View>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		marginHorizontal: 10,
		paddingBottom: 70,
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	item: {
		flexDirection: 'row',
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 20,
		backgroundColor: '#d3d3d3',
	},
	checkBox: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: COLORS.primary,
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		marginLeft: 5,
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		backgroundColor: COLORS.primary,
	},
	labelText: {
		color: '#fff',
		fontSize: 10,
	},
});
