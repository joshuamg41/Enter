import {
  DataOptionItem,
  OrderByProps,
} from '../../../components/modalize/ModalizeOrderBy';
import {EmployeeResponseItem} from '../../../services/employee/EmployeeServiceConstants';
import {removeWhiteSpace} from '../../../utils/StringUtil';

export interface EmployeeListState {
  dateRange: {
    min: Date;
    max: Date;
  };
}

export const sortGetData =
  (orderBy: OrderByProps) =>
  (a: EmployeeResponseItem, b: EmployeeResponseItem) => {
    let result = 1;
    switch (orderBy.orderName) {
      case 'master':
        if (a.maestro.name === b.maestro.name) {
          result = 0;
        } else if (a.maestro.name > b.maestro.name) {
          result = 1;
        } else {
          result = -1;
        }
        break;
      case 'role':
        if (a.role === b.role) {
          result = 0;
        } else if (a.role > b.role) {
          result = 1;
        } else {
          result = -1;
        }
        break;
      case 'name':
        const aName = removeWhiteSpace(a.name).toLowerCase();
        const bName = removeWhiteSpace(b.name).toLowerCase();

        if (aName === bName) {
          result = 0;
        } else if (aName > bName) {
          result = 1;
        } else {
          result = -1;
        }
        break;
      case 'province':
        if (a.provincia.name === b.provincia.name) {
          result = 0;
        } else if (a.provincia.name > b.provincia.name) {
          result = 1;
        } else {
          result = -1;
        }
        break;
      default:
        return 0;
    }

    if (result == 1) {
      return orderBy.orderBy == 'asc' ? result : -1;
    } else if (result == -1) {
      return orderBy.orderBy == 'asc' ? result : 1;
    } else {
      return result;
    }
  };

export const dataOption: DataOptionItem[] = [
  {
    title: 'Nombre',
    key: 'name',
  },
  {
    title: 'Province',
    key: 'province',
  },
  {
    title: 'Labor',
    key: 'role',
  },
  {
    title: 'Contratista',
    key: 'master',
  },
];
