import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';

import { COLORS } from '../utils/constants';

const styles = StyleSheet.create({
	container: {},
	pill: {
		height: 40,
		borderRadius: 4,
		paddingHorizontal: 16,
		backgroundColor: COLORS.gray3,

		marginRight: 4,

		justifyContent: 'center',
		alignItems: 'center',

		borderWidth: 1,
		borderColor: 'transparent',
	},
	pillPressed: {
		backgroundColor: COLORS.secondary,
		borderColor: COLORS.gray4,
	},
	pillText: {
		color: COLORS.black,
		textTransform: 'capitalize',
	},
	pillTextPressed: {
		fontWeight: 'bold',
	},
});

const Pills = ({ items, selectedItem, onSelect }) => {
	return (
		<ScrollView
			horizontal
			style={styles.container}
			showsHorizontalScrollIndicator={false}
		>
			{items.map((item) => {
				const isSelected = item === selectedItem;

				return (
					<Pressable
						key={item}
						style={({ pressed }) => [
							styles.pill,
							pressed || (isSelected && styles.pillPressed),
						]}
						onPress={() => onSelect(item)}
					>
						{({ pressed }) => (
							<Text
								style={[
									styles.pillText,
									pressed ||
										(isSelected && styles.pillTextPressed),
								]}
							>
								{item}
							</Text>
						)}
					</Pressable>
				);
			})}
		</ScrollView>
	);
};

export default Pills;
