<script>
    import { onMount } from "svelte";
    import Record from "./Record.svelte";
    import {domainRecords} from "../store.ts";

    let records;

    domainRecords.subscribe(value => {
        records = value;
    });

</script>

<ul>
    {#each records as record}
        <li>
            <Record record="{record}"/>
        </li>
    {:else}
        No data yet
    {/each}
</ul>