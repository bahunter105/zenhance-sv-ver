<script>
  import Canvas from "../lib/Canvas.svelte";
  import dummyOrgCsv from '$lib/Org.csv';
  import dummyPersonCsv from '$lib/PersonRole.csv';
  // console.log(dummyOrgCsv)
  let hideCanvas = true
  let orgCsv = []
  let personCsv =[]

  let files = false
  let peopleFile

  function handleClick() {
    hideCanvas = false
	}

  function handleFileClick() {
    files = true
    let orgFile = document.getElementsByName('org')[0].files[0]
    let peopleFile = document.getElementsByName('people')[0].files[0]

    if (orgFile != undefined) {
      let orgFilePromise = orgFile.text()
      console.log(orgFilePromise)
      orgFilePromise.then(response => {
        // orgCsv = response
        orgCsv = convertCSV(response)
        console.log(orgCsv)
        if(peopleFile != undefined){
          let peopleFilePromise = peopleFile.text()
          console.log(peopleFilePromise)
          peopleFilePromise.then(response => {
            personCsv = convertCSV(response)
            console.log(personCsv)
          })
        }
        handleClick()
      })
    }
	}

  function convertCSV(csvData) {
    let dataArray = csvData.split('\r\n')
    let headingsString = dataArray.shift()
    let headingsArray = headingsString.split(',')

    let finalData = []

    dataArray.forEach(line => {
      let lineArray = line.split(',')
      let lineObj = {}
      lineArray.forEach((lineItem, index) => {
        lineObj[headingsArray[index]] = lineItem
      });
      finalData.push(lineObj)
    });
    return finalData
  }

</script>

{#if hideCanvas}
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello there!</h1>
        <p class="py-6">Upload CVSs to get started. </p>
        <div class="form-control ">
          <form method="POST">
            <label for="org">Organization CSV</label>
            <input accept="csv" name="org" type="file" class="file-input file-input-bordered file-input-accent w-full max-w-xs" />
            <div class="my-4"></div>
            <label for="org">People Roles CSV</label>
            <input accept="csv" name="people" type="file" class="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
            <div class="my-4"></div>
            <button on:click|preventDefault={handleFileClick} class="btn btn-primary"> SUBMIT </button>
          </form>
        </div>
        <div class="divider">OR</div>
        <button on:click|once={handleClick} class="btn btn-accent">Use Dummy Data</button>
      </div>
    </div>
  </div>
{:else if !hideCanvas && files}
  <Canvas orgCsv = {orgCsv} personCsv = {personCsv}/>
{:else}
  <Canvas orgCsv = {dummyOrgCsv} personCsv = {dummyPersonCsv}/>
{/if}
