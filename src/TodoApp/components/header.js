import { Text, View, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = () => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.container, { marginTop: insets.top }]}>
			<Image
				style={styles.avatar}
				source={require('../../../assets/user.png')}
			/>
			<Text style={styles.greeting}>Hello, Jhon Doe</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	greeting: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#fff',
	},
});
