import RNBlobUtil from 'react-native-blob-util';
import Config from 'react-native-config';
import { localToString } from '../../utils/StringUtil';
import { BaseApi } from '../BaseApi';

const recognitionFaceUrl = '/photo/search';
const employeeEntryUrl = '/employees/employeeEntry';
const employeeExitUrl = '/employees/employeeExit';

const uploadPhoto = async (request) => {
  return RNBlobUtil.fetch('POST', Config.LUXAND_URL + recognitionFaceUrl, {
    token: localToString(Config.LUXAND_TOKEN),
    'Content-Type': 'multipart/form-data'
  }, [{
    name: 'photo',
    filename: 'test.png',
    type: 'image/png',
    data: RNBlobUtil.wrap(localToString(request.photo).replace('file://', '')),
  }])
    .then(resp => {
      const data = JSON.parse(resp.data)
      const result = {
        code: 200,
        success: true,
        fail: false,
        data: data,
        error: null,
      }
      console.log(result)
      return result
    })
    .catch(error => {
      const result = {
        code: 500,
        success: false,
        fail: true,
        data: [],
        error: error,
      }
      console.log(result)
      return result
    });
}

const postEmployeeSecurity = request => {
  if(request.type == 'entry') {
    return BaseApi.post(employeeEntryUrl, request); 
  } else {
    return BaseApi.post(employeeExitUrl, request); 
  }
}
  

export default {
  uploadPhoto,
  postEmployeeSecurity,
};
