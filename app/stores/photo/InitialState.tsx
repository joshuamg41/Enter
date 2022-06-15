import { PhotoFile } from "react-native-vision-camera";

export interface PhotoInitialState {
  photoData?: PhotoFile;
}

export default {
  photoData: undefined,
} as PhotoInitialState;