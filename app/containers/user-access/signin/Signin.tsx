import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from "react-redux";
import ButtonText from '../../../components/button-text/ButtonText';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import Input from '../../../components/Input/Input';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { navigateAndReset } from '../../../services/NavigationService';
import { RootState } from '../../../stores/AppReducers';
import SigninActions from '../../../stores/signin/Actions';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { MainNavigatorParamList } from '../../root/navigators/MainNavigator';
import { schemaValidation, SigninState } from './SigninConstants';
import Styles from './SigninStyles';

const Signin = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [state, setState] = useState<SigninState>({
    hidePassword: true,
    email: undefined,
    password: undefined,
  })
  const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched, resetForm } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => doRequest(values, actions),
    validationSchema: schemaValidation,
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && props.error && !isVisible) {
      Keyboard.dismiss()
      setIsVisible(true)
    }
    return () => { }
  }, [props.error])

  useEffect(() => {
    if (mounted.current && props.user.isLogged) {
      navigateAndReset('Pin');
    }
    return () => { }
  }, [props.user])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const doRequest = (values: SigninState, actions: any) => {
    Keyboard.dismiss()
    if (props.isLoading) {
      return
    }
    const request = {
      email: values.email,
      password: values?.password,
    }
    props.login(request)
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container
      modalProps={{
        isVisible: isVisible,
        onVisibleChange: setIsVisible,
      }}
      errorBody={props.error?.message ?? "Usuario o contraseña incorrecta"}
    >
      <Header
        leftIcon
      />
      <Content contentContainerStyle={Styles.content}>
        <View style={Styles.titleSection}>
          <Separator />
          <Text style={Styles.title}>Inicia sesión en Enter</Text>
          <Text style={Styles.subTitle}>Al iniciar sesión aceptas los términos y condiciones</Text>
        </View>
        <View style={Styles.formSection}>
          <Input
            iconName="person"
            placeholder='Correo'
            value={values.email}
            onValueChange={handleChange('email')}
            onInputBlur={handleBlur("email")}
            showError={touched.email && errors.email}
            autoCapitalize='none'
            maxLength={144}
          />
          <Input
            secureTextEntry={values.hidePassword}
            value={values.password}
            onValueChange={handleChange("password")}
            onInputBlur={handleBlur("password")}
            showError={touched.password && errors.password}
            placeholder="Contraseña"
            onEndEditing={handleSubmit}
            returnKeyType="done"
            autoCapitalize='none'
            rightSection={
              <Ionicons
                onPress={() => setFieldValue("hidePassword", !values.hidePassword)}
                name={values.hidePassword ? "eye" : "eye-off"}
                size={FONTS.mediumIcon}
                color={COLORS.gray}
              />
            }
          />
          <ButtonText
            onPress={() => props.navigation.navigate('ForgotPassword')}
            title="¿Olvidaste la contraseña?"
            theme="primary"
            containerStyle={Styles.forgottenButton}
            bottomSeparate={false}
          />
        </View>
      </Content>
      <Button
        onPress={handleSubmit}
        isLoading={props.isLoading}
        title="Iniciar"
        theme='primary'
        bottomSeparate={false}
      />
      <Separator height={METRICS.small5} />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'Signin'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
  isLoading: state.signin.isLoading,
  error: state.signin.error,
});

const mapDispatchToProps = {
  login: SigninActions.login,
  cleanUp: SigninActions.signinCleanUp,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Signin)