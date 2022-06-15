import {useFocusEffect} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect, ConnectedProps} from 'react-redux';
import Button from '../../../components/button/Button';
import Container, {ContainerRef} from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import Input from '../../../components/Input/Input';
import ModalPicker from '../../../components/modal-picker/ModalPicker';
import PickerSelect from '../../../components/picker-select/PickerSelect';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import {documentTypeSelect} from '../../../services/LocalService';
import {RootState} from '../../../stores/AppReducers';
import EmployeeFormActions from '../../../stores/employee/form/Actions';
import PhotoActions from '../../../stores/photo/Actions';
import {COLORS, FONTS} from '../../../themes';
import PermissionUtil from '../../../utils/PermissionUtil';
import {DrawerNavigatorParamList} from '../../root/navigators/DrawerNavigator';
import {EmployeeFormState, schemaValidation} from './EmployeeFormConstants';
import Styles from './EmployeeFormStyles';
import {useNavigation} from '@react-navigation/native';

const EmployeeForm = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const nav = useNavigation();
  const [state, setState] = useState<EmployeeFormState>({
    firstName: undefined,
    lastName: undefined,
    docType: undefined,
    docNumber: undefined,
    labor: undefined,
    masterList: undefined,
  });
  const {
    errors,
    handleBlur,
    setFieldValue,
    handleChange,
    values,
    handleSubmit,
    touched,
    setFieldTouched,
    resetForm,
    setFieldError,
  } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => postForm(values, actions),
    // validationSchema: schemaValidation,
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      getScreen();
      return () => {};
    }, [props.navigation]),
  );

  //recononcement
  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   const scannedOcr = scanOCR(frame);
  // }, []);

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && (props.postData.success || props.postError)) {
      containerRef.current?.showSuccess();
    }
    return () => {};
  }, [props.postData, props.postError]);

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
  const getScreen = () => {
    const request = {};
    props.getEmployeeForm(request);
  };

  const postForm = (values: EmployeeFormState, actions: any) => {
    const {photo} = props;
    if (!photo?.path) {
      //@ts-ignore
      alert('Debe adjuntar una foto de perfil');
      return;
    }

    const request = {
      apiRequest: {
        name: `${values.firstName} ${values.lastName}`,
        role: props.getData.laborList.find(labor => labor.value == values.labor)
          .label,
        proyectosIds: [props.user.data.proyectoID],
        provinciaId: '6271b01ba5394f5c9e7cf63e', //aqui hay que cambiar
        maestroId: values.masterList?.Id,
      },
      photo,
    };
    props.postEmployeeForm(request);
  };

  const onSuccessEnd = () => {
    resetForm();
    props.setPhoto(undefined);
  };

  const imagePressed = async () => {
    const permission = await PermissionUtil.requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      undefined,
      undefined,
      '',
    );
    if (!permission) {
      return;
    }

    props.navigation.navigate('ScreenCamera');
    setFieldTouched('imagePicker', true);
  };

  //Value change handlers
  const onStateChange = (key: string) => (value: any) => {
    return setFieldValue(key, value);
  };

  const onBlur = (key: string) => () => {
    return setFieldTouched(key);
  };
  //Misc
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

  //rendering
  return (
    <Container
      ref={containerRef}
      style={Styles.container}
      successFunction={onSuccessEnd}
      successMessage={
        props.postError?.message || 'Empleado registrado correctamente'
      }
      failure={!!props.postError}>
      <Header title="Crear empleado" leftIcon />
      <Content>
        <Separator />
        <TouchableWithoutFeedback onPress={imagePressed}>
          <View style={Styles.photoContain}>
            <CheckRender allowed={props.photo?.path}>
              <Image
                source={{uri: 'file://' + props.photo?.path}}
                style={Styles.photo}
                resizeMode="cover"
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
        <Separator />
        <Button
          title="Escanear Cedula"
          onPress={() => nav.navigate('ScanID')}
          bottomSeparate={false}
          isLoading={props.postLoading}
        />
        <Separator />
        <PickerSelect
          title="Tipo de documento"
          placeholder="Seleccionar documento"
          data={documentTypeSelect}
          iconName="document-text"
          value={values.docType}
          onValueChange={onStateChange('docType')}
          onPickerBlur={onBlur('docType')}
          showError={touched.docType && errors.docType}
        />
        <CheckRender allowed={values.docType != '2'}>
          <Input
            title="Documento"
            iconName="person"
            placeholder="Número de documento"
            mask="identification"
            value={values.docNumber}
            onValueChange={handleChange('docNumber')}
            onInputBlur={onBlur('docNumber')}
            showError={touched.docNumber && errors.docNumber}
            editable={!!values.docType}
          />
        </CheckRender>
        <CheckRender allowed={values.docType == '2'}>
          <Input
            title="Documento"
            iconName="person"
            placeholder="Número de documento"
            value={values.docNumber}
            onValueChange={handleChange('docNumber')}
            onInputBlur={handleBlur('docNumber')}
            showError={touched.docNumber && errors.docNumber}
            editable={!!values.docType}
            maxLength={9}
          />
        </CheckRender>
        <Input
          title="Nombre"
          placeholder="Digitar nombre"
          value={values.firstName}
          onValueChange={handleChange('firstName')}
          onInputBlur={handleBlur('firstName')}
          showError={touched.firstName && errors.firstName}
          maxLength={144}
          textContentType="givenName"
          autoCapitalize="none"
        />
        <Input
          title="Apellido"
          placeholder="Digitar apellido"
          value={values.lastName}
          onValueChange={handleChange('lastName')}
          onInputBlur={handleBlur('lastName')}
          showError={touched.lastName && errors.lastName}
          maxLength={144}
          textContentType="familyName"
          autoCapitalize="none"
        />
        <PickerSelect
          title="Labor"
          data={props.getData.laborList}
          value={values.labor}
          onValueChange={onStateChange('labor')}
          placeholder="Elegir Labor"
          showError={touched.labor && errors.labor}
        />
        <PickerSelect
          title="Calificacion"
          // data={props.getData.}
          // value={}
          onValueChange={onStateChange('calification')}
          placeholder="Elegir Calificacion"
          showError={touched.labor && errors.labor}
        />
        <ModalPicker
          title="Contratista"
          data={props.getData.masterList}
          value={values.masterList}
          onValueChange={onStateChange('masterList')}
          placeholder="Seleccionar Contratista"
          showError={touched.masterList && errors.masterList}
        />
        <Separator />
      </Content>
      <Button
        title="Registrar empleado"
        onPress={handleSubmit}
        bottomSeparate={false}
        isLoading={props.postLoading}
      />
      <Separator />
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    StackScreenProps<DrawerNavigatorParamList, 'EmployeeForm'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
  photo: state.photo.photoData,

  getData: state.employeeForm.getData,
  getLoading: state.employeeForm.getLoading,
  getError: state.employeeForm.getError,

  postData: state.employeeForm.postData,
  postLoading: state.employeeForm.postLoading,
  postError: state.employeeForm.postError,
});

const mapDispatchToProps = {
  getEmployeeForm: EmployeeFormActions.getEmployeeForm,
  postEmployeeForm: EmployeeFormActions.postEmployeeForm,
  setPhoto: PhotoActions.setPhoto,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(EmployeeForm);
