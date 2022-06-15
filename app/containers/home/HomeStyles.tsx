import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../themes';
import ApplicationStyles from '../../themes/ApplicationStyles';
import { moderateScale, verticalScale } from '../../utils/StyleHelpers';

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

  //todoSection
  todoSection: {
    ...ApplicationStyles.hPLarge,
  },

  //Modalize
  modalizeSection: {
    backgroundColor: COLORS.white,
  },
  modalizeHandle: {
    backgroundColor: COLORS.white,
  },
});

export default Styles