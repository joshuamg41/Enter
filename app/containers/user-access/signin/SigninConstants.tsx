import * as yup from 'yup';
import { defaultString } from "../../../utils/StringUtil";

export interface SigninState {
  email?: string;
  hidePassword: boolean;
  password?: string;
}

export const schemaValidation = yup.object().shape({
  email: yup.string().email().required(defaultString.requiredText),
  password: yup.string()
    .min(4, defaultString.requiredText)
    .required(defaultString.requiredText),
})