<script lang="ts">
    import { onMount } from "svelte";
    import { Auth } from "$components/Auth.class";
    import { authStore } from "../store";
    import keycloak_config from '../keycloak.json'
    import Nav from "../components/Nav.svelte";
    onMount(() => {
        authStore.set(
            new Auth(keycloak_config)
        );
        console.log('Inside +layout.onMount()');
    });
    export let segment: string;
</script>

<style>
    main {
        position: relative;
        max-width: 56em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>

<Nav {segment} />

<main>
    <slot />
</main>
