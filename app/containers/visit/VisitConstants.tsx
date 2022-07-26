import moment from 'moment';
import {
  DataOptionItem,
  OrderByProps,
} from '../../components/modalize/ModalizeOrderBy';
import {removeWhiteSpace} from '../../utils/StringUtil';
import {VisitResponseItem} from '../../services/visit/VisitServiceConstants';
export interface VisitState {
  [key: string]: string;
}

export const sortGetData =
  (orderBy: OrderByProps) => (a: VisitResponseItem, b: VisitResponseItem) => {
    let result = 1;
    switch (orderBy.orderName) {
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
      case 'date':
        const aDate = moment(a.createdAt, 'YYYY-MM-DD[T]HH:mm:ss');
        const bDate = moment(b.createdAt, 'YYYY-MM-DD[T]HH:mm:ss');

        if (aDate === bDate) {
          result = 0;
        } else if (aDate.isAfter(bDate)) {
          result = 1;
        } else {
          result = -1;
        }
        break;
      case 'project':
        const aProvince = removeWhiteSpace(a.proyecto.name).toLowerCase();
        const bProvince = removeWhiteSpace(b.proyecto.name).toLowerCase();
        if (aProvince === bProvince) {
          result = 0;
        } else if (aProvince > bProvince) {
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
    title: 'Proyecto',
    key: 'project',
  },
  {
    title: 'Fecha',
    key: 'date',
  },
];
