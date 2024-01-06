import {
	interpolate,
	Extrapolate,
	useAnimatedStyle,
	useSharedValue,
	useAnimatedScrollHandler,
} from 'react-native-reanimated';

const useTodoAppAnimation = () => {
	const scrollY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});

	const inputRange = [0, 60];
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(
						scrollY.value,
						inputRange,
						[1, 0.7],
						Extrapolate.CLAMP
					),
				},
				{
					translateX: interpolate(
						scrollY.value,
						inputRange,
						[0, -50],
						Extrapolate.CLAMP
					),
				},
				{
					translateY: interpolate(
						scrollY.value,
						inputRange,
						[0, -30],
						Extrapolate.CLAMP
					),
				},
			],
		};
	});

	return {
		scrollHandler,
		animatedStyle,
	};
};

export default useTodoAppAnimation;
