export type TableScheme = {
    sifra: string;
    naziv: string;
    psd: number | null;
    psp: number | null;
    "01d": number | null;
    "01p": number | null;
    "02d": number | null;
    "02p": number | null;
    "03d": number | null;
    "03p": number | null;
    "04d": number | null;
    "04p": number | null;
    "05d": number | null;
    "05p": number | null;
    "06d": number | null;
    "06p": number | null;
    "07d": number | null;
    "07p": number | null;
    "08d": number | null;
    "08p": number | null;
    "09d": number | null;
    "09p": number | null;
    "10d": number | null;
    "10p": number | null;
    "11d": number | null;
    "11p": number | null;
    "12d": number | null;
    "12p": number | null;
    ud: number | null;
    up: number | null;
    saldo: number | null;
    [key: string]: string | number | null;
  };

  export type ReportSavedResponse = {
    message: string;
    success: boolean;
    countInserted: number | null;
    countUpdated: number | null;
  }