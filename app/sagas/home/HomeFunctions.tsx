import moment from "moment";
import { ErrorResponse } from "../../services/BaseApiConstants";
import { EntryListResponse } from "../../services/entry/EntryServiceConstants";
import { isEmpty } from "../../utils/ValidationUtil";

export const transformInData = (array?: EntryListResponse | ErrorResponse) => {
  const _array = !Array.isArray(array) ? [] : array

  const initialGroups = {

  }

  if (isEmpty(initialGroups)) {
    for (let index = 0; index < 7; index++) {
      const date = moment().subtract(index, 'days').format('YYYY-MM-DD')
      //@ts-ignore
      initialGroups[date] = {
        date,
        value: 0,
      }
    }
  }

  //Last seven days entry
  const groupedEntry = _array.reduce((groups: any, entry) => {
    const date = moment(entry.createdAt, 'YYYY-MM-DD').format('YYYY-MM-DD');

    //Mocked
    // let random = Math.random() * 100
    // if (random > 80) {
    //   date = moment().subtract(1, 'day').format('YYYY-MM-DD')
    // } else if (random > 50) {
    //   date = moment().subtract(2, 'day').format('YYYY-MM-DD')
    // }
    
    if (moment(date).isAfter(moment().subtract(7, 'days'))) {
      if (!groups[date]) {
        groups[date] = {
          date,
          value: 0,
        }
      }
      groups[date].value += 1
    }
    return groups;
  }, initialGroups);

  //transformed as pie needed
  const pieChartData = []
  for (const key in groupedEntry) {
    const entry = groupedEntry[key]
    pieChartData.push({
      ...entry,
      day: moment(entry.date, 'YYYY-MM-DD').format('ddd')
    })
  }

  //organize from older to younger
  return pieChartData.sort((a, b) => {
    if (moment(a.date).isAfter(moment(b.date))) {
      return 1
    } else {
      return -1
    }
  })
}