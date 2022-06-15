import {useFocusEffect} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import update from 'immutability-helper';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Container from '../../components/container/Container';
import Content from '../../components/content/Content';
import Header from '../../components/header/Header';
import InputSearch from '../../components/input-search/InputSearch';
import Text from '../../components/text/Text';
import {ExampleRequest} from '../../services/example/ExampleServiceConstants';
import {RootState} from '../../stores/AppReducers';
import ExampleActions from '../../stores/example/Actions';
import {MainNavigatorParamList} from '../root/navigators/MainNavigator';
import {VisitState} from './VisitConstants';
import Styles from './VisitStyles';
import CheckRender from '../../components/security/CheckRender';
import {PermissionsAndroid, RefreshControl, View} from 'react-native';
import ApplicationStyles from '../../themes/ApplicationStyles';
import Button from '../../components/button/Button';
import Separator from '../../components/separator/Separator';
import PermissionUtil from '../../utils/PermissionUtil';
import {useNavigation} from '@react-navigation/native';

const Example = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<VisitState>({});
  const nav = useNavigation();

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => {};
    }, [props.navigation]),
  );

  useFocusEffect(
    useCallback(() => {
      //function
      return () => {};
    }, [props.route]),
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current) {
      console.log(props.getData);
    }
    return () => {};
  }, [props.getData]);

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  //Misc
  const doRequest = () => {
    const request: ExampleRequest = {};
    props.doSomething(request);
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

  //Value change handlers
  const onStateChange =
    (key: string, format?: (value: any) => string) => (value: any) => {
      return setState((prevState: any) =>
        update(prevState, {[key]: {$set: format ? format(value) : value}}),
      );
    };

  //rendering
  return (
    <Container style={Styles.container}>
      <Header title="Visitas" leftIcon />
      <Content>
        <CheckRender allowed={props.user.data.role?.name != 'Admin'}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View style={[ApplicationStyles.row, ApplicationStyles.pLarge]}>
              <Button
                title="Registrar entrada"
                onPress={() => nav.navigate('ScanQr')}
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
          </View>
        </CheckRender>
        <CheckRender allowed={props.user.data.role?.name == 'Admin'}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={[ApplicationStyles.row, ApplicationStyles.pLarge]}>
              <Button
                title="Crear visitante"
                //   onPress={goToSecurity('entry')}
                containerStyle={ApplicationStyles.flex1}
                widthSeparator={0}
                bottomSeparate={false}
              />
            </View>
          </View>
        </CheckRender>
        <View></View>
      </Content>
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    StackScreenProps<MainNavigatorParamList, 'Example'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.example.getData,
  getLoading: state.example.getLoading,
  getError: state.example.getError,
});

const mapDispatchToProps = {
  doSomething: ExampleActions.examplePayload,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Example);
