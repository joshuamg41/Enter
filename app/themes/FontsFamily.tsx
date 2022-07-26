import { Platform } from 'react-native';

const FONTS_FAMILY = {
  regular: Platform.select({
    ios: '',
    android: '',
  }),
  medium: Platform.select({
    ios: '',
    android: '',
  }),
  bold: Platform.select({
    ios: '',
    android: '',
  }),
};

export default FONTS_FAMILY