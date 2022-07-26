import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, METRICS} from '../../themes';
import {moderateScale} from '../../utils/StyleHelpers';
import ApplicationStyles from '../../themes/ApplicationStyles';
import Container from '../container/Container';
import {BaseApi} from '../../services/BaseApi';
import Button from '../button/Button';
import {useNavigation} from '@react-navigation/native';

const EntryCard = props => {
  const [user, setUser] = useState();
  const [status, setStatus] = useState('');
  // const getImage = async () => {
  //   const resApi = await LuxandApi.get('subject/');
  //   console.log(resApi.data);
  // };
  const id = {id: props.route.params.id};

  const registerEntry = async () => {
    // BaseApi.post('/employees/employeeEntry', {
    //   id: props.route.params.id,
    //   proyectoID: props.route.params.proyectoID,
    // }).then(resApi => {
    //   navigation.navigate('ScanQr', {
    //     proyectoID: props.user.data.proyectoID,
    //   });
    //   if (resApi.data) {
    //     Alert.alert(resApi.data.message || resApi.data);
    //   }
    // });
    await BaseApi.post('/employees/employeeEntry', {
      id: props.route.params.id,
      proyectoID: props.route.params.proyectoID,
    });
    if (resApi.data) {
      setStatus(resApi.data.message || resApi.data);
    } else {
      setStatus('Entrada Registrada');
    }
    // props.route.params.navigation.navigate('ScanQr', {
    //   proyectoID: props.user.data.proyectoID,
    // });
  };
  const registerExit = async () => {
    const resApi = await BaseApi.post('/employees/employeeExit', {
      id: props.route.params.id,
      proyectoID: props.route.params.proyectoID,
    });
    console.log(resApi);
    if (resApi.data) {
      alert(resApi.data.message || resApi.data);
    } else {
      console.log('Salida registrada');
      props.route.params.navigation.goBack('ScanQr', {
        proyectoID: props.user.data.proyectoID,
      });
    }
  };

  const getUser = async () => {
    try {
      const res = await BaseApi.post('/employees/getEntryInfo/', id);
      if (res.data.employee) {
        setUser(res.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container style={Styles.container}>
      <Image
        style={{width: 250, height: 250}}
        source={{
          uri: user?.employeePhoto,
        }}
      />
      <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
        <Text style={{fontSize: FONTS.regular}}>Nombre: </Text>
        <Text style={Styles.label}>{user?.employee?.name}</Text>
      </View>
      <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
        <Text style={{fontSize: FONTS.regular}}>
          Documento de Identificacion:
        </Text>
        <Text style={Styles.label}>{user?.employee?.docNumber}</Text>
      </View>
      <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
        <Text style={{fontSize: FONTS.regular}}>Fecha de Contracto:</Text>
        <Text style={Styles.label}>{user?.employee?.contractDate}</Text>
      </View>
      <Text>{status}</Text>
      <Button title="Aceptar" onPress={registerEntry} />
      {/* <Button
          title="Registrar Salida"
          onPress={registerExit}
          theme="primaryOutline"
        /> */}
      <Button
        title="Cancelar"
        theme="errorOutline"
        onPress={() =>
          props.route.params.navigation.navigate('DrawerNavigator')
        }
      />
    </Container>
  );
};

const Styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLORS.black,
    fontSize: FONTS.large,
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

export default EntryCard;
