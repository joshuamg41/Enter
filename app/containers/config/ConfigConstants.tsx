import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";

export interface ConfigState {
  project?: IModalListInDto;
  forAccident: boolean;
  forDelay: boolean;
  forEntry: boolean;
  forExit: boolean;
}