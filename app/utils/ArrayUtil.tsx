import {localToString, removeWhiteSpace, searchInString} from './StringUtil';
import {isEmpty} from './ValidationUtil';

export const localToArray = (array?: any[] | any | null): any[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  return array;
};

export const emptyOrArray = (array?: any[] | any | null): any[] | undefined => {
  if (!localToArray(array).length) {
    return undefined;
  }
  return array;
};

interface record {
  [key: string]: any;
}

export const filterArray = (
  queryParam?: string | null,
  records?: record[] | null,
  properties: string[] = [''],
): any[] => {
  const query = removeWhiteSpace(queryParam);
  if (!Array.isArray(records)) {
    return [];
  } else if (query.length == 0) {
    return records;
  }
  const filteredRecords: record[] = [];
  for (const item of records) {
    const shouldPush: boolean[] = [];
    for (const property of properties) {
      shouldPush.push(searchInString(item[property], query));
    }
    if (shouldPush.includes(true)) {
      filteredRecords.push(item);
    }
  }
  return filteredRecords;
};

export const sumValArray = (property: string, records?: record[]): number => {
  if (isEmpty(records)) {
    return 0;
  }

  return localToArray(records).reduce(function (prev, cur) {
    return prev + cur?.[property];
  }, 0);
};

export const arrayArrayToArray = (arrayArray?: any[][]): any[] => {
  const array: any[] = [];

  if (!arrayArray) {
    return [];
  }

  for (const row of arrayArray) {
    for (const cell of row) {
      array.push(cell);
    }
  }

  return array;
};
