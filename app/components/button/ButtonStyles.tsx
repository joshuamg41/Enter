import {StyleSheet} from 'react-native';
import {FONTS, METRICS} from '../../themes';
import {horizontalScale, verticalScale} from '../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: verticalScale(50),
    borderRadius: verticalScale(30),
  },
  buttonContent: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
  },
  title: {
    fontSize: FONTS.regular,
  },
  loading: {
    padding: METRICS.small5,
  },
});

export default Styles;
