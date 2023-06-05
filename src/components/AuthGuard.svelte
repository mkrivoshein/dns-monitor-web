<script>
    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    import { authStore } from '../store';

    let auth;
    let unsub;
    let initialized;
    $: if(auth) {
        auth.initialized.subscribe(i => {
            initialized = i;
        });
    };
    $: user = (initialized) ? auth.buildUser() : null;
    let forceLogin = false;
    let manual = false;
    export {
        forceLogin,
        manual
    }
    onMount(() => {
        unsub = authStore.subscribe(value => {
            auth = value;
        });
        if(forceLogin && user === null){
            console.log('before navigate()')
            console.log('user: ' + auth.buildUser())
            navigate("/login", { replace: true });
        }
    });
</script>

{#if user && manual}
    <slot name="authed"></slot>
{:else if !user && manual}
    <slot name="not_authed"></slot>
{:else if user && !manual}
    <slot></slot>
{/if}