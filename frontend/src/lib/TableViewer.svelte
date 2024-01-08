<script lang='ts'>
    import { onMount } from "svelte";
    import type { TableScheme } from "./TableScheme";
    import { decimalPrecision, formatNumberWithCommas } from "./util";
    
    export let processedData: Array<TableScheme>= []
    export let fileName: string = ""
    let categorizedData: Map<string, Array<TableScheme>> = new Map<string, TableScheme[]>();

    type ColumnExistType = {
      [K in keyof TableScheme]: boolean;
    };

    let columnExistMap: ColumnExistType = {
      "sifra": true, "naziv": true, "psd": false, "psp": false, 
      "01d": false, "01p": false, "02d": false, "02p": false,
      "03d": false, "03p": false, "04d": false, "04p": false,
      "05d": false, "05p": false, "06d": false, "06p": false,
      "07d": false, "07p": false, "08d": false, "08p": false,
      "09d": false, "09p": false, "10d": false, "10p": false,
      "11d": false, "11p": false, "12d": false, "12p": false,
      "ud": true, "up": true, "saldo": true
    }
    
    onMount(async () => {
        console.log(fileName)
    });

    function getHeaders(columnMap: Record<string, boolean>): string[] {
      const monthsMap: any = {
        "ps": "Pocetno stanje",
        "1": "Januar",
        "2": "Februar",
        "3": "Mart",
        "4": "April",
        "5": "Maj",
        "6": "Jun",
        "7": "Jul",
        "8": "Avgust",
        "9": "Septembar",
        "10": "Oktobar",
        "11": "Novembar",
        "12": "Decembar"
      }
      let headers: string[] = [];
      if (columnMap["psd"] && columnMap["psp"]) {
          headers.push("Pocetno stanje");
        }
      for (let i = 1; i <= 12; i++) {
        const keyD = i >= 1 && i <= 9 ? `0${i}d` : `${i}d`;
        const keyP = i >= 1 && i <= 9 ? `0${i}p` : `${i}p`;
        if (columnMap[keyD] && columnMap[keyP]) {
          headers.push(monthsMap[i]);
        }
      }
      return headers
    }

    function getColumns(columnMap: Record<string, boolean>): string[] {
      return Object.keys(columnMap).filter(column => {
        if (column !== "sifra" && column !== "naziv" && column !== "saldo" && column.endsWith('p')) {
          if (columnMap[column]) {
            return column
          }
        }
      });
    }

    function getValues(columnMap: Record<string, boolean>): string[] {
      return Object.keys(columnMap).filter(column => {
        if (columnMap[column]) {
          return column
        }
      });
    }

    function updateColumnMap(item: TableScheme) {
      if (item) {
        Object.keys(columnExistMap).forEach((key: string) => {
            columnExistMap[key] = item.hasOwnProperty(key as keyof TableScheme);
        })
      }
    }

    async function onProcessedDataChange(data: TableScheme[]) {
      updateColumnMap(processedData[0])
      data.forEach(item => {
        const sifraLength = item.sifra.length.toString();
        if (!categorizedData.has(sifraLength)) {
          categorizedData.set(sifraLength, []);
        }
        const categoryArray = categorizedData.get(sifraLength);
        if (categoryArray) {
          categoryArray.push(item);
        }
      });
    }

    function sortEntriesByNumericKey(entries: any) {
      return entries.sort(([keyA]: [string, Array<TableScheme>], [keyB]: [string, Array<TableScheme>]) => parseInt(keyA) - parseInt(keyB));
    }

    $: onProcessedDataChange(processedData);
</script>


{#each sortEntriesByNumericKey([...categorizedData.entries()]) as [key, categoryData]}
  <div>
    {#if categoryData.length > 0}
      <style type="text/css">
        .ritz .waffle a { color: inherit; }
        .ritz .waffle .s1 { background-color: #c9daf8; text-align: center; color: #000000; font-family: 'Arial'; font-size: 10pt; vertical-align: bottom; white-space: nowrap; direction: ltr; padding: 2px 3px 2px 3px; }
        .ritz .waffle .s2 { text-align: right; font-family: 'Arial'; font-size: 10pt; vertical-align: bottom; white-space: nowrap; direction: ltr; padding: 2px 3px 2px 3px; }
        .ritz .waffle .s0 { text-align: center; font-family: 'Arial'; font-size: 10pt; vertical-align: bottom; white-space: nowrap; direction: ltr; }
      </style>
      <div class="ritz" dir="ltr">
        <table class="waffle" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th class="s0" dir="ltr" colspan="2">Konto</th>
              {#each getHeaders(columnExistMap) as header}
                <th class="s0" dir="ltr" colspan="2">{header}</th>
              {/each}
              <th class="s0" dir="ltr" colspan="2">Ukupno</th>
              <th class="s0" dir="ltr">Saldo</th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 20px">
              <td class="s1" dir="ltr">Sifra</td>
              <td class="s1" dir="ltr">Naziv</td>
              {#each getColumns(columnExistMap) as _}
                <td class="s1" dir="ltr">Duguje</td>
                <td class="s1" dir="ltr">Potrazuje</td>
              {/each}
              <td class="s1" dir="ltr">+/-</td>
            </tr>
            {#each categoryData as row}
              <tr style="height: 20px">
                {#each getValues(columnExistMap) as columnName}
                  <td class="s2" dir="ltr">
                    {#if typeof row[columnName] !== 'string'}
                      {row[columnName] != null ? formatNumberWithCommas(decimalPrecision.round(row[columnName], 2)) : 0}
                    {:else}
                      {row[columnName] == null ? '' : row[columnName]}
                    {/if}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p>No processed data available for sifra length {length}.</p>
    {/if}
  </div>
{/each}


<style>
    table {
      width: 100%;
      margin-top: 20px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      animation: fadeIn 0.5s ease-in-out;
      overflow: auto;
    }
    tbody {
      background-color: #fff;
      color: black;
    }
  
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-left:1px solid #ddd;
    }
  
    th {
      background-color: #3498db;
      color: #fff;
    }
  
    tr:hover {
      background-color: rgba(52, 152, 219, 0.2);
    }
  
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>