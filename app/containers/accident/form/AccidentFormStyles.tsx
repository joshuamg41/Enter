import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { moderateScale, viewportWidth } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },

  //ProfileSection
  profileSection: {
    backgroundColor: COLORS.primaryOpacity,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(METRICS.xLargeMedium25),
  },
  nameText: {
    color: COLORS.white,
    fontSize: FONTS.large,
  },
  idText: {
    color: COLORS.white,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: moderateScale(METRICS.medium10),
    width: '100%',
  },
});

export default Styles