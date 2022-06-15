import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as yup from 'yup';
import Button from '../../../components/button/Button';
import InputArea from '../../../components/Input-area/InputArea';
import Modal from '../../../components/modal/Modal';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { defaultString } from '../../../utils/StringUtil';
import AccidentListActions from '../../../stores/accident/list/Actions';
import { RootState } from '../../../stores/AppReducers';
import { GetAccidentResponseItem } from '../../../services/accident/AccidentServiceConstants';
import { GetAbsenceResponseItem } from '../../../services/absence/AbsenceServiceConstants';

const ModalAbsence = (props: ScreenProps) => {
  const mounted = useRef(false);
  const { errors, setFieldTouched, handleBlur, setFieldValue, values, touched, handleSubmit, resetForm } = useFormik({
    initialValues: {
      comment: undefined,
    },
    onSubmit: (values, actions) => postAnswer({ values, actions }),
    validationSchema: schemaValidation,
  })

  //componentDidMount
  useEffect(() => {
    resetForm()
    return () => { }
  }, [props.isVisible])

  const postAnswer = ({ values, actions }: { values: any, actions: any }) => {
    const request = {

    }
    props.postAccidentList(request)
  }

  //value change handlers
  const _handleChange = (key: string) => (value: any) => {
    return setFieldValue(key, value)
  }

  const _setTouched = (key: string) => () => {
    return setFieldTouched(key, true)
  }

  //rendering
  return (
    <Modal
      isVisible={props.isVisible}
      onVisibleChange={props.onVisibleChange}
    >
      <Text>Desea remover la ausencia</Text>
      <Separator />
      <InputArea
        title='Descripción'
        value={values.comment}
        onValueChange={_handleChange('comment')}
        showError={touched.comment && errors.comment}
      />
      <Button
        title='Enviar'
        onPress={handleSubmit}
        bottomSeparate={false}
        isLoading={props.postLoading}
      />
    </Modal>
  )
};

interface ScreenProps extends ReduxProps {
  onVisibleChange: (absence?: GetAbsenceResponseItem) => void;
  isVisible?: GetAbsenceResponseItem;
}

const schemaValidation = yup.object().shape({

})

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  postData: state.accidentList.postData,
  postLoading: state.accidentList.postLoading,
  postError: state.accidentList.postError,
});

const mapDispatchToProps = {
  postAccidentList: AccidentListActions.postAccidentList,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ModalAbsence)