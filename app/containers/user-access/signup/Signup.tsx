import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, PermissionsAndroid, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container, { ContainerRef } from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import Input from '../../../components/Input/Input';
import PickerSelect from '../../../components/picker-select/PickerSelect';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { documentTypeSelect } from '../../../services/LocalService';
import { SignupRequest } from '../../../services/signup/SignupServiceConstants';
import { RootState } from '../../../stores/AppReducers';
import SignupActions from '../../../stores/signup/Actions';
import { COLORS, FONTS, METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { cleanNumber } from '../../../utils/NumberUtil';
import PermissionUtil from '../../../utils/PermissionUtil';
import { cleanString, localToString } from '../../../utils/StringUtil';
import { MainNavigatorParamList } from '../../root/navigators/MainNavigator';
import { schemaValidation, SignupState } from './SignupConstants';
import Styles from './SignupStyles';
import PhotoActions from '../../../stores/photo/Actions';

const Signup = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const contentRef = useRef<KeyboardAwareScrollView>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [state, setState] = useState<SignupState>({
    docType: undefined,
    docNumber: undefined,
    name: undefined,
    email: undefined,
    hidePassword: true,
    password: undefined,
    hidePasswordRetry: true,
    passwordRetry: undefined,
  })
  const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched, resetForm, setFieldError } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => doRequest(values, actions),
    validationSchema: schemaValidation,
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => {
        onSuccessEnd()
      }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && props.postError?.message) {
      setIsVisible(true)
    }
    return () => { }
  }, [props.postError])

  useEffect(() => {
    if (mounted.current && props.postData?.date) {
      containerRef.current?.showSuccess()
    }
    return () => { }
  }, [props.postData])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const doRequest = (values: SignupState, actions: any) => {
    const { photo } = props
    if (!photo?.path) {
      return
    }

    const request = {
      // docType: localToString(values.docType),
      // docNumber: values.docType == "1" ? cleanNumber(values.docNumber) : cleanString(values.docNumber),
      name: values.name,
      email: cleanString(values.email),
      isAdmin: false,
      password: cleanString(values.password),
      photo,
    }
    props.postRegister(request)
  }

  const onSuccessEnd = () => {
    resetForm()
    props.setPhoto(undefined)
  }

  const imagePressed = async () => {
    const permission = await PermissionUtil.requestAndroidPermission(PermissionsAndroid.PERMISSIONS.CAMERA, undefined, undefined, '');
    if (!permission) {
      return;
    }

    props.navigation.navigate('ScreenCamera')
    setFieldTouched('imagePicker', true)
  }

  //Value change handlers
  const onStateChange = (key: string) => (value: any) => {
    return setFieldValue(key, value)
  };

  const onBlur = (key: string) => () => {
    return setFieldTouched(key)
  };

  //rendering
  return (
    <Container
      ref={containerRef}
      modalProps={{
        isVisible: isVisible,
        onVisibleChange: setIsVisible,
      }}
      errorBody={props.postError?.message}
      successFunction={onSuccessEnd}
      successMessage={'Usuario creado correctamente'}
    >
      <Header
        leftIcon
      />
      <Content
        contentContainerStyle={Styles.content}
        keyboardShouldPersistTaps='always'
        //@ts-ignore
        scrollRef={contentRef}
      >
        <View style={Styles.titleSection}>
          <Separator />
          <Text style={Styles.title}>Registrate en Enter</Text>
          <Text style={Styles.subTitle}>Al registrate aceptas los términos y condiciones</Text>
        </View>
        <View style={Styles.formSection}>
          <TouchableWithoutFeedback onPress={imagePressed}>
            <View style={Styles.photoContain}>
              <CheckRender allowed={props.photo?.path}>
                <Image
                  source={{ uri: 'file://' + props.photo?.path }}
                  style={Styles.photo}
                  resizeMode='cover'
                />
                <Ionicons
                  name="camera"
                  size={FONTS.largeIcon}
                  color={COLORS.lightGray}
                  style={Styles.photoIcon}
                />
              </CheckRender>
              <CheckRender allowed={!props.photo?.path}>
                <Ionicons
                  name="camera"
                  size={FONTS.mediumIcon}
                  color={COLORS.primary}
                />
                <Text style={Styles.photoText}>Tirar foto</Text>
              </CheckRender>
            </View>
          </TouchableWithoutFeedback>
          <Separator height={METRICS.xxLarge30} />
          <PickerSelect
            data={documentTypeSelect}
            iconName="document-text"
            value={values.docType}
            onValueChange={onStateChange('docType')}
            placeholder="Tipo de documento"
            onPickerBlur={onBlur('docType')}
            showError={touched.docType && errors.docType}
          />
          <CheckRender allowed={values.docType != '2'}>
            <Input
              iconName="person"
              placeholder="Número de documento"
              mask='identification'
              value={values.docNumber}
              onValueChange={handleChange('docNumber')}
              onInputBlur={onBlur("docNumber")}
              showError={touched.docNumber && errors.docNumber}
              editable={!!values.docType}
            />
          </CheckRender>
          <CheckRender allowed={values.docType == '2'}>
            <Input
              iconName="person"
              placeholder="Número de documento"
              value={values.docNumber}
              onValueChange={handleChange('docNumber')}
              onInputBlur={handleBlur("docNumber")}
              showError={touched.docNumber && errors.docNumber}
              editable={!!values.docType}
              maxLength={9}
            />
          </CheckRender>
          <Input
            iconName="mail-outline"
            placeholder="Correo"
            value={values.email}
            onValueChange={handleChange('email')}
            onInputBlur={handleBlur("email")}
            showError={touched.email && errors.email}
            maxLength={320}
            keyboardType="email-address"
            textContentType='emailAddress'
            autoCapitalize='none'
          />
          <Input
            secureTextEntry={values.hidePassword}
            placeholder="Contraseña"
            iconName="lock-closed"
            value={values.password}
            onValueChange={handleChange("password")}
            onInputBlur={handleBlur("password")}
            showError={touched.password && errors.password}
            textContentType='password'
            autoCapitalize='none'
            rightSection={
              <Ionicons
                onPress={() => setFieldValue("hidePassword", !values.hidePassword)}
                name={values.hidePassword ? "eye" : "eye-off"}
                size={FONTS.mediumIcon}
                color={COLORS.primary}
              />
            }
          />
          <Input
            secureTextEntry={values.hidePasswordRetry}
            placeholder="Repetir contraseña"
            iconName="lock-closed"
            value={values.passwordRetry}
            onValueChange={handleChange("passwordRetry")}
            onInputBlur={handleBlur("passwordRetry")}
            showError={touched.passwordRetry && errors.passwordRetry}
            returnKeyType="done"
            textContentType='password'
            autoCapitalize='none'
            rightSection={
              <Ionicons
                onPress={() => setFieldValue("hidePasswordRetry", !values.hidePasswordRetry)}
                name={values.hidePasswordRetry ? "eye" : "eye-off"}
                size={FONTS.mediumIcon}
                color={COLORS.primary}
              />
            }
          />
        </View>
      </Content>
      <Button
        onPress={handleSubmit}
        title="Siguiente"
        theme="primary"
        isLoading={props.postLoading}
        bottomSeparate={false}
      />
      <Separator height={METRICS.small5} />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'Signup'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  photo: state.photo.photoData,

  postData: state.signup.postData,
  postLoading: state.signup.postLoading,
  postError: state.signup.postError,
});

const mapDispatchToProps = {
  setPhoto: PhotoActions.setPhoto,
  postRegister: SignupActions.postRegister,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Signup)