import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef } from 'react';
import { FlatList, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONTS, METRICS } from '../../themes';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';
import CheckRender from '../security/CheckRender';
import Text from '../text/Text';

const ModalizeOrderBy: ForwardRefRenderFunction<ModalizeOrderByRef, ModalizeOrderByPropTypes> = (props, ref) => {
  const modalRef = useRef<Modalize>();

  //use hooks
  useImperativeHandle(ref, () => ({
    openModalize: () => {
      modalRef.current?.open()
    },
    closeModalize: () => {
      modalRef.current?.close()
    },
  }))

  const handlePress = (key?: KeyOption) => () => {
    props.setOrderBy({
      orderName: key,
      orderBy: props.order.orderName == key ?
        props.order.orderBy == 'asc' ? 'desc' : 'asc'
        : 'asc'
    })
    modalRef.current?.close()
  }

  //Rendering
  const modalOption = (itemProps: { item: DataOptionItem, index: number }) => {
    const item = itemProps.item
    return (
      <TouchableHighlight
        style={Styles.buttonTouchable}
        underlayColor={COLORS.secondaryOpacity}
        onPress={handlePress(item.key)}
      >
        <View style={Styles.buttonView}>
          <Text style={Styles.buttonText}>{item.title}</Text>
          <CheckRender allowed={item.key == props.order.orderName}>
            <FontAwesome5
              name={props.order.orderBy == 'asc' ? 'sort-alpha-down' : "sort-alpha-down-alt"}
              size={FONTS.mediumIcon}
              color={props.order.orderBy == 'asc' ? COLORS.primary : COLORS.secondary}
            />
          </CheckRender>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <Modalize
      adjustToContentHeight
      ref={modalRef}
      modalStyle={Styles.modalizeSection}
      handleStyle={Styles.modalizeHandle}
    >
      <View style={Styles.container}>
        <FlatList
          data={props.dataOption}
          renderItem={modalOption}
        />
      </View >
    </Modalize>
  )
}

type KeyOption = 'name' | 'province' | 'role' | 'date' | 'master' | 'project' | 'adminReviewed'

export interface OrderByProps {
  orderName?: KeyOption ;
  orderBy?: 'asc' | 'desc';
}

export interface DataOptionItem {
  title?: string;
  key?: KeyOption;
}

export interface ModalizeOrderByRef {
  openModalize: () => void;
  closeModalize: () => void;
}

interface ModalizeOrderByPropTypes {
  order: OrderByProps;
  setOrderBy: (order: OrderByProps) => void;
  dataOption?: DataOptionItem[];
}

const Styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(METRICS.medium10),
  },
  buttonTouchable: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: verticalScale(50),
  },
  buttonText: {
    flex: 1,
  },

  //Modalize
  modalizeSection: {
    backgroundColor: COLORS.white,
  },
  modalizeHandle: {
    backgroundColor: COLORS.white,
  },
})

export default forwardRef(ModalizeOrderBy);