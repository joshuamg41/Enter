import { all, fork } from 'redux-saga/effects';
import AbsenceSaga from './absence/AbsenceSaga';
import AccidentFormSaga from './accident/AccidentFormSaga';
import AccidentListSaga from './accident/AccidentListSaga';
import EmployeeFormSaga from './employee/EmployeeFormSaga';
import EmployeeListSaga from './employee/EmployeeListSaga';
import EntrySaga from './entry/EntrySaga';
import ExitSaga from './exit/ExitSaga';
import HomeSaga from './home/HomeSaga';
import SecuritySaga from './SecuritySaga';
import SigninSaga from './SigninSaga';
import SignupSaga from './SignupSaga';
import startup from './StartupSaga';

export default function* root() {
  yield fork(startup)
  yield all([
    //Access
    ...SigninSaga,
    ...SignupSaga,
    ...SecuritySaga,

    //employee
    ...EmployeeListSaga,
    ...EmployeeFormSaga,

    //Home
    ...HomeSaga,

    //Accident
    ...AccidentFormSaga,
    ...AccidentListSaga,

    //Absence
    ...AbsenceSaga,

    //Exit
    ...ExitSaga,

    //Entry
    ...EntrySaga,
  ]);
}
