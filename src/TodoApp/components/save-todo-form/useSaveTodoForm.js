import { useState } from 'react';
import { Alert } from 'react-native';

const INITIAL_FORM_VALUE = {
	task: '',
	category: '',
	priority:'',
};

const useSaveTodoForm = ({ todo, onSave }) => {
	const [data, setData] = useState({
		task: todo?.task || INITIAL_FORM_VALUE.task,
		priority: todo?.priority || INITIAL_FORM_VALUE.priority,
		category: todo?.category || INITIAL_FORM_VALUE.category,
	});

	const onChangeTask = (value) => {
		setData((previousValues) => ({
			...previousValues,
			task: value,
			...(todo && { id: todo.id }),
		}));
	};



	const onSelectCategory = (value) => {
		setData((previousValues) => ({
			...previousValues,
			category: value,
		}));
	};

	const onSelectPriotity = (value) => {
		setData((previousValues) => ({
			...previousValues,
			priority: value,
		}));
	};

	const onSubmit = () => {
		console.log('data ::', data);

		const isInputsEmpty = Object.values(data).some((value) => {
			return !value.toString().trim();
		});

		if (isInputsEmpty) {
			Alert.alert('All fields are required');
			return;
		}

		onSave(data);
	};

	return {
		data,
		onChangeTask,
		onSelectCategory,
		onSubmit,
		onSelectPriotity,
	};
};

export default useSaveTodoForm;
