import { EntryLaborResponse, EntryMasterResponse, EntryProjectResponse, EntryProvinceResponse, LaborResponse, MasterResponse } from "../../../services/home/HomeServiceConstants";
import { COLORS } from "../../../themes";

export const transformForProvince = (onNextStep: (v: any) => void, getProvinceEntry?: EntryProvinceResponse, projectList?: {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  empleadosIds: string;
  provinciaId: string;
}[]) => {
  if (!Array.isArray(getProvinceEntry) || !Array.isArray(projectList)) {
    return []
  }

  return projectList.map(item => {
    return {
      value: getProvinceEntry.filter(project => project.proyectoID == item.id).length,
      name: item.name,
      svg: {
        fill: COLORS.secondary,
        onPress: onNextStep(item),
      }
    }
  })
}

export const transformForProject = (onNextStep: (v: any) => void, array?: EntryProjectResponse, labor?: LaborResponse) => {
  if (!Array.isArray(array) || !Array.isArray(labor)) {
    return []
  }

  //grouping by labor
  const groupedEntry = array.reduce((groups: any, entry) => {
    if (!groups[entry.laborID]) {
      groups[entry.laborID] = {
        value: 0,
        name: labor.find(labor => labor.id == entry.laborID)?.description,
        svg: {
          fill: COLORS.secondary,
          onPress: onNextStep(entry),
        }
      }
    }
    groups[entry.laborID].value += 1
    return groups;
  }, {});

  //transformed
  const barChartData = []
  for (const key in groupedEntry) {
    barChartData.push(groupedEntry[key])
  }

  //return
  return barChartData
}

export const transformForLabor = (onNextStep: (v: any) => void, getLaborEntry?: EntryLaborResponse, getMasterList?: MasterResponse) => {
  if (!Array.isArray(getLaborEntry) || !Array.isArray(getMasterList)) {
    return []
  }

  //grouping by master
  const groupedEntry = getLaborEntry.reduce((groups: any, entry) => {
    if (!groups[entry.employee.maestroId]) {
      const masterName = getMasterList.find(master => master.id == entry.employee.maestroId)?.name
      groups[entry.employee.maestroId] = {
        value: 0,
        name: masterName,
        svg: {
          fill: COLORS.secondary,
          onPress: onNextStep({...entry, masterName}),
        }
      }
    }
    groups[entry.employee.maestroId].value += 1
    return groups;
  }, {});

  //transformed
  const barChartData = []
  for (const key in groupedEntry) {
    barChartData.push(groupedEntry[key])
  }

  //return
  return barChartData
}