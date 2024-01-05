<!-- App.svelte -->


<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import logo from './assets/logo.png'
  import Dropzone from './lib/Dropzone.svelte';
  import ReportViewer from './lib/ReportViewer.svelte';
  import Reports from './lib/Reports.svelte'
  import 'toastr/build/toastr.css'
  let processedData: any = null;
  let fileName: string = "collection"

  import toastr from 'toastr';
    toastr.options = {
      // customize toastr options if needed
    };

  function handleProcessedData(event: CustomEvent) {
    processedData = event.detail;
  }

  function handleFileName(event: CustomEvent) {
    fileName = event.detail
  }

</script>

<div>
  <div>
    <a href="/Bilans-Control" target="_blank" rel="noreferrer">
      <img src={logo} class="logo" alt="Vite Logo" />
    </a>
  </div>
  <Router>
    <nav>
      <Link to="/Bilans-Control/">Home</Link>
      <Link to="/Bilans-Control/reports">Reports</Link>
    </nav>
    <Route path="/Bilans-Control/">
      <div>
        {#if processedData}
        <h1>Processed report</h1>
        <div>
          <ReportViewer processedData={processedData} fileName={fileName} />
        </div>
        {:else}
        <h1>Generate report</h1>
        <div class="scroll-container">
          <div class="card-container">
            <div class="card">
              <Dropzone on:processedData={handleProcessedData} on:emitFileName={handleFileName} />
            </div>
          </div>
        </div>
        {/if}
      </div>
    </Route>
    <Route path="/Bilans-Control/reports" component={Reports} />
  </Router>
</div>

<style>
  .logo {
    height: 8em;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .scroll-container {
    overflow-x: auto;
    white-space: nowrap;
    padding: 20px 0;
  }

  .card-container {
    display: inline-flex;
    gap: 20px;
    justify-content: space-around;
    transition: transform 0.3s ease-in-out;
  }

  .card {
    border: 2px solid #3498db;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    color: #3498db;
    transition: border 0.3s ease-in-out, transform 0.3s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .card:hover {
    border-color: #2ecc71;
    transform: scale(1.05);
  }
</style>
