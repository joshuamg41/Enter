import React from 'react';
import {Pressable, StyleSheet, TouchableHighlight} from 'react-native';
import Container from '../../../../components/container/Container';
import QRCode from 'react-native-qrcode-svg';
import {View} from 'react-native';
import Text from '../../../../components/text/Text';
import {COLORS, FONTS, METRICS} from '../../../../themes';
import ApplicationStyles from '../../../../themes/ApplicationStyles';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/StyleHelpers';
import {useNavigation} from '@react-navigation/native';
import {BaseApi} from '../../../../services/BaseApi';
const EmployCard = props => {
  const navigation = useNavigation();
  return (
    <Container style={Styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <QRCode value={props.route.params.item.id} size={180} />
        </View>
      </Pressable>
      <AirbnbRating
        count={5}
        defaultRating={props.route.params.item.calificacion}
        size={30}
        showRating={false}
        onFinishRating={ratings => {
          BaseApi.post('employees/changeRating', {
            id: props.route.params.item.id,
            rating: ratings,
          });
        }}
      />
      <View>
        <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
          <Text style={{fontSize: FONTS.small}}>Nombre: </Text>
          <Text style={Styles.label}>{props.route.params.item.name}</Text>
        </View>
        <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
          <Text style={{fontSize: FONTS.small}}>
            Documento de Identificacion:
          </Text>
          <Text style={Styles.label}>{props.route.params.item.docNumber}</Text>
        </View>
        <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
          <Text style={{fontSize: FONTS.small}}>Provincia: </Text>
          <Text style={Styles.label}>
            {props.route.params.item.provincia?.name}
          </Text>
        </View>
        <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
          <Text style={{fontSize: FONTS.small}}>Labor: </Text>
          <Text style={Styles.label}>{props.route.params.item.labor.type}</Text>
        </View>
        <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
          <Text style={{fontSize: FONTS.small}}>Contratista: </Text>
          <Text style={Styles.label}>
            {props.route.params.item.maestro?.name}
          </Text>
        </View>
        <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
          <Text style={{fontSize: FONTS.small}}>Fecha de contrato </Text>
          <Text style={Styles.label}>
            {props.route.params.item?.contractDate}
          </Text>
        </View>
        <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
          <Text style={{fontSize: FONTS.small}}>Proyectos: </Text>
          {/* <Text style={Styles.label}> */}
          {props.route.params.item.proyectos.map(res => {
            return <Text style={Styles.label}>{res.name}</Text>;
          })}
          {/* </Text> */}
        </View>
      </View>
      <View style={Styles.buttonSection}>
        <TouchableHighlight
          onPress={() =>
            props.navigation.navigate('EmployeeForm', {
              edit: props.route.params.item,
            })
          }
          style={Styles.createTouchable}
          underlayColor={COLORS.gray}>
          <Ionicons name={'pencil'} style={Styles.createIcon} />
        </TouchableHighlight>
      </View>
    </Container>
  );
};

const Styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  label: {
    color: COLORS.black,
    fontSize: FONTS.medium,
  },
  buttonSection: {
    position: 'absolute',
    bottom: moderateScale(METRICS.medium10),
    right: moderateScale(METRICS.medium10),
  },
  createTouchable: {
    backgroundColor: COLORS.primary,
    padding: moderateScale(METRICS.large15),
    borderRadius: moderateScale(50),
  },
  createIcon: {
    color: COLORS.white,
    fontSize: FONTS.mediumIcon,
    alignSelf: 'center',
  },
});

export default EmployCard;
