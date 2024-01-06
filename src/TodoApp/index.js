import { View, Pressable, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Modalize } from 'react-native-modalize';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useTodoAppAnimation from './useTodoAppAnimation';
import useTodoApp from './useTodoApp';

import { TodoList } from './TodoList';

import { Header } from './components/header';
import SaveTodoForm from './components/save-todo-form';

import { COLORS } from './utils/constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		top: 0,
		zIndex: 100,
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
});

const TodoApp = () => {
	const insets = useSafeAreaInsets();

	const { scrollHandler, animatedStyle } = useTodoAppAnimation();

	const {
		saveModalRef,
		todoList,
		actionTodoId,
		setActionTodoId,
		saveTodo,
		toggleTodoComplete,
		onPressEditTodo,
		deleteTodo,
	} = useTodoApp();

	const editTodoData = todoList.find((todo) => todo.id === actionTodoId);

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<Animated.View style={[styles.header, animatedStyle]}>
				<Header />
			</Animated.View>

			<TodoList
				todoList={todoList}
				toggleTodoComplete={toggleTodoComplete}
				onPressEditTodo={onPressEditTodo}
				deleteTodo={deleteTodo}
				onScroll={scrollHandler}
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
				onClose={() => setActionTodoId(null)}
			>
				<SaveTodoForm
					key={actionTodoId}
					todo={editTodoData}
					onSave={saveTodo}
				/>
			</Modalize>
		</View>
	);
};

export default TodoApp;
