<!-- Reports.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import toastr from 'toastr';
  import { fetchData } from '../services/reports';
  import TableViewer from './TableViewer.svelte';
  import type { TableScheme } from './TableScheme';
  type GetReportResponse = {
    "singleDigitKonto": TableScheme[],
    "doubleDigitKonto": TableScheme[],
    "tripleDigitKonto": TableScheme[]
  }
  
  let reportNames: string[] = [];
  let selectedReport: string | null = null;
  let reportData: GetReportResponse = {
      singleDigitKonto: [],
      doubleDigitKonto: [],
      tripleDigitKonto: []
  }


  onMount(async () => {
    reportNames = await fetchReportNames();
  });

  async function fetchReportNames() {
    try {
      let result = await fetchData("reports")
      return result.collections;
    } catch (error) {
      toastr.error('Failed to fetch reports')
    }
  }

  async function handleReportClick(name: string) {
    selectedReport = name;
    try {
      let result = await fetchData(`reports/${name}`)
      reportData = result.report
    } catch (error) {
      toastr.error(`Failed to fetch ${name} reports`)
    }
  }
</script>
  
  <div class="reports-container">
    <h1>Reports</h1>
  
    <!-- Display list of report names -->
    <div class="report-list">
      <ul>
        {#each reportNames as name (name)}
          <div>
            <button on:click={() => handleReportClick(name)}>{name}</button>
          </div>
        {/each}
      </ul>
    </div>
  
    <!-- Display selected report -->
    {#each Object.values(reportData) as dataArray}   
      {#if selectedReport}
        <div class="selected-report">
          <h2>Selected Report: {selectedReport}</h2>
          <TableViewer processedData={dataArray} fileName={selectedReport}/>
        </div>
      {/if}
    {/each}
  </div>
  
  <style>
    .reports-container {
      max-width: 100%;
      margin: auto;
      padding: 20px;
    }
  
    .report-list {
      margin-bottom: 20px;
    }
  
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    button {
      cursor: pointer;
      padding: 8px;
      margin-bottom: 5px;
      background-color: #f0f0f0;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
  
    button:hover {
      background-color: #e0e0e0;
      border-color: black;
    }
  
    .selected-report {
      background-color: #dff0d8;
      padding: 10px;
      border-radius: 4px;
    }
  </style>
  