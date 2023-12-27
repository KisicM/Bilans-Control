<!-- ReportViewer.svelte -->

<script lang="ts">
  export let processedData: Record<string, any[]> = {};
  export let fileName: string = "collection"
  import { onMount, createEventDispatcher } from 'svelte';
  import { decimalPrecision } from './util'
  import LayeredViewer from './LayeredViewer.svelte';
  import type { TableScheme } from './TableScheme';
    import { fade } from 'svelte/transition';
  
  let tableDataMap = new Map<string, TableScheme>();
  let layerOneValues = new Map<string, TableScheme>();
  let layerTwoValues = new Map<string, TableScheme>();
  let selectedLayer = 1;

  function createEmptyTableScheme(): TableScheme {
    return {
              sifra: null, naziv: '', psd: 0, psp: 0,
              '01d': 0,'01p': 0,'02d': 0,'02p': 0,
              '03d': 0,'03p': 0,'04d': 0,'04p': 0,
              '05d': 0,'05p': 0,'06d': 0,'06p': 0,
              '07d': 0,'07p': 0,'08d': 0,'08p': 0,
              '09d': 0,'09p': 0,'10d': 0,'10p': 0,
              '11d': 0,'11p': 0,'12d': 0,'12p': 0,
              ud: 0,up: 0,saldo: 0
            }
}

  function structureData(data: Record<string,any[]>) {
    for (const [key, value] of Object.entries(data)) { //for each month
      if (key == "ps") continue
      for (const item of value) { // for each object
        let id = item["KONTO"].length !== 2 ? String(item["KONTO"]) : `0${item["KONTO"]}`;
        let new_row: TableScheme = createEmptyTableScheme()
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
          new_row["sifra"] = item["KONTO"].length != 2 ? String(item["KONTO"]) : `0${item["KONTO"]}`
          new_row["naziv"] = item["NAZIV KONTA"] != "" ? item["NAZIV KONTA"] : ""
          new_row["psd"] = getInitialValue(item["KONTO"], "PSD")
          new_row["psp"] = getInitialValue(item["KONTO"], "PSP")
          new_row[monthKeyD] = item["D"]
          new_row[monthKeyP] = item["P"]
          new_row["ud"] = new_row["psd"] + item["D"]
          new_row["up"] = new_row["psp"] + item["P"]
          new_row["saldo"] = new_row["ud"] && new_row["up"] ? new_row["ud"] - new_row["up"] : new_row["saldo"]
          tableDataMap.set(id, new_row);
        }
      }
    }
  }

  function getInitialValue(key: string, valueToGet: string): number {
    let result = 0
    processedData["ps"].forEach(element => {
      if (String(element["KONTO"]) == key) {
        result = element[valueToGet] as number
        return
      }
    });
    return result
  }

  function calculateLayer(layerNumber: number): Map<string, TableScheme> {
    const result: Map<string, TableScheme> = new Map();
      Array.from(tableDataMap.entries()).forEach(([key, value]) => {
        const prefix = key.substring(0, layerNumber);
        const existingRow = result.get(prefix) || createEmptyTableScheme();
        existingRow.sifra = prefix
        for (const field in existingRow) {
            if (typeof existingRow[field] === 'number') {
                (existingRow[field]as number) += (value[field] as number) || 0;
            }
        }
        result.set(prefix, existingRow)
    });
    return result
  }

  $: {
    console.log("Inside ReportViewer")
    console.log(processedData)
    console.log(fileName)
    fileName = fileName
    structureData(processedData);
    layerTwoValues=calculateLayer(2);
    layerOneValues=calculateLayer(1);
  }
  
</script>

<style>
  /* ... existing styles ... */
  .viewer {
    margin-top: 1%;
  }
  .viewer-container {
    overflow: auto;
    white-space: nowrap; /* Prevent table from breaking into multiple lines */
  }
</style>

<div class="viewer-container">
  <div class="viewer-container viewer">
    <LayeredViewer data={layerOneValues} processedData={processedData} fileName={fileName}/>
  </div>
  <div class="viewer-container viewer">
    <LayeredViewer data={layerTwoValues} processedData={processedData} fileName={fileName}/>
  </div>
  <div class="viewer-container viewer">
    <LayeredViewer data={tableDataMap} processedData={processedData} fileName={fileName}/>
  </div>
</div>