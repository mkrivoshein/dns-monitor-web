<script>
    import { onMount } from 'svelte';
    import { authStore } from '../store';
    import AuthGuard from '../components/AuthGuard.svelte';
    let unsub;
    let auth;
    onMount(() => {
        unsub = authStore.subscribe(
            (a) => {
                auth = a;
            }
        );
    });
    $: if(auth){
        auth.checkParams();
    };
    function login(){
        if(auth){
            auth.login();
        }
    }

    function logout(){
        if(auth){
            auth.logout();
        }
    }
</script>
<main>
    <h1>You need to authenticate</h1>
{#if auth}
    <AuthGuard manual="true">
        <button slot="not_authed" on:click={login}>Login</button>
        <button slot="authed" on:click={logout}>Logout</button>
    </AuthGuard>
{/if}
</main>