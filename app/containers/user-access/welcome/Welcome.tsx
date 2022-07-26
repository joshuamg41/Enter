import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImageBackground, View } from 'react-native';
// import OneSignal from 'react-native-onesignal';
import RNSplashScreen from 'react-native-splash-screen';
import { connect, ConnectedProps } from "react-redux";
import ButtonBack from '../../../components/button-back/ButtonBack';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import CompanyLogo from '../../../components/company-logo/CompanyLogo';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { RootState } from '../../../stores/AppReducers';
import SigninActions from '../../../stores/signin/Actions';
import { COLORS, METRICS } from '../../../themes';
import { MainNavigatorParamList } from '../../root/navigators/MainNavigator';
import { WelcomeState } from './WelcomeConstants';
import Styles from './WelcomeStyles';
import { Images } from '../../../assets/index'

const Welcome = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<WelcomeState>({})
  const [modalVisible, setModalVisible] = useState<string | boolean>(false)

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      props.destroyData()
      // BackgroundTimer.stopBackgroundTimer()
      RNSplashScreen.hide()
      // OneSignal.disablePush(true)
      // OneSignal.removeExternalUserId()
      return () => {
        setModalVisible(false)
      }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current) {

    }
    return () => { }
  }, [])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (

    <Container
      barColor={COLORS.white}
    >
      <ImageBackground
        resizeMode='cover'
        source={Images.background}
        style={Styles.container}
      >
        <View style={Styles.welcomeSection}>
          <CompanyLogo />
        </View>
        <View style={Styles.buttonSection}>
          {/* <Button
          onPress={() => props.navigation.navigate('Signup')}
          title="Registrarme"
          theme='primary'
        /> */}
          <Button
            onPress={() => props.navigation.navigate('Signin')}
            title="Iniciar sesión"
            theme='primaryOutline'
          />
        </View>
      </ImageBackground>
    </Container >
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'Welcome'> {

}

const mapStateToProps = (state: RootState) => ({
  // user: state.signin.user,
});

const mapDispatchToProps = {
  destroyData: SigninActions.logoutDestroyData,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Welcome)