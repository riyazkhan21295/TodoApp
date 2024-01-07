import { useState } from 'react';
import { Alert } from 'react-native';

const INITIAL_FORM_VALUE = {
	task: '',
	category: '',
	priority: '',
};

const useSaveTodoForm = ({ todo, onSave }) => {
	const [data, setData] = useState({
		task: todo?.task || INITIAL_FORM_VALUE.task,
		priority: todo?.priority || INITIAL_FORM_VALUE.priority,
		category: todo?.category || INITIAL_FORM_VALUE.category,
	});

	const onChangeValue = (key) => (value) => {
		setData((previousValues) => ({
			...previousValues,
			[key]: value,
		}));
	};

	const onChangeTask = (value) => {
		setData((previousValues) => ({
			...previousValues,
			task: value,
		}));
	};

	const onSelectCategory = (value) => {
		setData((previousValues) => ({
			...previousValues,
			category: value,
		}));
	};

	const onSelectPriority = (value) => {
		setData((previousValues) => ({
			...previousValues,
			priority: value,
		}));
	};

	const onSubmit = () => {
		const isInputsEmpty = Object.values(data).some((value) => {
			return !value.toString().trim();
		});

		if (isInputsEmpty) {
			Alert.alert('All fields are required');
			return;
		}

		onSave({ ...data, ...(todo && { id: todo.id }) });
	};

	return {
		data,
		onChangeValue,
		onSubmit,
	};
};

export default useSaveTodoForm;
