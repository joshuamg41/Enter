import { StyleSheet } from 'react-native';
import { COLORS, METRICS } from '../../themes';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';

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

  //Modalize
  modalizeSection: {
    backgroundColor: COLORS.white,
  },
  modalizeHandle: {
    backgroundColor: COLORS.white,
  },
});

export default Styles