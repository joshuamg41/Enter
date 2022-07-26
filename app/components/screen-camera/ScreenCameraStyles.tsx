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
});

export default Styles;

function borderColor(
  large15: number,
  borderColor: any,
  lightGray: string,
  borderWidth: any,
  arg4: number,
  justifyContent: any,
  arg6: string,
  alignItems: any,
  arg8: string,
): string | number | undefined {
  throw new Error('Function not implemented.');
}

function borderWidth(
  large15: number,
  borderColor: any,
  lightGray: string,
  borderWidth: any,
  arg4: number,
  justifyContent: any,
  arg6: string,
  alignItems: any,
  arg8: string,
): string | number | undefined {
  throw new Error('Function not implemented.');
}

function justifyContent(
  large15: number,
  borderColor: any,
  lightGray: string,
  borderWidth: any,
  arg4: number,
  justifyContent: any,
  arg6: string,
  alignItems: any,
  arg8: string,
): string | number | undefined {
  throw new Error('Function not implemented.');
}

function alignItems(
  large15: number,
  borderColor: any,
  lightGray: string,
  borderWidth: any,
  arg4: number,
  justifyContent: any,
  arg6: string,
  alignItems: any,
  arg8: string,
): string | number | undefined {
  throw new Error('Function not implemented.');
}
