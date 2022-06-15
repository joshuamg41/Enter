import { StyleSheet } from 'react-native';
import { COLORS, FONTS_FAMILY, METRICS } from '../../../themes';
import { horizontalScale, moderateScale, screenHeight, screenWidth, verticalScale, viewportHeight, viewportWidth } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    height: screenHeight,
    width: screenWidth,
  },
  imageContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: moderateScale(METRICS.large15),
    borderRadius: moderateScale(METRICS.medium10),
  },
  imageIcon: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  welcomeText: {
    fontSize: moderateScale(40),
    paddingHorizontal: horizontalScale(METRICS.small5),
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: FONTS_FAMILY.bold.body,
  },
  welcomeSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonSection: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Styles