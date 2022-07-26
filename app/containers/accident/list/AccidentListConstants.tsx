import { DataOptionItem, OrderByProps } from "../../../components/modalize/ModalizeOrderBy";
import { GetAccidentResponseItem } from "../../../services/accident/AccidentServiceConstants";
import { removeWhiteSpace } from "../../../utils/StringUtil";

export interface AccidentListState {
  dateRange: {
    min: Date;
    max: Date;
  }
}

export const sortGetData = (orderBy: OrderByProps) => (a: GetAccidentResponseItem, b: GetAccidentResponseItem) => {
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
      if (a.province.name === b.province.name) {
        result = 0
      } else if (a.province.name > b.province.name) {
        result = 1
      } else {
        result = -1
      }
      break;
    case 'project':
      if (a.project.name === b.project.name) {
        result = 0
      } else if (a.project.name > b.project.name) {
        result = 1
      } else {
        result = -1
      }
      break;
    case 'adminReviewed':
      if (a.adminReviewed === b.adminReviewed) {
        result = 0
      } else if (a.adminReviewed > b.adminReviewed) {
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
    title: 'Proyecto',
    key: 'project',
  },
  {
    title: 'Revisado Admin',
    key: 'adminReviewed',
  }
]