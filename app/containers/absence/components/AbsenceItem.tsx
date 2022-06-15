import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { GetAbsenceResponseItem } from '../../../services/absence/AbsenceServiceConstants';
import { COLORS, METRICS } from '../../../themes';
import { moderateScale } from '../../../utils/StyleHelpers';

const AbsenceItem: FunctionComponent<propTypes> = props => {
  return (
    <View style={Styles.container}>

    </View>
  );
}

interface propTypes {
  item: GetAbsenceResponseItem;
  index: number;
}

AbsenceItem.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: moderateScale(METRICS.medium10),
    paddingVertical: moderateScale(METRICS.medium10),
    marginHorizontal: moderateScale(METRICS.medium10),
    borderRadius: moderateScale(METRICS.medium10),
  },
})

export default AbsenceItem;