import { Text, View, Image, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	greeting: {
		fontSize: 24,
		fontWeight: 'bold',
		color: COLORS.white,
	},
});

const Header = () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.avatar}
				source={require('../../../assets/user.png')}
			/>
			<Text style={styles.greeting}>Hello, Jhon Doe</Text>
		</View>
	);
};

export default Header;
