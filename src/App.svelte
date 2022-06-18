<script>
    import './Tailwind.css';
    import {onMount} from "svelte";
    import {domainRecords} from './store.ts';
    import axios from "axios";
    import Records from './components/Records.svelte'
    import ErrorAlert from './components/ErrorAlert.svelte'
    import Footer from './components/Footer.svelte'

    const API_URL = `dns/`

    let domainValid = false;
    let domain = ''
    let errored = false;
    let errorMessage = ''
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
            errorMessage = ''
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
            errorMessage = '<b>' + domain + '</b> is not a valid domain name'
        }
    }

    function validateDomain() {
        domainValid = /^.+\..+$/.test(domain);
    }

    function containsAlphaNumericCharacters(value) {
        return /^[a-zA-Z0-9-.]*$/.test(value);
    }

    function handleDomainInput(event) {
        let oldValue = domain;
        let newValue = event.target.value;

        if (containsAlphaNumericCharacters(newValue)) {
            domain = newValue;
            validateDomain();
        } else {
            event.target.value = oldValue;
        }
    }

    onMount(async () => {
        // no need to do anything on launch
    });
</script>

<svelte:head>

</svelte:head>

<main>
    <section class="relative block px-20 pt-4 pb-8 h-300-px">
        <h1 class="py-4 font-bold text-4xl text-blueGray-900">Query DNS records</h1>
        <form on:submit|preventDefault={() => fetchData()}>
        <div class="flex flex-row">
                <div class="w-80">
                    <label
                            class="block uppercase text-blueGray-900 text-xs font-bold mb-2"
                            for="domain-name"
                    >
                        Enter a domain name:
                    </label>
                    <input
                           class="border-0 px-3 py-3 w-full placeholder-blueGray-300 text-blueGray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                           id="domain-name"
                           on:input|preventDefault={handleDomainInput}
                           on:change={() => fetchData()}
                           placeholder="google.com"
                           type="domain"
                    />
                </div>
                <div class="text-center py-6 ml-2 w-fit">
                    <button on:click={() => fetchData()}
                            class="bg-blueGray-100 text-blueGrey-900 active:bg-blueGray-900 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button">
                        Report
                    </button>
                </div>
        </div>
        {#if errored && errorMessage !== ""}
            <ErrorAlert message="{errorMessage}" />
        {/if}
        </form>
    </section>
    <section class="relative px-20 py-1">
        <div class="flex flex-wrap mt-1">
            <div class="w-full mb-2">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                    <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <div class="flex flex-wrap items-center">
                            <div class="relative w-full px-0 max-w-full flex-grow flex-1">
                                <h3 class="font-semibold text-lg text-blueGray-700">
                                    Results
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block w-full py-1 overflow-x-auto">
                    <Records/>
                </div>
            </div>
        </div>
    </section>
</main>
<Footer/>