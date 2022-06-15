import { PhotoFile } from "react-native-vision-camera";

export interface SignupRequest {
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  token: string;
  user: any;
  message: 'Signed Up Successfully';
}

export interface ValidateDocumentRequest {
  citizen_id?: string;
}

export interface ValidateDocumentResponse {
  success: boolean | null;
  exist: boolean | null;
}

export interface SignupSecurityQuestionRequest { }

export interface SignupSecurityQuestionResponse {
  id?: number;
  question?: string;
}[]