import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { PhotoInitialState } from './InitialState';

const setPhoto = (state: PhotoInitialState, action: ActionObject) => ({
  ...state,
  photoData: action?.payload,
});


export const PhotoReducer = createReducer(INITIAL_STATE, {
  [Types.SET_PHOTO]: setPhoto,
});
