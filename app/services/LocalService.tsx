import {IModalListInDto} from 'react-native-picker-modal-view/dist/Interfaces';
import {Item} from 'react-native-picker-select';

export const documentTypeData: IModalListInDto[] = [
  {
    Id: '1',
    Name: 'Cédula',
    Value: '1',
  },
  {
    Id: '2',
    Name: 'Pasaporte',
    Value: '2',
  },
];
export const EmployeeTypeSelect: Item[] = [
  {
    value: '1',
    label: 'Empleado',
  },
  {
    value: '2',
    label: 'Contratista',
  },
];
export const reasonClaimTypeData: IModalListInDto[] = [
  {
    Id: '1',
    Name: 'test',
    Value: '1',
  },
  {
    Id: '2',
    Name: 'test 2',
    Value: '2',
  },
];

export const documentTypeSelect: Item[] = [
  {
    value: '1',
    label: 'Cédula',
  },
  {
    value: '2',
    label: 'Pasaporte',
  },
];

export const accidentTypeSelect: Item[] = [
  {
    value: '1',
    label: 'Leve',
  },
  {
    value: '2',
    label: 'Grave',
  },
];

export const sexToWord: {[key: string]: string} = {
  M: 'Masculino',
  F: 'Femenino',
};
