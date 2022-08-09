<script>
    import './Tailwind.css';
    import {onMount} from "svelte";
    import {domainRecords} from './store.ts';
    import Records from './components/Records.svelte'
    import ErrorAlert from './components/ErrorAlert.svelte'
    import Footer from './components/Footer.svelte'
    import dnsClient, {subDomains} from './DnsClient'

    let domainValid = false;
    let domain = ''
    let errored = false;
    let errorMessage = ''
    let loading = false;
    let records;

    domainRecords.subscribe(value => {
        records = value;
    });

    async function fetchData() {
        // this.url = `${API_URL}${this.domain}`
        // this.records = await (await fetch(this.url)).json()
        if (domainValid) {
            errored = false;
            errorMessage = ''
            loading = true;
            // clear current state
            domainRecords.set(new Map());
            // load it afresh
            await dnsClient.updateDomainRecords(domain, subDomains, error => console.log(error), () => loading = false)
        } else {
            errored = true;
            errorMessage = '<b>' + domain + '</b> is not a valid domain name'
        }
    }

    function validateDomain() {
        domainValid = /^.+\..+$/.test(domain);
    }

    function containsAlphaNumericCharacters(value) {
        return /^[a-zA-Z0-9-._#$%]*$/.test(value);
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
    <section class="relative block px-4 pt-4 pb-8 h-300-px">
        <h1 class="py-4 font-bold text-4xl text-blueGray-900">Query DNS records</h1>
        <form on:submit|preventDefault={() => fetchData()}>
        <div class="flex flex-row">
                <div class="w-80">
                    <label
                            class="block uppercase text-blueGray-900 text-xs lg:text-lg font-bold mb-2"
                            for="domain-name"
                    >
                        Enter a domain name:
                    </label>
                    <input
                           class="border-0 px-3 py-3  w-full placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm lg:text-lg  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                           id="domain-name"
                           on:input|preventDefault={handleDomainInput}
                           on:change={() => fetchData()}
                           placeholder="google.com"
                           type="domain"
                    />
                </div>
                <div class="text-center  py-6 ml-4 sm:py-6 w-fit">
                    <button on:click={() => fetchData()}
                            class="bg-blueGray-100 text-blueGrey-900 active:bg-blueGray-900 text-sm lg:text-xl font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
    <section class=" relative px-3 py-1">
        <div class="flex flex-wrap mt-1">
            <div class="w-full mb-2">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                    <div class=" rounded-t mb-0 px-4 py-3 border-0">
                        <div class="flex flex-wrap items-center">
                            <div class="relative w-full  px-0 max-w-full flex-grow flex-1">
                                <h3 class="font-semibold text-lg text-blueGray-700">
                                    Results
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class = "container mx-auto 	w-40">
                <div class= "block w-full py-1  overflow-x-auto ">
                    <table class=" table-cell  items-center w-full  text-xs lg:text-lg break-words  bg-transparent border border-solid border-collapse  border-x-0 border-y-0">
                        <thead>
                        <tr class="border bg-blueGray-200" > 
                      
                            <th class="px-0.4 w-screen  py-3 lg:text-lg align-middle uppercase    break-words font-semibold text-left">Subdomain</th>
                            <th class="px-0.4 w-screen py-3 lg:text-lg align-middle uppercase  break-words  font-semibold text-left">Type</th>
                            <th class="px-0   w-screen  py-3 lg:text-lg align-middle uppercase  break-words font-semibold text-left">Content</th>
                        </tr>
                        </thead >
                        {#each subDomains as subDomain}
                            <Records subDomain="{subDomain}" domain="{domain}"/>
                        {/each}
                    </table>
                </div>
           </div>
         </div>
        </div>
      
    </section>
</main>
<Footer/>