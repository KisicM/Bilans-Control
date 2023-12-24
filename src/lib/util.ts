interface DecimalPrecision {
    round(num: number | null, decimalPlaces?: number): number;
    ceil(num: number, decimalPlaces?: number): number;
    floor(num: number, decimalPlaces?: number): number;
    trunc(num: number, decimalPlaces?: number): number;
    toFixed(num: number, decimalPlaces?: number): string;
  }

export const decimalPrecision: DecimalPrecision = (() => {
if (Number.EPSILON === undefined) {
    (Number as any).EPSILON = Math.pow(2, -52);
}
if (Math.sign === undefined) {
    Math.sign = function(x: any): number {
    return (x > 0) ? 1 : (x < 0) ? -1 : 0 || +x;
    };
}

return {
    // Decimal round (half away from zero)
    round: function(num: number, decimalPlaces: number = 0): number {
    const p = Math.pow(10, decimalPlaces);
    const n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
    },
    // Decimal ceil
    ceil: function(num: number, decimalPlaces: number = 0): number {
    const p = Math.pow(10, decimalPlaces);
    const n = (num * p) * (1 - Math.sign(num) * Number.EPSILON);
    return Math.ceil(n) / p;
    },
    // Decimal floor
    floor: function(num: number, decimalPlaces: number = 0): number {
    const p = Math.pow(10, decimalPlaces);
    const n = (num * p) * (1 + Math.sign(num) * Number.EPSILON);
    return Math.floor(n) / p;
    },
    // Decimal trunc
    trunc: function(num: number, decimalPlaces: number = 0): number {
    return (num < 0 ? this.ceil : this.floor)(num, decimalPlaces);
    },
    // Format using fixed-point notation
    toFixed: function(num: number, decimalPlaces: number = 0): string {
    return this.round(num, decimalPlaces).toFixed(decimalPlaces);
    },
};
})();


import * as XLSX from 'xlsx';

export function convertJsonToExcel(data: any[], fileName: string): void {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  XLSX.writeFile(wb, fileName);
}