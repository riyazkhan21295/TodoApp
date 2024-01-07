import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {},
	text: {
		color: '#fff',
		fontSize: 18,
		alignSelf: 'center',
	},
	description: {
		marginTop: 10,
		color: '#fff',
		fontSize: 12,
		alignSelf: 'center',
		fontWeight: 'bold',
	},
});

export const EmptyTodoList = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>No Todo found</Text>
			<Text style={styles.description}>
				Start adding to track your things to do.
			</Text>
		</View>
	);
};

export default EmptyTodoList;
