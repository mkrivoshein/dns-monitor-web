<script>
    import ARecord from "./ARecord.svelte";
    import AAAARecord from "./AAAARecord.svelte";
    import CAARecord from "./CAARecord.svelte";
    import MXRecord from "./MXRecord.svelte";
    import NSRecord from "./NSRecord.svelte";
    import SOARecord from "./SOARecord.svelte";
    import SRVRecord from "./SRVRecord.svelte";
    import {domainRecords} from "../store.ts";

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

        for (var record of value) {
            switch(record.recordType) {
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
    });
</script>

<table class="items-center w-full bg-transparent border-collapse">
        <thead>
        <tr>
            <th class="px-6 align-middle border border-solid py-3 text-s uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Type</th>
            <th class="px-6 align-middle border border-solid py-3 text-s uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Content</th>
        </tr>
        </thead>
        <tbody id="A">
        {#each aRecords as record}
                <tr>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                        <ARecord record="{record}"/>
                    </td>
                </tr>
        {/each}
        </tbody>

        <tbody id="AAAA">
            {#each aaaaRecords as record}
                <tr>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                        <AAAARecord record="{record}"/>
                    </td>
                </tr>
            {/each}
        </tbody>

        <tbody id="CNAME">
        {#each cnameRecords as record}
            <tr>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                    {record.value}
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="MX">
        {#each mxRecords as record}
            <tr>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                    <MXRecord record="{record}"/>
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="TXT">
        {#each txtRecords as record}
            <tr>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                    {record.value}
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="SRV">
        {#each srvRecords as record}
            <tr>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                    <SRVRecord record="{record}"/>
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="NS">
        {#each nsRecords as record}
            <tr>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                    <NSRecord record="{record}"/>
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="CAA">
        {#each caaRecords as record}
                <tr>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                        <CAARecord record="{record}"/>
                    </td>
                </tr>
        {/each}
        </tbody>

        <tbody id="SOA">
        {#each soaRecords as record}
            <tr>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                    <SOARecord record="{record}"/>
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="Other">
        {#each otherRecords as record}
            <tr>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">{record.recordType}</td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-nowrap p-4">
                    {JSON.stringify(record)}
                </td>
            </tr>
        {/each}
        </tbody>

    </table>