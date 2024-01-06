import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { STORAGE_KEY } from './utils/constants';

const updateStorage = (newTodoList) => {
	AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodoList));
};

const useTodoApp = () => {
	const saveModalRef = useRef(null);

	const [todoList, setTodoList] = useState([]);
	const [actionTodoId, setActionTodoId] = useState(null);

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

	const addTodo = (data) => {
		const newTodo = {
			id: new Date().getTime(),
			...data,
			completed: false,
		};

		const newTodoList = [newTodo, ...todoList];

		setTodoList(newTodoList);

		return newTodoList;
	};

	const editTodo = (data) => {
		const newTodoList = todoList.map((todo) => {
			return {
				...todo,
				...(todo.id === data.id && data),
			};
		});

		setTodoList(newTodoList);

		setActionTodoId(null);

		return newTodoList;
	};

	const saveTodo = (data) => {
		const saveTodoFunctionRef = actionTodoId ? editTodo : addTodo;

		const newTodoList = saveTodoFunctionRef(data);

		updateStorage(newTodoList);

		saveModalRef.current?.close();
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

	const onPressEditTodo = (todoId) => {
		setActionTodoId(todoId);

		saveModalRef.current?.open();
	};

	// const onPressDeleteTodo = (todoId) => { };

	const deleteTodo = (todoId) => {
		const newTodoList = todoList.filter((todo) => {
			return todo.id !== todoId;
		});

		setTodoList(newTodoList);

		updateStorage(newTodoList);
	};

	return {
		saveModalRef,
		todoList,
		actionTodoId,
		setActionTodoId,
		saveTodo,
		toggleTodoComplete,
		onPressEditTodo,
		deleteTodo,
	};
};

export default useTodoApp;
