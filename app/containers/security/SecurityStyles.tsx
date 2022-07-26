import {StyleSheet} from 'react-native';
import {COLORS, METRICS} from '../../themes';
import {moderateScale, verticalScale} from '../../utils/StyleHelpers';

const CIRCLE_SIZE = 70;

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  camera: {
    flex: 1,
  },

  //Bottom
  absolute: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: verticalScale(METRICS.large15),
  },
  absoluteChange: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: verticalScale(METRICS.large15),
    right: 10,
  },

  change: {
    backgroundColor: COLORS.white,
    height: 55,
    width: 100,
    borderColor: COLORS.lightGray,
    borderRadius: moderateScale(CIRCLE_SIZE),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    backgroundColor: COLORS.transparent,
    height: moderateScale(CIRCLE_SIZE),
    width: moderateScale(CIRCLE_SIZE),
    borderRadius: moderateScale(CIRCLE_SIZE),
    borderColor: COLORS.lightGray,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Styles;
