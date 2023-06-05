<script>
    import './Tailwind.css';
    import Footer from './components/Footer.svelte'
    import { Router, links, Route } from 'svelte-routing'
    import Home from './routes/Home.svelte'
    import History from './routes/History.svelte'
    import Login from './routes/Login.svelte'

    import { onMount } from "svelte";
    import { Auth } from "$components/Auth.class";
    import { authStore } from './store.ts';
    import keycloak_config from './keycloak.json'
    onMount(() => {
        authStore.set(
            new Auth(keycloak_config)
        );
        console.log('Auth has been created');
    });

    //connection with localhost Keycloak
    const initKeycloak = async () => {
        console.log('inside initKeycloak()')
        // authStore.set(
        //     new Auth(keycloak_config)
        // );
        // console.log('Auth has been created');

        // const config = {url: 'https://login.bluestar.host/auth', realm: 'External', clientId: 'dns-monitor-web'};
        //
        // const keycloak = new Keycloak(config);
        //
        // await keycloak
        //     .init({onLoad: 'login-required'})
        //     .then(isAuthenticated => {
        //         //user is authenticated
        //         console.log('user is authenticated');
        //     })
        //     .catch(error => {
        //         console.log('keycloak error', error);
        //     });
    }

    // let keycloak = new Keycloak();
    // let loadData = function () {
    //     document.getElementById('username').innerText = keycloak.subject;
    //
    //     let url = 'http://localhost:8080/admin/master/console/#/';
    //
    //     let req = new XMLHttpRequest();
    //     req.open('GET', url, true);
    //     req.setRequestHeader('Accept', 'application/json');
    //     req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
    //
    //     req.onreadystatechange = function () {
    //         if (req.readyState == 4) {
    //             if (req.status == 200) {
    //                 alert('Success');
    //             } else if (req.status == 403) {
    //                 alert('Forbidden');
    //             }
    //         }
    //     }
    //
    //     req.send();
    // }

    // keycloak.updateToken(70)
    //     .then((refreshed) => {
    //         if (refreshed) {
    //             console.log('Keycloak token refreshed');
    //         } else {
    //             alert('Failed to refresh token');
    //         }
    //     })
    //     .catch(error => {
    //         console.log('keycloak error', error);
    //     });
</script>

<body onload= {initKeycloak}>
<!--<body>-->
<div use:links>
    <Router url="">

        <!-- Navbar goes here -->
        <nav class="bg-white shadow-lg">
            <div class="w-full mx-auto px-4">
                <div class="flex justify-between">
                    <div class="flex space-x-7">
                        <div>
                            <!-- Website Logo -->
                            <a href="/" class="flex items-center py-4 px-2">
                                <img src="favicon.svg" alt="Logo" class="h-16 w-16 mr-2">
                                <span class="text-blue-500 text-2xl md:text-xl lg:text-2xl font-bold p-4">DNS Monitor</span>
                            </a>

                        </div>
                        <!-- Primary Navbar items -->
                        <div class="hidden md:flex items-center space-x-1">
                            <a href = "/" class="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"> Home</a>

                            <!-- <a  href="/about" class="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">About </a>
                            <a href="/help" class="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Help</a>
                            <a href="/contacts" class="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Contacts</a>-->
                        </div>
                    </div>
                    <!-- Secondary Navbar items -->
                    <div class="hidden md:flex items-center space-x-3 ">
                        <a href="/login" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-400 hover:text-blue-500 transition duration-300">Log In</a>
                        <a href="/login" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-400 hover:text-blue-500 transition duration-300">Sign Up</a>
                    </div>
                    <!-- Mobile menu button -->
                    <div class="md:hidden flex items-center">
                        <button class="outline-none mobile-menu-button">
                            <svg class=" w-6 h-6 text-gray-500 hover:text-blue-500 "
                                 x-show="!showMenu"
                                 fill="none"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- mobile menu -->
            <div class="hidden mobile-menu">
                <ul class="">
                    <li class="active"><a href="/" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
                    <li><a href="/about" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
                    <li><a href="/help" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Help</a></li>
                    <li><a href="/contacts" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contacts </a></li>
                    <li><a href="http://localhost:8080/realms/Myrealm/account" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Log In</a></li>
                    <li> <a href="http://localhost:8080/realms/Myrealm/account" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Sign Up</a></li>
                </ul>
            </div>
            <script>
                const btn = document.querySelector("button.mobile-menu-button");
                const menu = document.querySelector(".mobile-menu");

                btn.addEventListener("click", () => {
                    menu.classList.toggle("hidden");
                });
            </script>
        </nav>

        <Route path="/" component={Home} />
        <Route path="/history" component={History} />
        <Route path="/login" component={Login} />
    </Router>
    <slot></slot>


    <main class = "absolute block f-full">

    </main>
</body>
<Footer/>