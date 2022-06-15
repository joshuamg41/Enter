import {DrawerContentComponentProps} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Images from '../../../assets/images';
import SVG from '../../../assets/svg/SVG';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import {
  navigateAndReset,
  closeDrawer,
} from '../../../services/NavigationService';
import {RootState} from '../../../stores/AppReducers';
import {COLORS, FONTS} from '../../../themes';
import {moderateScale} from '../../../utils/StyleHelpers';
import DrawerItem from './components/DrawerItem';
import Styles from './DrawerMenuStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Separator from '../../../components/separator/Separator';
import {localToString} from '../../../utils/StringUtil';
import {localToArray} from '../../../utils/ArrayUtil';

const DrawerMenu = (props: ScreenProps) => {
  const lastScreen = useCallback(() => {
    //@ts-ignore
    return localToString(
      props.state?.history[localToArray(props.state?.history).length - 2]?.key,
    ).split('-')[0];
  }, [props.state?.history]);

  return (
    <Container style={Styles.container}>
      <Content showsVerticalScrollIndicator>
        <View style={Styles.logoContent}>
          <Separator height={20} />
          <TouchableOpacity onPress={() => closeDrawer()}>
            <Ionicons
              name={'chevron-back'}
              size={FONTS.mediumIcon}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Separator height={30} />
          <Image
            source={Images.logo_blue_white}
            style={Styles.logo}
            resizeMode="contain"
          />
          <Separator height={20} />
        </View>
        <DrawerItem
          name="Inicio"
          goTo="Home"
          iconName="home-outline"
          lastScreen={lastScreen()}
        />
        <DrawerItem
          name="Ver entradas"
          goTo="Entry"
          iconName="log-in-outline"
          lastScreen={lastScreen()}
        />
        <DrawerItem
          name="Ver salidas"
          goTo="Exit"
          iconName="log-out-outline"
          lastScreen={lastScreen()}
        />
        <DrawerItem
          name="Gestión de empleados"
          goTo="EmployeeList"
          iconName="people-outline"
          lastScreen={lastScreen()}
        />
        <DrawerItem
          name="Visitas"
          goTo="Visit"
          iconName="people-outline"
          lastScreen={lastScreen()}
        />
        <DrawerItem
          name="Gestión de accidentes"
          goTo="AccidentList"
          iconName="walk-outline"
          lastScreen={lastScreen()}
        />
        <DrawerItem
          name="Gestión de ausencias"
          goTo="Absence"
          iconName="alert-outline"
          lastScreen={lastScreen()}
        />
        {/* <DrawerItem
          name="Estadísticas"
          goTo='undefined'
          iconName='stats-chart-outline'
          lastScreen={lastScreen()}
        /> */}
        <DrawerItem
          name="Configuración"
          goTo="Config"
          iconName="settings-outline"
          lastScreen={lastScreen()}
        />
      </Content>
    </Container>
  );
};

interface ScreenProps extends ReduxProps, DrawerContentComponentProps {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DrawerMenu);
