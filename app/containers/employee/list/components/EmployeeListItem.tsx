import moment from 'moment';
import React, {FunctionComponent} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import RenderRow from '../../../../components/render/row/RenderRow';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import {EmployeeResponseItem} from '../../../../services/employee/EmployeeServiceConstants';
import {COLORS, METRICS} from '../../../../themes';
import {moderateScale} from '../../../../utils/StyleHelpers';
import {Rating, AirbnbRating} from 'react-native-ratings';
import QRCode from 'react-native-qrcode-svg';
import {BaseApi} from '../../../../services/BaseApi';

const EmployeeListItem: FunctionComponent<propTypes> = props => {
  return (
    <Pressable
      onPress={() =>
        props.navigation.navigate('EmployCard', {item: props.item})
      }>
      <View style={Styles.container}>
        <RenderRow
          title1="Nombre"
          body1={props.item.name}
          title2="Provincia"
          body2={props.item.provincia?.name}
        />
        <Separator height={METRICS.medium10} />
        <RenderRow
          title1="Labor"
          body1={props.item.labor.type}
          title2="Contratista"
          body2={props.item.maestro?.name}
        />
        <RenderRow
          title1="Calificacion"
          body1={
            <AirbnbRating
              count={5}
              defaultRating={props.item.calificacion}
              size={20}
              showRating={false}
              onFinishRating={ratings => {
                BaseApi.post('employees/changeRating', {
                  id: props.item.id,
                  rating: ratings,
                });
              }}
            />
          }
          title2="codigo Id"
          body2={<QRCode value={props.item.id} size={50} />}
        />
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
        <Text style={{fontSize: 14}}>Calificacion</Text>
        <AirbnbRating
        count={props.item.calificacion}
        defaultRating={5}
        size={20}
        showRating={false}
        />
        </View>
        <QRCode value={props.item.id} size={10} />
      </View> */}
      </View>
    </Pressable>
  );
};
interface propTypes {
  item: EmployeeResponseItem;
  index: number;
}

EmployeeListItem.defaultProps = {};

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

export default EmployeeListItem;
