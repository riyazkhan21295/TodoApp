import { useRef, useState } from 'react';

const useTodoApp = ({ addTodo, editTodo, toggleTodoComplete, deleteTodo }) => {
	const actionModalRef = useRef(null);
	const saveModalRef = useRef(null);

	const [actionTodoId, setActionTodoId] = useState(null);

	const saveTodo = (data) => {
		const saveTodoFunctionRef = actionTodoId ? editTodo : addTodo;

		saveTodoFunctionRef({
			data,
			onSuccess: ({ newTodoList }) => {
				saveModalRef.current?.close();
			},
		});
	};

	const onPressContent = (todoId) => {
		setActionTodoId(todoId);

		actionModalRef.current?.open();
	};

	const onPressEditButton = () => {
		actionModalRef.current?.close();
		saveModalRef.current?.open();
	};

	const onPressDeleteButton = () => {
		deleteTodo(actionTodoId);

		actionModalRef.current?.close();
	};

	const onPressCheckbox = (todoId) => {
		toggleTodoComplete(todoId);
	};

	const onCloseModal = () => {
		setActionTodoId(null);
	};

	return {
		actionModalRef,
		saveModalRef,
		actionTodoId,
		setActionTodoId,
		saveTodo,
		onPressContent,
		onPressEditButton,
		onPressDeleteButton,
		onPressCheckbox,
		onCloseModal,
	};
};

export default useTodoApp;
