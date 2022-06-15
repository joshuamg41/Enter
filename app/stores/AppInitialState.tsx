import EmployeeListInitialState from './employee/list/InitialState';
import ExampleInitialState from './example/InitialState';
import PhotoInitialState from './photo/InitialState';
import SecurityInitialState from './security/InitialState';
import SigninInitialState from './signin/InitialState';
import SignupInitialState from './signup/InitialState';
import HomeInitialState from './home/InitialState';
import AccidentFormInitialState from './accident/form/InitialState';
import AccidentListInitialState from './accident/list/InitialState';
import AbsenceInitialState from './absence/InitialState';
import EntryInitialState from './entry/InitialState';
import ExitInitialState from './exit/InitialState';

const AppInitialState = {
  example: ExampleInitialState,
  signin: SigninInitialState,
  signup: SignupInitialState,
  security: SecurityInitialState,
  photo: PhotoInitialState,
  employeeList: EmployeeListInitialState,
  home: HomeInitialState,
  accidentForm: AccidentFormInitialState,
  accidentList: AccidentListInitialState,
  absence: AbsenceInitialState,
  entry: EntryInitialState,
  exit: ExitInitialState,
}

export default AppInitialState