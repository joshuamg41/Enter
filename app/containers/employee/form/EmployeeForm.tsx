import {useFocusEffect} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
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
import {
  documentTypeSelect,
  EmployeeTypeSelect,
} from '../../../services/LocalService';
import {RootState} from '../../../stores/AppReducers';
import EmployeeFormActions from '../../../stores/employee/form/Actions';
import PhotoActions from '../../../stores/photo/Actions';
import {COLORS, FONTS, METRICS} from '../../../themes';
import PermissionUtil from '../../../utils/PermissionUtil';
import {DrawerNavigatorParamList} from '../../root/navigators/DrawerNavigator';
import {EmployeeFormState} from './EmployeeFormConstants';
import Styles from './EmployeeFormStyles';
import {BaseApi} from '../../../services/BaseApi';
import Modal from '../../../components/modal/Modal';
import DatePicker from '../../../components/date-picker/DatePicker';
import {horizontalScale} from '../../../utils/StyleHelpers';

const EmployeeForm = (props: ScreenProps) => {
  const mounted = useRef(false);
  const edit = props?.route?.params?.edit;
  const [projects, setProyects] = useState();
  const [visibleModal, setVisibleModal] = useState(false);
  const containerRef = useRef<ContainerRef>(null);
  const [provincia, setProvincia] = useState();
  const [state, setState] = useState<EmployeeFormState>({
    firstName: undefined,
    lastName: undefined,
    docType: '1',
    docNumber: undefined,
    laborID: edit?.labor.type,
    masterList: edit?.maestroId,
    contractDate: undefined,
    isContractor: '1',
    proyectosIds: undefined,
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
  } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => postForm(values, actions),
    // validationSchema: schemaValidation,
  });
  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      getProyects();
      getProyectById();
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
  const getProyectById = async () => {
    try {
      const res = await BaseApi.post('./project/getById', {
        id: props.user.data.proyectoID,
      });
      setProvincia(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postForm = (values: EmployeeFormState, actions: any) => {
    const {photo} = props;
    if (!photo?.path) {
      //@ts-ignore
      // eslint-disable-next-line no-alert
      alert('Debe adjuntar una foto de perfil');
      return;
    }
    ImageResizer.createResizedImage(
      photo.path,
      200,
      200,
      'PNG',
      50,
      0,
      undefined,
      false,
    )
      .then(res => {
        const request = {
          apiRequest: {
            name: `${values.firstName} ${values.lastName}`.toUpperCase(),
            laborID: values.labor,
            proyectosIds: [props.user.data.proyectoID],
            provinciaId: provincia?.provinciaId,
            maestroId: values.masterList?.Id,
            isContractor: values.isContractor === '1' ? false : true,
            docNumber: values.docNumber,
            contractDate: values?.contractDate?.toLocaleDateString('es-MX'),
          },
          photo: res,
        };
        props.postEmployeeForm(request);
        console.log(request);
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
  };

  const onSuccessEnd = () => {
    resetForm();
    props.setPhoto(undefined);
  };

  const EditEmplyee = async () => {
    try {
      const apiRes = await BaseApi.post('/employees/editemployee', {
        id: edit?.id,
        name: edit?.name.toUpperCase(),
        laborID: values.labor === undefined ? edit?.laborID : values.labor,
        proyectosIds:
          values.proyectosIds === undefined
            ? [edit.proyectosIds]
            : [
                projects.find(
                  (res: {name: string | undefined}) =>
                    res.name === values.proyectosIds,
                ).id,
              ],

        docNumber: edit?.docNumber,
        provinciaId: edit.provinciaId, //aqui hay que cambiar
        maestroId:
          values.masterList?.Id === undefined
            ? values.masterList
            : values.masterList?.Id,
        isContractor: values.isContractor === '1' ? false : true,
        contractDate:
          values.contractDate === undefined
            ? edit.contractDate
            : values.contractDate.toLocaleDateString('es-MX'),
      });
      console.log(apiRes);
      setState({});
      Alert.alert('Empleado Actualizado');
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const labores = props.getData.laborList;
  var laborescopy = [...labores];
  laborescopy.sort(function (a, b) {
    const ANAME = a.label.toLowerCase();
    const BNAME = b.label.toLowerCase();
    if (ANAME > BNAME) {
      return 1;
    }
    if (ANAME < BNAME) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
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
  // const goToSecurity = (type?: 'entry' | 'exit') => async () => {
  //   const permission = await PermissionUtil.requestAndroidPermission(
  //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //     '',
  //     '',
  //     '',
  //   );
  //   if (!permission) {
  //     return;
  //   }

  //   props.navigation.navigate('Security', {type});
  // };

  const getProyects = async () => {
    try {
      const res = await BaseApi.get('project/get');
      setProyects(res.data);
    } catch (error) {
      console.log(error);
    }
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
      <Header title={edit ? 'Editar Empleado' : 'Crear empleado'} leftIcon />
      <Content>
        <Separator />
        <CheckRender allowed={!edit}>
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
        </CheckRender>
        <Separator />
        <Separator />
        <CheckRender allowed={!edit}>
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
          <CheckRender allowed={values.docType !== '2'}>
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
          <CheckRender allowed={values.docType === '2'}>
            <Input
              title="Documento"
              iconName="person"
              placeholder="Número de documento"
              value={values.docNumber}
              onValueChange={handleChange('docNumber')}
              onInputBlur={handleBlur('docNumber')}
              showError={touched.docNumber && errors.docNumber}
              editable={!!values.docType}
              maxLength={20}
            />
          </CheckRender>
        </CheckRender>

        <CheckRender allowed={!edit}>
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
            title="Tipo de Empleado"
            placeholder="Seleccione tipo de Empleado"
            data={EmployeeTypeSelect}
            iconName="document-text"
            value={values.isContractor}
            onValueChange={onStateChange('isContractor')}
            onPickerBlur={onBlur('isContractor')}
            showError={touched.isContractor && errors.isContractor}
          />
        </CheckRender>
        <PickerSelect
          title="Labor"
          data={laborescopy}
          value={values.labor}
          onValueChange={onStateChange('labor')}
          placeholder={!edit ? 'Elegir Labor' : edit.labor.type}
          showError={touched.labor && errors.labor}
        />

        {/* <TouchableOpacity
          onPress={() => setLaborModal(true)}
          style={ApplicationStyles.hPLarge}>
          <View
            style={{
              padding: 10,
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: '#BABABA',
            }}>
            <Text>Labor</Text>
            <Text style={{color: '#ADADAD'}}>{values.labor}</Text>
          </View>
        </TouchableOpacity>

        <Modal
          isVisible={laborModal}
          onVisibleChange={() => setLaborModal(false)}>
          <FlatList
            data={props.getData.laborList}
            numColumns={1}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => {
                  setFieldValue('labor', item.item.label).then(() =>
                    setLaborModal(false),
                  );
                }}>
                <Text
                  style={{
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderColor: 'grey',
                  }}>
                  {item.item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </Modal> */}
        <CheckRender allowed={values.isContractor === '1'}>
          <ModalPicker
            title="Contratista"
            data={props.getData.masterList}
            value={values.masterList}
            onValueChange={onStateChange('masterList')}
            placeholder={!edit ? 'Seleccionar Contratista' : edit.maestro.name}
            showError={touched.masterList && errors.masterList}
          />
        </CheckRender>
        <CheckRender allowed={edit}>
          <TouchableOpacity onPress={() => setVisibleModal(true)}>
            {/* <Input
              title="Proyectos"
              placeholder={'Seleccione un Proyecto'}
              value={values.proyectosIds}
            /> */}
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                marginLeft: METRICS.xLarge20,
                paddingVertical: METRICS.medium10,
                borderBottomColor: COLORS.lightGray,
                borderBottomWidth: 1,
              }}>
              <Text>Projectos</Text>
              <Text
                style={{
                  color: COLORS.lightGray,
                  marginVertical: METRICS.small5,
                }}>
                {values.proyectosIds === undefined
                  ? edit?.proyectos.map((res: {name: any}) => res.name)
                  : values.proyectosIds}
              </Text>
            </View>
          </TouchableOpacity>
        </CheckRender>
        <Modal
          isVisible={visibleModal}
          onVisibleChange={() => setVisibleModal(false)}>
          <FlatList
            data={projects}
            numColumns={1}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => {
                  setFieldValue('proyectosIds', item.item.name).then(() =>
                    setVisibleModal(false),
                  );
                }}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderColor: 'grey',
                  }}>
                  {item.item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </Modal>
        <Separator />
        <View>
          <Text style={{paddingHorizontal: horizontalScale(METRICS.large15)}}>
            Fecha de Contrato
          </Text>
          <DatePicker
            placeholder={
              !edit ? 'Seleccion Fecha de Contrato' : edit?.contractDate
            }
            onValueChange={onStateChange('contractDate')}
            value={values.contractDate}
          />
        </View>
      </Content>
      <CheckRender allowed={edit}>
        <Button
          title="Actualizar Empleado"
          onPress={EditEmplyee}
          bottomSeparate={false}
          isLoading={props.postLoading}
          fontSize={FONTS.medium}
        />
      </CheckRender>
      <CheckRender allowed={!edit}>
        <Button
          title="Registrar empleado"
          onPress={handleSubmit}
          bottomSeparate={false}
          isLoading={props.postLoading}
          fontSize={FONTS.medium}
        />
      </CheckRender>
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
