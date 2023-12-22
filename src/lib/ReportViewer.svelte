<!-- ReportViewer.svelte -->

<script lang="ts">
  export let processedData: Record<string, any[]> = {};
  import { onMount, createEventDispatcher } from 'svelte';
  import { decimalPrecision } from './util'
  type TableScheme = {
    sifra: string | null;
    ime: string | null;
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
  };
  type TableItem = {
    id: string,
    value: TableScheme | null
  }
  let tableDataMap = new Map<string, TableScheme>();


  function structureData(data: Record<string,any[]>) {
    for (const [key, value] of Object.entries(data)) { //for each month
      for (const item of value) { // for each object
        let id = item["KONTO"].length !== 2 ? item["KONTO"] : `0${item["KONTO"]}`;
        let new_row: TableScheme = {
              sifra: null, ime: '', psd: 0, psp: 0,
              '01d': 0,'01p': 0,'02d': 0,'02p': 0,
              '03d': 0,'03p': 0,'04d': 0,'04p': 0,
              '05d': 0,'05p': 0,'06d': 0,'06p': 0,
              '07d': 0,'07p': 0,'08d': 0,'08p': 0,
              '09d': 0,'09p': 0,'10d': 0,'10p': 0,
              '11d': 0,'11p': 0,'12d': 0,'12p': 0,
              ud: 0,up: 0,saldo: 0
            }
        // Check if the entry already exists
        let existingRow = tableDataMap.get(id);
        let monthKeyD = `${key}d` as keyof typeof new_row;
        let monthKeyP = `${key}p` as keyof typeof new_row;
        if (existingRow) {
          existingRow[monthKeyD] = item["D"]
          existingRow[monthKeyP] = item["P"]
          existingRow["ud"] = existingRow["ud"] + item["D"]
          existingRow["up"] = existingRow["up"] + item["P"]
          existingRow["saldo"] = existingRow["ud"] && existingRow["up"] ? existingRow["ud"] - existingRow["up"] : existingRow["saldo"]
        } else {
          new_row["sifra"] = item["KONTO"].length != 2 ? item["KONTO"] : `0${item["KONTO"]}`
          new_row["ime"] = item["NAZIV KONTA"] != "" ? item["NAZIV KONTA"] : ""
          new_row["psd"] = item["PSD"]
          new_row["psp"] = item["PSP"]
          new_row[monthKeyD] = item["D"]
          new_row[monthKeyP] = item["P"]
          new_row["ud"] = new_row["ud"] + item["D"]
          new_row["up"] = new_row["up"] + item["P"]
          new_row["saldo"] = new_row["ud"] && new_row["up"] ? new_row["ud"] - new_row["up"] : new_row["saldo"]
          tableDataMap.set(id, new_row);
        }
      }
    }
  }

  $: {
    console.log("Inside ReportViewer")
    console.log(processedData)
    structureData(processedData);
  }
  
</script>

<style>
  table {
    width: 100%;
    margin-top: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    animation: fadeIn 0.5s ease-in-out;
    overflow-x: scroll;
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

{#if tableDataMap.size > 0}
<style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s1{background-color:#c9daf8;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{background-color:#ffffff;text-align:right;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{background-color:#c9daf8;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style>
<div class="ritz grid-container" dir="ltr">
  <table class="waffle" cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th class="s0" dir="ltr" colspan="2">Konto</th>
        <th class="s0" dir="ltr" colspan="2">Pocetno stanje</th>
        <th class="s0" dir="ltr" colspan="2">Januar</th>
        <th class="s0" dir="ltr" colspan="2">Februar</th>
        <th class="s0" dir="ltr" colspan="2">Mart</th>
        <th class="s0" dir="ltr" colspan="2">April</th>
        <th class="s0" dir="ltr" colspan="2">Maj</th>
        <th class="s0" dir="ltr" colspan="2">Jun</th>
        <th class="s0" dir="ltr" colspan="2">Jul</th>
        <th class="s0" dir="ltr" colspan="2">Avgust</th>
        <th class="s0" dir="ltr" colspan="2">Septembar</th>
        <th class="s0" dir="ltr" colspan="2">Oktobar</th>
        <th class="s0" dir="ltr" colspan="2">Novembar</th>
        <th class="s0" dir="ltr" colspan="2">Decembar</th>
        <th class="s0" dir="ltr" colspan="2">Ukupno</th>
        <th class="s0" dir="ltr">Saldo</th>
      </tr>
    </thead>
  <tbody>
  <tr style="hheight: 20px">
    <td class="s1" dir="ltr">Sifra</td>
    <td class="s1" dir="ltr">Naziv</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s1" dir="ltr">+/-</td>
  </tr>
  {#each Array.from(tableDataMap.entries()) as [id, row]}
  <tr style="height: 20px">
    <td class="s2" dir="ltr">{row.sifra}</td>
    <td class="s2" dir="ltr">{row.ime != null ? row.ime : ""}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row.psd, 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row.psp, 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["01d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["01p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["02d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["02p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["03d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["03p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["04d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["04p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["05d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["05p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["06d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["06p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["07d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["07p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["08d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["08p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["09d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["09p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["10d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["10p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["11d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["11p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["12d"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["12p"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["ud"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["up"], 2)}</td>
    <td class="s2" dir="ltr">{decimalPrecision.round(row["saldo"], 2)}</td>
  </tr>
  {/each}
  </tbody>
</table>
</div>
{:else}
  <p>No processed data available.</p>
{/if}
