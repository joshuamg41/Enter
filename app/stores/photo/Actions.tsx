import { createAction } from '@reduxjs/toolkit';

const Types = {
  SET_PHOTO: 'SET_PHOTO',
}

const Creators = {
  setPhoto: createAction<any>(Types.SET_PHOTO),
}

export { Types };
export default Creators;