<script>
    export let subDomain;
    export let domain;

    import dnsClient from "../DnsClient";
    import {domainRecords} from "../store.ts";

    import ARecord from "./ARecord.svelte";
    import AAAARecord from "./AAAARecord.svelte";
    import CAARecord from "./CAARecord.svelte";
    import MXRecord from "./MXRecord.svelte";
    import NSRecord from "./NSRecord.svelte";
    import SOARecord from "./SOARecord.svelte";
    import SRVRecord from "./SRVRecord.svelte";

    let aRecords;
    let aaaaRecords;
    let caaRecords;
    let cnameRecords;
    let mxRecords;
    let nsRecords;
    let soaRecords;
    let srvRecords;
    let txtRecords;
    let otherRecords;

    domainRecords.subscribe(value => {
        console.log("value=" + JSON.stringify(value));

        aRecords = [];
        aaaaRecords = [];
        caaRecords = [];
        cnameRecords = [];
        mxRecords = [];
        nsRecords = [];
        soaRecords = [];
        srvRecords = [];
        txtRecords = [];
        otherRecords = [];

        let fqdn = dnsClient.fqdn(subDomain, domain);
        let records = value.get(fqdn);

        if (records) {
            for (const record of records) {
                switch (record.recordType) {
                    case 'A': {
                        aRecords.push(record);
                        break;
                    }
                    case 'AAAA': {
                        aaaaRecords.push(record);
                        break;
                    }
                    case 'CAA': {
                        caaRecords.push(record);
                        break;
                    }
                    case 'CNAME': {
                        cnameRecords.push(record);
                        break;
                    }
                    case 'MX': {
                        mxRecords.push(record);
                        break;
                    }
                    case 'NS': {
                        nsRecords.push(record);
                        break;
                    }
                    case 'SOA': {
                        soaRecords.push(record);
                        break;
                    }
                    case 'SRV': {
                        srvRecords.push(record);
                        break;
                    }
                    case 'TXT': {
                        txtRecords.push(record);
                        break;
                    }
                    default: {
                        otherRecords.push(record);
                        break;
                    }
                }
            }
        }
    });
</script>

<tbody id="CNAME" class="border">
{#each cnameRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            {record.value}
        </td>
    </tr>
{/each}
</tbody>

<tbody id="A" class="border">
{#each aRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            <ARecord record="{record}"/>
        </td>
    </tr>
{/each}
</tbody>

<tbody id="AAAA" class="border">
{#each aaaaRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            <AAAARecord record="{record}"/>
        </td>
    </tr>
{/each}
</tbody>

<tbody id="MX" class="border">
{#each mxRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            <MXRecord record="{record}"/>
        </td>
    </tr>
{/each}
</tbody>

<tbody id="TXT" class="border">
{#each txtRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            {record.value}
        </td>
    </tr>
{/each}
</tbody>

<tbody id="SRV" class="border">
{#each srvRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            <SRVRecord record="{record}"/>
        </td>
    </tr>
{/each}
</tbody>

<tbody id="NS" class="border">
{#each nsRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            <NSRecord record="{record}"/>
        </td>
    </tr>
{/each}
</tbody>

<tbody id="CAA" class="border">
{#each caaRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            <CAARecord record="{record}"/>
        </td>
    </tr>
{/each}
</tbody>

<tbody id="SOA" class="border">
{#each soaRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            <SOARecord record="{record}"/>
        </td>
    </tr>
{/each}
</tbody>

<tbody id="Other" class="border">
{#each otherRecords as record}
    <tr>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{subDomain}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">{record.recordType}</td>
        <td class="px-6 align-middle text-s whitespace-nowrap p-1">
            {JSON.stringify(record)}
        </td>
    </tr>
{/each}
</tbody>