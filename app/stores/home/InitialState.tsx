import { EntryLaborResponse, EntryMasterResponse, EntryProjectResponse, EntryProvinceResponse, LaborResponse, MasterResponse, ProvinceResponse } from "../../services/home/HomeServiceConstants";
import { ErrorObject } from "../StoreConstants";

export interface HomeInitialState {
  getData: {
    provinceData: ProvinceResponse;
    entryData: {
      date: string;
      day: string;
      value: number;
    }[];
    exitData: {
      date: string;
      day: string;
      value: number;
    }[];
  };
  getLoading: boolean;
  getError: ErrorObject;
  
  getLaborList: LaborResponse;
  getMasterList: MasterResponse;
  getProjectEntry: EntryProjectResponse;
  getProvinceEntry: EntryProvinceResponse;
  getMasterEntry: EntryMasterResponse;
  getLaborEntry: EntryLaborResponse;
  getEntryLoading: boolean;
  getEntryError: ErrorObject;
}

export default {
  getData: {
    provinceData: [],
    entryData: [],
    exitData: [],
  },
  getLoading: false,
  getError: null,
  
  getLaborList: [],
  getMasterList: [],
  getProjectEntry: [],
  getProvinceEntry: [],
  getMasterEntry: [],
  getLaborEntry: [],
  getEntryLoading: false,
  getEntryError: null,
} as HomeInitialState;
