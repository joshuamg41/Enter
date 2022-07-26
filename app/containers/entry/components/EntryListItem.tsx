import moment from 'moment';
import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import RenderRow from '../../../components/render/row/RenderRow';
import Separator from '../../../components/separator/Separator';
import {EntryListResponseItem} from '../../../services/entry/EntryServiceConstants';
import {COLORS, METRICS} from '../../../themes';
import {moderateScale} from '../../../utils/StyleHelpers';

const EntryListItem: FunctionComponent<propTypes> = props => {
  const item = props.item;
  console.log(item, 'aqui');

  return (
    <View style={Styles.container}>
      <RenderRow
        title1="Nombre"
        body1={item?.employee?.name}
        title2="Provincia"
        body2={item?.employee?.provincia?.name}
      />
      <Separator height={METRICS.medium10} />
      <RenderRow
        title1="Labor"
        body1={item?.employee?.labor?.description}
        title2="Fecha creación"
        body2={moment(item.createdAt, 'YYYY-MM-DD[T]HH:mm:ss')
          .subtract(4, 'hour')
          .format('DD/MMM/YYYY hh:mm a')}
      />
    </View>
  );
};

interface propTypes {
  item: EntryListResponseItem;
  index: number;
}

EntryListItem.defaultProps = {};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: moderateScale(METRICS.medium10),
    paddingVertical: moderateScale(METRICS.medium10),
    marginHorizontal: moderateScale(METRICS.medium10),
    borderRadius: moderateScale(METRICS.medium10),
  },
});

export default EntryListItem;
