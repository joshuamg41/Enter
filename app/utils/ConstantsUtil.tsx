import { RefreshControlProps } from 'react-native';
import { COLORS, METRICS } from '../themes';
import { moderateScale } from './StyleHelpers';

export const RefreshControlBaseProps: RefreshControlProps = {
  colors: [COLORS.primary],
  progressBackgroundColor: COLORS.tertiary,
  tintColor: COLORS.tertiary,
  progressViewOffset: moderateScale(30),
  refreshing: false,
  title: 'Cargando',
  titleColor: COLORS.tertiary,
}

export const BasicHitSlop = {
  top: moderateScale(METRICS.medium10),
  bottom: moderateScale(METRICS.medium10),
  right: moderateScale(METRICS.medium10),
  left: moderateScale(METRICS.medium10),
}