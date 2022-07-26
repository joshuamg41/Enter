import {useFocusEffect} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';
import update from 'immutability-helper';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Attach from '../../../components/attach/Attach';
import Button from '../../../components/button/Button';
import Container, {ContainerRef} from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import InputArea from '../../../components/Input-area/InputArea';
import ModalPicker from '../../../components/modal-picker/ModalPicker';
import PickerSelect from '../../../components/picker-select/PickerSelect';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import TextCheck from '../../../components/text/TextCheck';
import UserPhoto from '../../../components/user-photo/UserPhoto';
import {accidentTypeSelect} from '../../../services/LocalService';
import AccidentFormActions from '../../../stores/accident/form/Actions';
import {RootState} from '../../../stores/AppReducers';
import {METRICS} from '../../../themes';
import {safeValExtraction} from '../../../utils/ObjectUtil';
import {localToString} from '../../../utils/StringUtil';
import {isEmpty} from '../../../utils/ValidationUtil';
import {DrawerNavigatorParamList} from '../../root/navigators/DrawerNavigator';
import {AccidentFormState, schemaValidation} from './AccidentFormConstants';
import Styles from './AccidentFormStyles';
import PhotoActions from '../../../stores/photo/Actions';

const AccidentForm = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [projectId, setProjectId] = useState(
    props.user.data.proyectoID || null,
  );
  const [provincia, setProvincia] = useState();
  const [state, setState] = useState<AccidentFormState>({
    employee: undefined,
    accidentType: undefined,
    accidentDescription: undefined,
    administrationChecked: false,
    docList: [],
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
    validationSchema: schemaValidation,
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      getProyectById();
      getScreen();
      return () => {};
    }, [props.navigation]),
  );
  console.log(values);
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
    props.getAccidentForm(request);
  };
  const getProyectById = async () => {
    const res = await BaseApi.post('./project/getById', {
      id: props.user.data.proyectoID,
    });
    setProvincia(res.data);
  };

  const postForm = (values: AccidentFormState, actions: any) => {
    const request = {
      employeeID: values.employee?.Id,
      description: localToString(values.accidentDescription).trim(),
      projectID: projectId,
      provinceID: provincia.provinciaId,
      adminReviewed: false,
    };
    props.postAccidentForm(request);
  };

  const onSuccessEnd = () => {
    resetForm();
  };

  //Value change handlers
  const onValueChange = (key: string) => (value: any) => {
    return setFieldValue(key, value);
  };

  const onCheckChange = (key: string) => () => {
    //@ts-ignore
    return setFieldValue(key, !values[key]);
  };

  //rendering
  return (
    <Container
      ref={containerRef}
      style={Styles.container}
      successFunction={onSuccessEnd}
      successMessage={
        props.postError?.message || 'Accidente registrado satisfactoriamente'
      }
      failure={!!props.postError}>
      <Header title="Reporte Accidentes" leftIcon />
      <Content>
        <View style={Styles.profileSection}>
          <UserPhoto />
          <CheckRender allowed={!isEmpty(values.employee)}>
            <Separator height={METRICS.medium10} />
            <Text style={Styles.nameText}>
              {safeValExtraction(values.employee?.Value, 'name')}
            </Text>
            <Text style={Styles.idText}>
              {safeValExtraction(values.employee?.Value, 'role')}
            </Text>
          </CheckRender>
        </View>
        <Separator />
        <Attach
          value={values.docList}
          onValueChange={onValueChange('docList')}
          buttonTitle="Adjuntar imágenes"
        />
        <CheckRender allowed={props.user.data.role?.name == 'Admin'}>
          <ModalPicker
            title="Provincia"
            placeholder="Seleccionar Provincia"
            data={props.getData.employeeList}
            value={values.employee}
            onValueChange={onValueChange('employee')}
            showError={touched.employee && errors.employee}
          />
        </CheckRender>
        <CheckRender allowed={props.user.data.role?.name == 'Admin'}>
          <ModalPicker
            title="Proyecto"
            placeholder="Seleccionar Proyecto"
            data={props.getData.employeeList}
            value={values.employee}
            onValueChange={onValueChange('employee')}
            showError={touched.employee && errors.employee}
          />
        </CheckRender>
        <ModalPicker
          title="Empleado"
          placeholder="Seleccionar empleado"
          data={props.getData.employeeList}
          value={values.employee}
          onValueChange={onValueChange('employee')}
          showError={touched.employee && errors.employee}
        />
        <PickerSelect
          title="Tipo de accidente"
          placeholder="Seleccionar tipo de accidente"
          data={accidentTypeSelect}
          iconName="document-text"
          value={values.accidentType}
          onValueChange={onValueChange('accidentType')}
          showError={touched.accidentType && errors.accidentType}
        />
        <InputArea
          title="Descripción"
          placeholder="Escribe una Descripción"
          value={values.accidentDescription}
          onValueChange={onValueChange('accidentDescription')}
          showError={touched.accidentDescription && errors.accidentDescription}
        />
        <Separator />
        <TextCheck
          onValueChange={onValueChange('administrationChecked')}
          value={values.administrationChecked}
          disabled={false}>
          Revisada por Administracion
        </TextCheck>
        <Separator />
      </Content>
      <Button
        title="Registrar Accidente"
        onPress={handleSubmit}
        bottomSeparate={false}
        isLoading={props.postLoading}
      />
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    StackScreenProps<DrawerNavigatorParamList, 'AccidentForm'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.accidentForm.getData,
  getLoading: state.accidentForm.getLoading,
  getError: state.accidentForm.getError,

  postData: state.accidentForm.postData,
  postLoading: state.accidentForm.postLoading,
  postError: state.accidentForm.postError,
});

const mapDispatchToProps = {
  getAccidentForm: AccidentFormActions.getAccidentForm,
  postAccidentForm: AccidentFormActions.postAccidentForm,
  setPhoto: PhotoActions.setPhoto,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AccidentForm);
