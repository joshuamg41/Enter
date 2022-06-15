import { combineReducers } from '@reduxjs/toolkit';
import AppInitialState from './AppInitialState';
import { ExampleReducer } from './example/Reducers';
import { PhotoReducer } from './photo/Reducers';
import { Types as SigninTypes } from './signin/Actions';
import { SigninReducer } from './signin/Reducers';
import { SignupReducer } from './signup/Reducers';
import { SecurityReducer } from './security/Reducers';
import { EmployeeListReducer } from './employee/list/Reducers';
import { HomeReducer } from './home/Reducers';
import { AccidentFormReducer } from './accident/form/Reducers';
import { EmployeeFormReducer } from './employee/form/Reducers';
import { AccidentListReducer } from './accident/list/Reducers';
import { AbsenceReducer } from './absence/Reducers';
import { ExitReducer } from './exit/Reducers';
import { EntryReducer } from './entry/Reducers';

const appReducer = combineReducers({
  //auth && miscellaneous
  example: ExampleReducer,
  signin: SigninReducer,
  signup: SignupReducer,
  photo: PhotoReducer,
  security: SecurityReducer,

  //employee
  employeeList: EmployeeListReducer,
  employeeForm: EmployeeFormReducer,

  //Home
  home: HomeReducer,

  //Accident
  accidentForm: AccidentFormReducer,
  accidentList: AccidentListReducer,

  //Absence
  absence: AbsenceReducer,

  //exit
  exit: ExitReducer,

  //entry
  entry: EntryReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === SigninTypes.LOGOUT_DESTROY_DATA) {
    state = AppInitialState
  }
  return (appReducer(state, action))
}

export type RootState = ReturnType<typeof appReducer>
export default rootReducer;