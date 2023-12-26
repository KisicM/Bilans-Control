<script lang="ts">
    import type { TableScheme } from "./TableScheme";
    import { convertJsonToExcel, decimalPrecision, formatNumberWithCommas } from "./util";
    import { postData } from "../services/reports"
    export let processedData: Record<string, any[]> = {};
    export let data: Map<string, TableScheme> = new Map();

    function handleExport() {
        const dataArray = Array.from(data.values());
        convertJsonToExcel(dataArray, "output.xlsx")
        console.log("Exported")
    }

    const handleClick = async () => {
      const dataArray = Array.from(data.values());
      const postDataPayload = { collectionName: "ling", data:dataArray };
      try {
        let postDataResult = await postData("reports", postDataPayload);
        console.log(postDataResult)
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };
</script>

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
  <div>
    <button style="color: white; background-color:green" on:click={handleExport}>
        Export to Excel
    </button>
    <button style="color: white; background-color:blue" on:click={handleClick}>
        Save report
    </button>
  </div>
  <div style="overflow: auto;">
  {#if data.size > 0}
  <style type="text/css">.ritz .waffle a { color: inherit; }.ritz .waffle .s1{background-color:#c9daf8;text-align:center;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{text-align:right;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{text-align:center;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;}</style>
  <div class="ritz" dir="ltr">
    <table class="waffle" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th class="s0" dir="ltr" colspan="2">Konto</th>
          <th class="s0" dir="ltr" colspan="2">Pocetno stanje</th>
          {#if processedData["01"].length != 0}<th class="s0" dir="ltr" colspan="2">Januar</th>{/if}
          {#if processedData["02"].length != 0}<th class="s0" dir="ltr" colspan="2">Februar</th>{/if}
          {#if processedData["03"].length != 0}<th class="s0" dir="ltr" colspan="2">Mart</th>{/if}
          {#if processedData["04"].length != 0}<th class="s0" dir="ltr" colspan="2">April</th>{/if}
          {#if processedData["05"].length != 0}<th class="s0" dir="ltr" colspan="2">Maj</th>{/if}
          {#if processedData["06"].length != 0}<th class="s0" dir="ltr" colspan="2">Jun</th>{/if}
          {#if processedData["07"].length != 0}<th class="s0" dir="ltr" colspan="2">Jul</th>{/if}
          {#if processedData["08"].length != 0}<th class="s0" dir="ltr" colspan="2">Avgust</th>{/if}
          {#if processedData["09"].length != 0}<th class="s0" dir="ltr" colspan="2">Septembar</th>{/if}
          {#if processedData["10"].length != 0}<th class="s0" dir="ltr" colspan="2">Oktobar</th>{/if}
          {#if processedData["11"].length != 0}<th class="s0" dir="ltr" colspan="2">Novembar</th>{/if}
          {#if processedData["12"].length != 0}<th class="s0" dir="ltr" colspan="2">Decembar</th>{/if}
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
      {#if processedData["01"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["01"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["02"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["02"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["03"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["03"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["04"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["04"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["05"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["05"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["06"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["06"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["07"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["07"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["08"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["08"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["09"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["09"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["10"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["10"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["11"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["11"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      {#if processedData["12"].length != 0}<td class="s1" dir="ltr">Duguje</td>{/if}
      {#if processedData["12"].length != 0}<td class="s1" dir="ltr">Potrazuje</td>{/if}
      <td class="s1" dir="ltr">Duguje</td>
      <td class="s1" dir="ltr">Potrazuje</td>
      <td class="s1" dir="ltr">+/-</td>
    </tr>
    {#each Array.from(data.entries()) as [id, row]}
    <tr style="height: 20px">
      <td class="s2" dir="ltr">{row.sifra}</td>
      <td class="s2" style="text-align: left;" dir="ltr">{row.naziv != null ? row.naziv : ""}</td>
      <td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row.psd, 2))}</td>
      <td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row.psp, 2))}</td>
      {#if processedData["01"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["01d"], 2))}</td>{/if}
      {#if processedData["01"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["01p"], 2))}</td>{/if}
      {#if processedData["02"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["02d"], 2))}</td>{/if}
      {#if processedData["02"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["02p"], 2))}</td>{/if}
      {#if processedData["03"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["03d"], 2))}</td>{/if}
      {#if processedData["03"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["03p"], 2))}</td>{/if}
      {#if processedData["04"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["04d"], 2))}</td>{/if}
      {#if processedData["04"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["04p"], 2))}</td>{/if}
      {#if processedData["05"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["05d"], 2))}</td>{/if}
      {#if processedData["05"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["05p"], 2))}</td>{/if}
      {#if processedData["06"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["06d"], 2))}</td>{/if}
      {#if processedData["06"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["06p"], 2))}</td>{/if}
      {#if processedData["07"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["07d"], 2))}</td>{/if}
      {#if processedData["07"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["07p"], 2))}</td>{/if}
      {#if processedData["08"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["08d"], 2))}</td>{/if}
      {#if processedData["08"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["08p"], 2))}</td>{/if}
      {#if processedData["09"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["09d"], 2))}</td>{/if}
      {#if processedData["09"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["09p"], 2))}</td>{/if}
      {#if processedData["10"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["10d"], 2))}</td>{/if}
      {#if processedData["10"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["10p"], 2))}</td>{/if}
      {#if processedData["11"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["11d"], 2))}</td>{/if}
      {#if processedData["11"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["11p"], 2))}</td>{/if}
      {#if processedData["12"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["12d"], 2))}</td>{/if}
      {#if processedData["12"].length != 0}<td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["12p"], 2))}</td>{/if}
      <td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["ud"], 2))}</td>
      <td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["up"], 2))}</td>
      <td class="s2" dir="ltr">{formatNumberWithCommas(decimalPrecision.round(row["saldo"], 2))}</td>
    </tr>
    {/each}
    </tbody>
  </table>
  </div>
  {:else}
    <p>No processed data available.</p>
  {/if}
  </div>