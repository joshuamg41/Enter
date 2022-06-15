import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, RefreshControl, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Container from '../../components/container/Container';
import Content from '../../components/content/Content';
import Header from '../../components/header/Header';
import Separator from '../../components/separator/Separator';
import Text from '../../components/text/Text';
import UserPhoto from '../../components/user-photo/UserPhoto';
import {RootState} from '../../stores/AppReducers';
import {COLORS, FONTS, METRICS} from '../../themes';
import {DrawerNavigatorParamList} from '../root/navigators/DrawerNavigator';
import {HomeState} from './HomeConstants';
import Styles from './HomeStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PermissionUtil from '../../utils/PermissionUtil';
import ApplicationStyles from '../../themes/ApplicationStyles';
import Button from '../../components/button/Button';
import StackedBarSection from './components/StackedBarSection';
import ListRender from '../../components/list-render/ListRender';
import RenderTodo from './components/RenderTodo';
import DominicanMap from './components/DominicanMap';
import HomeActions from '../../stores/home/Actions';
import {Modalize} from 'react-native-modalize';
import {viewportHeight} from '../../utils/StyleHelpers';
import {ProvinceResponseItem} from '../../services/home/HomeServiceConstants';
import RenderRow from '../../components/render/row/RenderRow';
import {localToString} from '../../utils/StringUtil';
import CheckRender from '../../components/security/CheckRender';
import ModalizeChart from './components/ModalizeChart';
import {RefreshControlBaseProps} from '../../utils/ConstantsUtil';
import ErrorContainer from '../../components/error-container/ErrorContainer';

const Home = (props: ScreenProps) => {
  const mounted = useRef(false);
  const modalRef = useRef<Modalize>();
  const [province, setProvince] = useState<ProvinceResponseItem>();
  const [state, setState] = useState<HomeState>({});

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      getScreen();
      mounted.current = true;
      return;
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  //Misc
  const getScreen = () => {
    const request = {
      proyectoID: props.user.data.proyectoID,
    };
    props.getHome(request);
  };

  const goToSecurity = (type?: 'entry' | 'exit') => async () => {
    const permission = await PermissionUtil.requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      '',
      '',
      '',
    );
    if (!permission) {
      return;
    }

    props.navigation.navigate('Security', {type});
  };

  const getInOutData = useCallback(() => {
    return [
      {
        title: 'Estadísticas de la semana de entradas',
        data: props.getData.entryData,
      },
      {
        title: 'Estadísticas de la semana de salidas',
        data: props.getData.exitData,
      },
    ].filter(item => item.data.length);
  }, [props.getData]);

  //rendering
  return (
    <Container style={Styles.container}>
      <Header iconName="menu" leftIcon />
      <Content
        refreshControl={
          <RefreshControl {...RefreshControlBaseProps} onRefresh={getScreen} />
        }>
        <View style={Styles.profileSection}>
          <UserPhoto />
          <Separator height={METRICS.medium10} />
          <Text style={Styles.nameText}>
            {props.user.data.name} {props.user.data.lastName}
          </Text>
          <Text style={Styles.idText}>{props.user.data.role?.name}</Text>
          <CheckRender allowed={props.user.data.role?.name != 'Admin'}>
            <Text style={Styles.idText}>Proyecto: Quintas Palmeras</Text>
          </CheckRender>
        </View>

        <ErrorContainer isLoading={props.getLoading}>
          <CheckRender allowed={props.user.data.role?.name == 'Admin'}>
            <DominicanMap
              data={props.getData.provinceData}
              loading={props.getLoading}
              setProvince={setProvince}
              modalRef={modalRef.current}
            />
          </CheckRender>

          <CheckRender allowed={props.user.data.role?.name != 'Admin'}>
            <Separator />
          </CheckRender>

          <CheckRender allowed={props.user.data.role?.name != 'Admin'}>
            <StackedBarSection data={getInOutData()} />
          </CheckRender>

          <CheckRender allowed={props.user.data.role?.name != 'Admin'}>
            <View style={[ApplicationStyles.row, ApplicationStyles.pLarge]}>
              <Button
                title="Registrar entrada"
                onPress={goToSecurity('entry')}
                containerStyle={ApplicationStyles.flex1}
                widthSeparator={0}
                bottomSeparate={false}
              />
              <Separator />
              <Button
                title="Registrar salida"
                onPress={goToSecurity('exit')}
                containerStyle={ApplicationStyles.flex1}
                widthSeparator={0}
                bottomSeparate={false}
              />
            </View>
          </CheckRender>
        </ErrorContainer>

        {/* <View style={Styles.todoSection}>
          <Text>Actividades en agenda</Text>
          <Separator height={METRICS.medium10} />
          <ListRender
            data={[{}, {}]}
            renderItem={RenderTodo}
            ItemSeparatorComponent={<Separator height={METRICS.medium10} />}
            renderSeparator
          />
        </View> */}

        <Separator />
      </Content>

      <Modalize
        // modalHeight={viewportHeight / 2}
        adjustToContentHeight
        ref={modalRef}
        modalStyle={Styles.modalizeSection}
        handleStyle={Styles.modalizeHandle}>
        <ModalizeChart province={province} />
      </Modalize>
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    StackScreenProps<DrawerNavigatorParamList, 'Home'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.home.getData,
  getLoading: state.home.getLoading,
  getError: state.home.getError,
});

const mapDispatchToProps = {
  getHome: HomeActions.getHome,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Home);
