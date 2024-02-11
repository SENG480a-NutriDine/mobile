import { useColorScheme } from 'react-native';
import { colors } from '../constants/styles/global';

const useThemedColors = () => {
    const colorScheme = useColorScheme();
    return colors[colorScheme] || colors.light;
};

export default useThemedColors;
