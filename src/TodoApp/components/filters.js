import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FILTERS } from '../utils/constants';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 8,
	},
	pill: {
		backgroundColor: '#ffffff',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
	},
	pillIsActive: {
		backgroundColor: COLORS.secondary,
	},
	pillText: {
		color: COLORS.primary,
		textTransform: 'uppercase',
	},
	pillTextIsActive: {
		color: '#000000',
		fontWeight: 'bold',
	},
});

const Filters = ({ activeFilter, setActiveFilter }) => {
	return (
		<View style={styles.container}>
			{FILTERS.map((filter) => {
				const isActive = filter === activeFilter;

				return (
					<Pressable
						key={filter}
						style={[styles.pill, isActive && styles.pillIsActive]}
						onPress={() => setActiveFilter(filter)}
					>
						<Text
							style={[
								styles.pillText,
								isActive && styles.pillTextIsActive,
							]}
						>
							{filter}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
};

export default Filters;
