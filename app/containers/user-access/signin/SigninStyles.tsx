import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { verticalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {

  },
  content: {
  },
  titleSection: {
    ...ApplicationStyles.hPLarge,
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
  },
  forgottenButton: {
    paddingTop: verticalScale(METRICS.medium10),
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
  },
  subTitle: {
    color: COLORS.gray,
  },
});

export default Styles