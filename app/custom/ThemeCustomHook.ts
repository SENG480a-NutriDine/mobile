import { useColorScheme, TextStyle, ViewStyle } from 'react-native';
import { globalStyles } from '../constants/styles/global';

interface ThemeStyles {
  themeTextStyle: TextStyle;
  themeContainerStyle: ViewStyle;
}

export const themeCustomHook = (): ThemeStyles => {
  const colorScheme = useColorScheme();

  const themeTextStyle: TextStyle = colorScheme === 'light' ? globalStyles.lightThemeText : globalStyles.darkThemeText;
  const themeContainerStyle: ViewStyle = colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer;

  return { themeTextStyle, themeContainerStyle };
};
