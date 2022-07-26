import { StyleSheet } from 'react-native';
import { COLORS, FONTS, FONTS_FAMILY, METRICS } from '../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  title: {
    fontSize: FONTS.large,
    fontFamily: FONTS_FAMILY.medium.title,
    paddingHorizontal: horizontalScale(METRICS.medium10),
  },
  subTitle: {
    fontSize: FONTS.title,
    fontFamily: FONTS_FAMILY.medium.body,
    paddingHorizontal: horizontalScale(METRICS.medium10),
  },
});

export default Styles