export interface SigninRequest {
  citizen_id?: string;
  password?: string;
}

export interface SigninResponse {
  success?: boolean;
  msg?: string;
  payload?: {
    token?: string;
    expiration_time?: number;
    profile_img?: string;
  }
}