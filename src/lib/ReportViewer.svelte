<!-- ReportViewer.svelte -->

<script lang="ts">
  export let processedData: Record<string, any[]> = {};
  import { onMount, createEventDispatcher } from 'svelte';
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
  let tableData: TableScheme[] = []


  function structureData(data: Record<string,any[]>) {
    for (const [key, value] of Object.entries(data)) { //for each month
      for (const item of value) { // for each object
        let new_row: TableScheme = {
            sifra: null, ime: null, psd: null, psp: null,
            '01d': null,'01p': null,'02d': null,'02p': null,
            '03d': null,'03p': null,'04d': null,'04p': null,
            '05d': null,'05p': null,'06d': null,'06p': null,
            '07d': null,'07p': null,'08d': null,'08p': null,
            '09d': null,'09p': null,'10d': null,'10p': null,
            '11d': null,'11p': null,'12d': null,'12p': null,
            ud: null,up: null,saldo: null
          }
        let monthKeyD = `${key}d` as keyof typeof new_row;
        let monthKeyP = `${key}p` as keyof typeof new_row;
        new_row["sifra"] = item["KONTO"]
        new_row["ime"] = item["NAZIV KONTA"] != "" ? item["NAZIV KONTA"] : ""
        new_row["psd"] = item["PSD"]
        new_row["psp"] = item["PSP"]
        new_row[monthKeyD] = item["D"]
        new_row[monthKeyP] = item["P"]
        new_row["ud"] = new_row["ud"] + item["D"]
        new_row["up"] = new_row["up"] + item["P"]
        new_row["saldo"] = new_row["ud"] && new_row["up"] ? new_row["ud"] - new_row["up"] : new_row["saldo"]
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
    border-collapse: collapse;
    margin-top: 20px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    animation: fadeIn 0.5s ease-in-out;
    overflow-x: scroll;
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
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

{#if Object.keys(processedData).length > 0}
  
<style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s1{background-color:#c9daf8;text-align:left;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{background-color:#ffffff;text-align:right;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{background-color:#c9daf8;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style>
<div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
    <td class="s0" dir="ltr" colspan="2">Konto</td>
    <td class="s0" dir="ltr" colspan="2">Pocetno stanje</td>
    <td class="s0" dir="ltr" colspan="2">Januar</td>
    <td class="s0" dir="ltr" colspan="2">Februar</td>
    <td class="s0" dir="ltr" colspan="2">Mart</td>
    <td class="s0" dir="ltr" colspan="2">April</td>
    <td class="s0" dir="ltr" colspan="2">Maj</td>
    <td class="s0" dir="ltr" colspan="2">Jun</td>
    <td class="s0" dir="ltr" colspan="2">Jul</td>
    <td class="s0" dir="ltr" colspan="2">Jul</td>
    <td class="s0" dir="ltr" colspan="2">Avgust</td>
    <td class="s0" dir="ltr" colspan="2">Septembar</td>
    <td class="s0" dir="ltr" colspan="2">Oktobar</td>
    <td class="s0" dir="ltr" colspan="2">Novembar</td>
    <td class="s0" dir="ltr" colspan="2">Decembar</td>
    <td class="s0" dir="ltr" colspan="2">Ukupno</td>
    <td class="s0" dir="ltr">Saldo</td>
  </tr>
  <tr style="height: 20px">
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
    <td class="s1" dir="ltr">Duguje</td>
    <td class="s1" dir="ltr">Potrazuje</td>
    <td class="s0" dir="ltr">+/-</td>
  </tr>
  <tr style="height: 20px">
    <td class="s2" dir="ltr">23</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  </tbody>
</table>
</div>
{:else}
  <p>No processed data available.</p>
{/if}
