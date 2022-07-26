import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import RenderColumn from '../../../../components/render/column/RenderColumn';
import RenderRow from '../../../../components/render/row/RenderRow';
import Separator from '../../../../components/separator/Separator';
import { GetAccidentResponseItem } from '../../../../services/accident/AccidentServiceConstants';
import { COLORS, METRICS } from '../../../../themes';
import { moderateScale } from '../../../../utils/StyleHelpers';

const AccidentListItem: FunctionComponent<propTypes> = props => {
  return (
    <TouchableHighlight
      onPress={() => props.setAccident(props.item)}
      underlayColor={COLORS.lightGray}
      style={Styles.container}
      disabled
    >
      <View style={Styles.content}>
        <RenderRow
          title1='Nombre'
          body1={props.item.employee?.name}
          title2='Provincia'
          body2={props.item.province?.name}
        />
        <Separator height={METRICS.medium10} />
        <RenderRow
          title1='Proyecto'
          body1={props.item.project?.name}
          title2='Revisado admin'
          body2={props.item.adminReviewed ? 'Sí' : 'No'}
        />
        <Separator height={METRICS.medium10} />
        <RenderColumn
          title='Descripción'
          body={props.item.description}
        />
      </View>
    </TouchableHighlight>
  );
}

interface propTypes {
  item: GetAccidentResponseItem;
  index: number;
  setAccident: (accident: GetAccidentResponseItem) => void;
}

AccidentListItem.defaultProps = {

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
  content: {

  },
})

export default AccidentListItem;