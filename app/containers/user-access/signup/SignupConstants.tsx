import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';
import * as yup from 'yup';
import { defaultString } from '../../../utils/StringUtil';
import { PhotoFile } from 'react-native-vision-camera';

export interface SignupState {
  name?: string;
  docType?: string;
  docNumber?: string;
  hidePassword: boolean;
  password?: string;
  hidePasswordRetry: boolean;
  passwordRetry?: string;
  email?: string;
  imagePicker?: PhotoFile;
}

export const schemaValidation = yup.object().shape({
  name: yup.string().required(defaultString.requiredText),
  // docType: yup.string().required(defaultString.requiredText),
  // docNumber: yup.string().required(defaultString.requiredText)
  //   //document
  //   .when('docType', {
  //     is: (docType: IModalListInDto) => docType?.Value == '1',
  //     then: yup.string().min(13, "La cédula debe tener 11 caracteres").required(defaultString.requiredText)
  //   })
  //   //Passport
  //   .when('docType', {
  //     is: (docType: IModalListInDto) => docType?.Value == '2',
  //     then: yup.string().min(5, "El pasaporte debe tener al menos 5 caracteres").required(defaultString.requiredText)
  //   })
  //   //default
  //   .when('docType', {
  //     is: (docType: IModalListInDto) => !docType?.Value,
  //     then: yup.string().required(defaultString.requiredText)
  //   }),
  email: yup.string().email(defaultString.validEmail).required(defaultString.requiredText),
  password: yup.string()
    .min(4, defaultString.requiredText)
    .required(defaultString.requiredText),
  passwordRetry: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required(defaultString.requiredText),
})