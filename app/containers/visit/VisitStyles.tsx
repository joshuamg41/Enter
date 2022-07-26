import {StyleSheet} from 'react-native';
import ApplicationStyles from '../../themes/ApplicationStyles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../utils/StyleHelpers';
import {COLORS, FONTS, METRICS} from '../../themes';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  createTouchable: {
    backgroundColor: COLORS.primary,
    padding: moderateScale(METRICS.large15),
    borderRadius: moderateScale(50),
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  createIcon: {
    color: COLORS.white,
    fontSize: FONTS.mediumIcon,
    alignSelf: 'center',
  },
  headerSection: {
    backgroundColor: 'black',
    alignItems: 'flex-end',
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
});

export default Styles;
