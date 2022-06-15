import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';
import * as yup from 'yup';
import { defaultString } from '../../../utils/StringUtil';

export interface EmployeeFormState {
  firstName?: string;
  lastName?: string;
  docType?: string;
  docNumber?: string;
  labor?: string;
  masterList?: IModalListInDto;
}

export const schemaValidation = yup.object().shape({
  firstName: yup.string().required(defaultString.requiredText),
  lastName: yup.string().required(defaultString.requiredText),
  docType: yup.string().required(defaultString.requiredText),
  docNumber: yup.string().required(defaultString.requiredText)
    //document
    .when('docType', {
      is: (docType: IModalListInDto) => docType?.Value == '1',
      then: yup.string().min(13, "La cédula debe tener 11 caracteres").required(defaultString.requiredText)
    })
    //Passport
    .when('docType', {
      is: (docType: IModalListInDto) => docType?.Value == '2',
      then: yup.string().min(5, "El pasaporte debe tener al menos 5 caracteres").required(defaultString.requiredText)
    })
    //default
    .when('docType', {
      is: (docType: IModalListInDto) => !docType?.Value,
      then: yup.string().required(defaultString.requiredText)
    }),
  labor: yup.string().required(defaultString.requiredText),
  masterList: yup.object().shape({
    Value: yup.mixed().required(defaultString.requiredText),
  }),
})