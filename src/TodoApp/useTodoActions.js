import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { STORAGE_KEY } from './utils/constants';

const updateStorage = (newTodoList) => {
	AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodoList));
};

const useTodoActions = () => {
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		const getTodoList = async () => {
			try {
				const data = await AsyncStorage.getItem(STORAGE_KEY);

				if (data) {
					setTodoList(JSON.parse(data));
				}
			} catch (error) {
				console.error('error :: ', error);
			}
		};

		getTodoList();
	}, []);

	const addTodo = ({ data, onSuccess }) => {
		const newTodo = {
			id: new Date().getTime(),
			...data,
			completed: false,
		};

		const newTodoList = [newTodo, ...todoList];

		setTodoList(newTodoList);

		updateStorage(newTodoList);

		onSuccess?.({ newTodoList });
	};

	const editTodo = ({ data, onSuccess }) => {
		const newTodoList = todoList.map((todo) => {
			return {
				...todo,
				...(todo.id === data.id && data),
			};
		});

		setTodoList(newTodoList);

		updateStorage(newTodoList);

		onSuccess?.({ newTodoList });
	};

	const toggleTodoComplete = (todoId) => {
		const newTodoList = todoList.map((todo) => {
			return {
				...todo,
				completed:
					todo.id === todoId ? !todo.completed : todo.completed,
			};
		});

		setTodoList(newTodoList);

		updateStorage(newTodoList);
	};

	const deleteTodo = (todoId) => {
		const newTodoList = todoList.filter((todo) => {
			return todo.id !== todoId;
		});

		setTodoList(newTodoList);

		updateStorage(newTodoList);
	};

	return { todoList, addTodo, editTodo, toggleTodoComplete, deleteTodo };
};

export default useTodoActions;
