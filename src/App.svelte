<script>
  import TailwindCss from './TailwindCSS.svelte';
  import { onMount } from "svelte";
  import { domainRecords } from './store.ts';
  import axios from "axios";
  import Records from './components/Records.svelte'

const API_URL = `dns/`

let domainValid = false;
let domain = ''
let errored = false;
let loading = false;
let records;
let promise;

domainRecords.subscribe(value => {
  records = value;
});

function fetchData() {
  // this.url = `${API_URL}${this.domain}`
  // this.records = await (await fetch(this.url)).json()
  if (domainValid) {
    let url = `${API_URL}${domain}`
    errored = false;
    loading = true;
    promise = axios
            .get(url)
            .then(response => {
              console.log('response.JSON:', {
                message: 'Request received',
                data: response.data
              });
              domainRecords.set(response.data.records)
              //this.errored = false
            })
            .catch(error => {
              console.log(error)
              //this.errored = true
            })
            .finally(() => loading = false)
  } else {
    errored = true;
  }
}

function validateDomain() {
  domainValid = /.+\..+/.test(domain);
}

onMount(async () => {
  await fetchData();
});
</script>

<svelte:head>

</svelte:head>

<TailwindCss />

<main>
  <h1>DNS Monitor</h1>

  <input bind:value={domain} on:change={() => validateDomain()}>

  <button type="button" class="btn" on:click={() => fetchData()}>Fetch</button>

  <span style="padding-top: 20px;">
    <Records/>
  </span>

</main>