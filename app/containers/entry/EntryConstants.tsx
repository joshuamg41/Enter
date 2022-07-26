import moment from "moment";
import { DataOptionItem, OrderByProps } from "../../components/modalize/ModalizeOrderBy";
import { EntryListResponseItem } from "../../services/entry/EntryServiceConstants";
import { removeWhiteSpace } from "../../utils/StringUtil";

export interface EntryState {
  dateRange: {
    min: Date;
    max: Date;
  }
}

export const sortGetData = (orderBy: OrderByProps) => (a: EntryListResponseItem, b: EntryListResponseItem) => {
  let result = 1
  switch (orderBy.orderName) {
    case 'name':
      const aName = removeWhiteSpace(a.employee.name).toLowerCase()
      const bName = removeWhiteSpace(b.employee.name).toLowerCase()

      if (aName === bName) {
        result = 0
      } else if (aName > bName) {
        result = 1
      } else {
        result = -1
      }
      break;
    case 'province':
      const aProvince = removeWhiteSpace(a.employee.provincia.name).toLowerCase()
      const bProvince = removeWhiteSpace(b.employee.provincia.name).toLowerCase()
      if (aProvince === bProvince) {
        result = 0
      } else if (aProvince > bProvince) {
        result = 1
      } else {
        result = -1
      }
      break;
    case 'role':
      const aRole = removeWhiteSpace(a.employee.role).toLowerCase()
      const bRole = removeWhiteSpace(b.employee.role).toLowerCase()

      if (aRole === bRole) {
        result = 0
      } else if (aRole > bRole) {
        result = 1
      } else {
        result = -1
      }
      break;
    case 'date':
      const aDate = moment(a.createdAt, 'YYYY-MM-DD[T]HH:mm:ss')
      const bDate = moment(b.createdAt, 'YYYY-MM-DD[T]HH:mm:ss')

      if (aDate === bDate) {
        result = 0
      } else if (aDate.isAfter(bDate)) {
        result = 1
      } else {
        result = -1
      }
      break;
    default:
      return 0
  }

  if (result == 1) {
    return orderBy.orderBy == 'asc' ? result : -1
  } else if (result == -1) {
    return orderBy.orderBy == 'asc' ? result : 1
  } else {
    return result
  }
}

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
    title: 'Fecha',
    key: 'date',
  }
]