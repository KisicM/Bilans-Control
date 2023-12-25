<!-- Dropzone.svelte -->

<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import * as XLSX from 'xlsx';

  let files: File[] = [];
  let allowedFileTypes = ['.xls', '.xlsx'];
  let isActive: boolean = false;
  let monthsMap: any = {
    "ps": [],
    "01": [],
    "02": [],
    "03": [],
    "04": [],
    "05": [],
    "06": [],
    "07": [],
    "08": [],
    "09": [],
    "10": [],
    "11": [],
    "12": []
  }
  const dispatch = createEventDispatcher();

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer == null) return
    const newFiles = Array.from(event.dataTransfer.files) as File[];

    // Remove existing files with the same name
    files = files.filter(existingFile => !newFiles.some(newFile => newFile.name === existingFile.name));

    // Add the new files
    files = [...files, ...newFiles.filter(file => isAllowedFileType(file))];

    console.log(files); // You can process the files here
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    isActive = true;
  }

  function handleDragLeave() {
    isActive = false;
  }

  function isAllowedFileType(file: File): boolean {
    const fileType = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    return allowedFileTypes.includes(`.${fileType}`);
  }

  async function processFiles() {
    for (const file of files) {
      const month =  getMonth(file.name)
      const workbook = await readExcelFile(file);
      const data: Array<string> = covertToJsonArray(workbook);
      monthsMap[month] = data
      console.log(data[0])

    }
    dispatch('processedData', monthsMap);
  }

  function getMonth(inputString: string) {
    const stringWithoutExtension = inputString.split('.')[0]
    const stringArray = stringWithoutExtension.split(' ');
    const lastElement = stringArray[stringArray.length - 1];
    const lastTwoChars = lastElement.slice(-2);
    return lastTwoChars.toLowerCase();
  }

  async function readExcelFile(file: File): Promise<XLSX.WorkBook> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          if (e.target == null) return
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          resolve(workbook);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  function covertToJsonArray(workbook: XLSX.WorkBook): any[] {
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonArray = XLSX.utils.sheet_to_json(worksheet) as any;
    const nonEmptyRows = jsonArray.filter((row: any) => {
    // Check if at least one property in the row has a value
    return Object.values(row).some((value) => value !== null && value !== undefined && value !== '');
  });
  return nonEmptyRows;
  }


</script>

<style>
  .dropzone {
    border: 2px dashed #3498db;
    padding: 20px;
    text-align: center;
    color: #3498db;
    transition: border 0.3s ease-in-out;
    border-color: #2ecc71;
  }

  .file-list {
    margin-top: 10px;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 5px;
    font-weight: bold;
    color: #2ecc71;
  }

  .process-button {
    margin-top: 20px;
    padding: 10px;
    background-color: #2ecc71;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  .process-button:hover {
    background-color: #27ae60;
  }
</style>

<div
  class="dropzone"
  on:drop="{handleDrop}"
  on:dragover="{handleDragOver}"
  on:dragleave="{handleDragLeave}"
  role="region"
  aria-label="File Drop Zone"
>
  <p>Drop Excel files (.xls or .xlsx) here</p>
  {#if files.length > 0}
    <div class="file-list">
      <p>Added Files:</p>
      <ul>
        {#each files as file (file.name)}
          <li>{file.name}</li>
        {/each}
      </ul>
    </div>
    <button on:click="{processFiles}" class="process-button">Process Files</button>
  {/if}
</div>
