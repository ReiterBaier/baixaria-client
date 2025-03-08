import { ApiDefaultOrderParam } from "../services/api-config/types";



export const formatDate = (date: string | undefined | null) => {
    if (!date) {
        return ''
    }
    const originalDate = new Date(date);

    const formattedDate = `${originalDate.toLocaleDateString()} - ${originalDate.toLocaleTimeString()}`;

    return formattedDate;

}

export function formatDateToBrazilian(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  
  return `${day}/${month}/${year}`;
}


export const getNestedValue = (obj: any, path: any) => {
    return path.split('.').reduce((acc: any, part: any) => {
      return (acc && acc[part] !== undefined) ? acc[part] : undefined;
    }, obj);
  };

  export function enumToOptions<T extends { [key: string]: string }>(enumObj: T): { label: string; value: string }[] {
    return Object.keys(enumObj).map((key) => ({
      label: enumObj[key],
      value: enumObj[key],
    }));
  }
  
  
  export function transformArrayToOptions<T>(array: T[], labelKey: keyof T, valueKey: keyof T): {label: string, value: string}[] {
    return array.map(item => ({
      label: String(item[labelKey]),
      value: String(item[valueKey]),
    }));
  };

  export function transformArrayToOptionsWithConcat<T>(
    array: T[],
    labelKeys: string[],
    valueKey: keyof T
  ): { label: string; value: string }[] {
    return array.map(item => ({
      label: labelKeys
        .map(key => {
          const keys = key.split('.');
          return keys.reduce((acc, curr) => (acc && acc[curr] !== undefined ? acc[curr] : ''), item as any);
        })
        .join(' | '),
      value: String(item[valueKey]),
    }));
  };
  

  export const convertSortColumnToString = (sortColumn: ApiDefaultOrderParam): string => {
    if (!sortColumn.order) return '';
    const key = Object.keys(sortColumn.order)[0];
    const value = sortColumn.order[key];
    return `${key}:${value}`;
};


export function convertNumberToReal(value: number) {
  const formattedNumber = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return formattedNumber;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
};