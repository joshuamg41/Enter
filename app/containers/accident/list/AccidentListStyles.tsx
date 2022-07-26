import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  headerSection: {

  },
  filterContent: {
    flexDirection: 'row',
  },
  filterTouchable: {
    // flex: 1,
    backgroundColor: COLORS.primary,
    minHeight: verticalScale(55),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  filterTitle: {
    textAlign: 'center',
    color: COLORS.white,
  },

  //Create button
  buttonSection: {
    position: 'absolute',
    bottom: moderateScale(METRICS.medium10),
    right: moderateScale(METRICS.medium10),
  },
  createTouchable: {
    backgroundColor: COLORS.primary,
    padding: moderateScale(METRICS.large15),
    borderRadius: moderateScale(50),
  },
  createIcon: {
    color: COLORS.white,
    fontSize: FONTS.mediumIcon,
    alignSelf: 'center',
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