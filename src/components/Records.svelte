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

    <table>
        <thead>
        <tr>
            <th>Type</th>
            <th>Content</th>
        </tr>
        </thead>
        <tbody id="A">
        {#each aRecords as record}
                <tr>
                    <td>{record.recordType}</td>
                    <td>
                        <ARecord record="{record}"/>
                    </td>
                </tr>
        {/each}
        </tbody>

        <tbody id="AAAA">
            {#each aaaaRecords as record}
                <tr>
                    <td>{record.recordType}</td>
                    <td>
                        <AAAARecord record="{record}"/>
                    </td>
                </tr>
            {/each}
        </tbody>

        <tbody id="CNAME">
        {#each cnameRecords as record}
            <tr>
                <td>{record.recordType}</td>
                <td>
                    {record.value}
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="MX">
        {#each mxRecords as record}
            <tr>
                <td>{record.recordType}</td>
                <td>
                    <MXRecord record="{record}"/>
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="TXT">
        {#each txtRecords as record}
            <tr>
                <td>{record.recordType}</td>
                <td>
                    {record.value}
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="SRV">
        {#each srvRecords as record}
            <tr>
                <td>{record.recordType}</td>
                <td>
                    <SRVRecord record="{record}"/>
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="NS">
        {#each nsRecords as record}
            <tr>
                <td>{record.recordType}</td>
                <td>
                    <NSRecord record="{record}"/>
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="CAA">
        {#each caaRecords as record}
                <tr>
                    <td>{record.recordType}</td>
                    <td>
                        <CAARecord record="{record}"/>
                    </td>
                </tr>
        {/each}
        </tbody>

        <tbody id="SOA">
        {#each soaRecords as record}
            <tr>
                <td>{record.recordType}</td>
                <td>
                    <SOARecord record="{record}"/>
                </td>
            </tr>
        {/each}
        </tbody>

        <tbody id="Other">
        {#each otherRecords as record}
            <tr>
                <td>{record.recordType}</td>
                <td>
                    {JSON.stringify(record)}
                </td>
            </tr>
        {/each}
        </tbody>

    </table>