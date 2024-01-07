import { useMemo, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import Filters from './filters';
import EmptyTodoList from './empty-list';
import TodoItem from './todo-item';

import { FILTERS } from '../utils/constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
	},
	listContainer: {
		gap: 16,
		paddingBottom: 60,
	},
});

const TodoList = ({ todoList, onPressContent, onPressCheckbox }) => {
	const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

	const filteredTodoList = useMemo(() => {
		return activeFilter === 'all'
			? todoList
			: todoList.filter((todo) => {
					return (
						(activeFilter === 'pending' && !todo.completed) ||
						(activeFilter === 'completed' && todo.completed)
					);
			  });
	}, [activeFilter, todoList]);

	return (
		<View style={styles.container}>
			<Filters
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
			/>

			<FlatList
				data={filteredTodoList}
				ListEmptyComponent={<EmptyTodoList />}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TodoItem
						item={item}
						onPressContent={() => onPressContent(item.id)}
						onPressCheckbox={() => onPressCheckbox(item.id)}
					/>
				)}
				contentContainerStyle={styles.listContainer}
			/>
		</View>
	);
};

export default TodoList;
