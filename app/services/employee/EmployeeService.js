import RNBlobUtil from 'react-native-blob-util';
import Config from 'react-native-config';
import { localToString } from '../../utils/StringUtil';
import { BaseApi } from '../BaseApi';

const createPersonUrl = '/subject/v2'
const listEmployeeUrl = '/employees/filterEmployees';
const listRoleUrl = '/roles/getRoles';
const listMasterUrl = '/maestros/getmaestros';
const listLaborUrl = '/labor/getlabores';
const formUrl = '/employees/add';

const getEmployeeList = request =>
  BaseApi.post(listEmployeeUrl, request);

const getRoleList = request =>
  BaseApi.get(listRoleUrl, request);

const getLaborList = request =>
  BaseApi.get(listLaborUrl, request);

const getMasterList = request =>
  BaseApi.get(listMasterUrl, request);

const postForm = request =>
  BaseApi.post(formUrl, request);

const uploadPhoto = async (request) => {
  return RNBlobUtil.fetch('POST', Config.LUXAND_URL + createPersonUrl, {
    token: localToString(Config.LUXAND_TOKEN),
    'Content-Type': 'multipart/form-data',
  }, [{
    name: 'photo',
    filename: 'test.png',
    type: 'image/png',
    data: RNBlobUtil.wrap(localToString(request.photo).replace('file://', '')),
  },
  {
    name: 'name',
    data: request.name,
  },
  {
    name: 'store',
    data: '1',
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
        code: 200,
        success: true,
        fail: false,
        data: error,
        error: null,
      }
      console.log(result)
      return result
    });
}

export default {
  getEmployeeList,
  getRoleList,
  getLaborList,
  getMasterList,
  postForm,
  uploadPhoto,
};