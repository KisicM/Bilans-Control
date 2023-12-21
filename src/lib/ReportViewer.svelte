<!-- ReportViewer.svelte -->

<script lang="ts">
  export let processedData: Record<string, any[]> = {};
  import { onMount, createEventDispatcher } from 'svelte';
  let tableScheme: {
    "sifra": string|null,
    "ime": string|null,
    "psd": number|null,
    "psp": number|null,
    "01d": number|null,"01p": number|null,
    "02d": number|null,"02p": number|null,
    "03d": number|null,"03p": number|null,
    "04d": number|null,"04p": number|null,
    "05d": number|null,"05p": number|null,
    "06d": number|null,"06p": number|null,
    "07d": number|null,"07p": number|null,
    "08d": number|null,"08p": number|null,
    "09d": number|null,"09p": number|null,
    "10d": number|null,"10p": number|null,
    "11d": number|null,"11p": number|null,
    "12d": number|null,"12p": number|null,
    "ud": number|null,"up": number|null,
    "saldo": number|null

  } = {
  "sifra": null,
  "ime": null,
  "psd": 0,
  "psp": 0,
  "01d": 0, "01p": 0,
  "02d": 0, "02p": 0,
  "03d": 0, "03p": 0,
  "04d": 0, "04p": 0,
  "05d": 0, "05p": 0,
  "06d": 0, "06p": 0,
  "07d": 0, "07p": 0,
  "08d": 0, "08p": 0,
  "09d": 0, "09p": 0,
  "10d": 0, "10p": 0,
  "11d": 0, "11p": 0,
  "12d": 0, "12p": 0,
  "ud": 0,
  "up": 0,
  "saldo": 0
};

  function structureData(data: any) {
    for (const [key, value] of data.entries()) {
      for (const item of value) {
        let monthKeyD = `${key}d` as keyof typeof tableScheme;
        let monthKeyP = `${key}p` as keyof typeof tableScheme;
        tableScheme["sifra"] = item["KONTO"]
        tableScheme["ime"] = item["NAZIV KONTA"] != "" ? item["NAZIV KONTA"] : ""
        tableScheme["psd"] = item["PSD"]
        tableScheme["psp"] = item["PSP"]
        tableScheme[monthKeyD] = item["D"]
        tableScheme[monthKeyP] = item["P"]
        tableScheme["ud"] = tableScheme["ud"] + item["D"]
        tableScheme["up"] = tableScheme["up"] + item["P"]
        tableScheme["saldo"] = tableScheme["ud"] && tableScheme["up"] ? tableScheme["ud"] - tableScheme["up"] : tableScheme["saldo"]
      }
    }
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
