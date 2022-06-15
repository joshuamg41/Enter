import * as yup from 'yup';
import { defaultString } from "../../../utils/StringUtil";
import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";
import { EmployeeResponseItem } from '../../../services/employee/EmployeeServiceConstants';

export interface AccidentFormState {
  employee?: IModalListInDto<EmployeeResponseItem>;
  accidentType?: string;
  accidentDescription?: string;
  administrationChecked: boolean;
  docList: any[];
}

export const schemaValidation = yup.object().shape({
  employee: yup.object().shape({
    Value: yup.mixed().required(defaultString.requiredText),
  }),
  accidentType: yup.string().required(defaultString.requiredText),
  accidentDescription: yup.string().required(defaultString.requiredText),
})