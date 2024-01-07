import { View, Pressable, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useTodoOperations from './useTodoOperations';
import useTodoApp from './useTodoApp';

import Header from './components/header';
import TodoList from './components/todo-list';
import SaveTodoForm from './components/save-todo-form';
import ActionButtons from './components/action-buttons';

import { COLORS } from './utils/constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,

		gap: 16,
	},
	modalStyle: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	createButton: {
		bottom: 20,
		right: 20,
		width: 50,
		height: 50,
		borderRadius: 30,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
	},
	actionButtonsContainer: {
		paddingBottom: 32,
	},
});

const TodoApp = () => {
	const insets = useSafeAreaInsets();

	const { todoList, addTodo, editTodo, toggleTodoComplete, deleteTodo } =
		useTodoOperations();

	const {
		actionModalRef,
		saveModalRef,
		actionTodoId,
		saveTodo,
		onPressContent,
		onPressEditButton,
		onPressDeleteButton,
		onPressCheckbox,
		onCloseModal,
	} = useTodoApp({ addTodo, editTodo, toggleTodoComplete, deleteTodo });

	const editTodoData = todoList.find((todo) => todo.id === actionTodoId);

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<Header />

			<TodoList
				todoList={todoList}
				onPressContent={onPressContent}
				onPressCheckbox={onPressCheckbox}
			/>

			<View style={styles.createButton}>
				<Pressable onPress={() => saveModalRef.current?.open()}>
					<Entypo
						name='plus'
						size={32}
						color='#fff'
					/>
				</Pressable>
			</View>

			<Modalize
				ref={saveModalRef}
				adjustToContentHeight
				modalStyle={styles.modalStyle}
				keyboardAvoidingOffset={50}
				scrollViewProps={{ keyboardShouldPersistTaps: 'always' }}
				onClose={onCloseModal}
			>
				<SaveTodoForm
					key={actionTodoId}
					todo={editTodoData}
					onSave={saveTodo}
				/>
			</Modalize>

			<Modalize
				ref={actionModalRef}
				adjustToContentHeight
				keyboardAvoidingOffset={50}
				scrollViewProps={{ keyboardShouldPersistTaps: 'always' }}
				onClose={onCloseModal}
			>
				<View style={styles.actionButtonsContainer}>
					<ActionButtons
						onPressEdit={onPressEditButton}
						onPressDelete={onPressDeleteButton}
					/>
				</View>
			</Modalize>
		</View>
	);
};

export default TodoApp;
