import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  title: {
    
  },
  container: {

  },

  //Drawer
  textStyle: {
    color: COLORS.gray,
  },
  iconStyle: {
    color: COLORS.gray,
  },

  //Modalize
  modalizeTitle: {
    textAlign: 'center',
    paddingHorizontal: verticalScale(METRICS.medium10),
  },
  modalizeContent: {
    paddingTop: verticalScale(METRICS.xLarge20),
  },
  handleStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: moderateScale(0.5),
    borderColor: COLORS.white,
  },
  closeDrawer: { 
    textAlign: 'center', 
    color: COLORS.red 
  },
});

export default Styles