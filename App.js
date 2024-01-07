import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import TodoApp from './src/TodoApp';
import { COLORS } from './src/TodoApp/utils/constants';

export default function App() {
	return (
		<SafeAreaProvider style={{ flex: 1 }}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<LinearGradient
					style={{ flex: 1 }}
					start={{ x: 0.5, y: 0.4 }}
					end={{ x: 1, y: 0.6 }}
					colors={[COLORS.primary, COLORS.secondary]}
				>
					<TodoApp />
				</LinearGradient>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
