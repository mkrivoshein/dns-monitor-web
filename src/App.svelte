<script>
    import './Tailwind.css';
    import {onMount} from "svelte";  
    import Footer from './components/Footer.svelte'
    import { Router, links, Route } from "svelte-routing";
    import {
    Header,
    HeaderNav,
    HeaderNavItem,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent,
    Content,
    InlineNotification
    
    
  } from "carbon-components-svelte";
    import "carbon-components-svelte/css/white.css";
    import About from "./routes/About.svelte";
    import Help from "./routes/Help.svelte";
    import Contacts from "./routes/Contacts.svelte";
    import Home from "./routes/Home.svelte";
    import Registration from "./routes/Registration.svelte";
    import Login from "./routes/Login.svelte"; 
    import Keycloak from "keycloak-js"; 
    import "/src/keycloak.json";
	 
   var location = false;
     
   let theme = "white"; // "white" | "g10" | "g80" | "g90" | "g100"
    $: document.documentElement.setAttribute("theme", theme);

    //connection with localhost Keycloak
    const initKeycloak = async () => {
    const config = { url: 'http://localhost:8080/auth', realm: 'Myrealm', clientId: 'dns-monitor-web'};

    const keycloak = new Keycloak(config);
    
    await keycloak
            .init({ onLoad: 'login-required' })
            .then(isAuthenticated => {
                //user is authenticated
             })
             .catch(error => { console.log('keycloak error', error); });
}



let keycloak = new Keycloak();

let loadData = function () {
document.getElementById('username').innerText = keycloak.subject;

let url = 'http://localhost:8080/admin/master/console/#/';

let req = new XMLHttpRequest();
req.open('GET', url, true);
req.setRequestHeader('Accept', 'application/json');
req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);

req.onreadystatechange = function () {
if (req.readyState == 4) {
    if (req.status == 200) {
        alert('Success');
    } else if (req.status == 403) {
        alert('Forbidden');
    }
}
}

req.send();
}


   keycloak.updateToken(70).then((refreshed) => {
     if (refreshed) {
        loadData();
      } else {
        alert('Failed to refresh token');
      }
    })


    let isSideNavOpen = false;


  </script>


<svelte:head>
 
</svelte:head>

<body onload= {initKeycloak}>
  <div class = " relative block"> 
    <div use:links>
    <Router url="">
      <Header  company="GUERY" platformName="DNS Records" 
      bind:isSideNavOpen
        expandedByDefault={false}>
     
        <div slot="skip-to-content">
    </div>  
  
        <HeaderNav>
  
            <div class= "  relative py-4 navbar-nav   items-center pl-0 list-style-none mr-auto" >
              <div class = "flex flex-kol">
                 <HeaderNavItem   text="To main"  href ="/"  />         
               <HeaderNavItem text="About" href="/about"  />
                   <HeaderNavItem text="Help" href="/help" />
                <HeaderNavItem text="Contacts" href="/contacts"/>
            <div class = "fixed right-0 uppercase  px-20 flex flex row">
              <HeaderNavItem text="Sign in "  href ='http://localhost:8080/realms/Myrealm/account' /> 
              <HeaderNavItem text="Sign up "  href ='http://localhost:8080/realms/Myrealm/account' />
            
                 
               </div>
            </div>
          </div>
        </HeaderNav>
      
        <SideNav bind:isOpen={isSideNavOpen}>
          <div class= "   sm:flex sm:flex-row py-4 navbar-nav   items-left pl-10 list-style-none mr-auto" >
            <div class = "flex flex-row">
          
          <SideNavItems>
            <SideNavLink 
            text="Query DNS Records"
            href="/"
            class = "display:flex flex-grow  sm:hidden"
            on:click={() => (isSideNavOpen = !isSideNavOpen)} 
            />
            <SideNavLink
              text="About"
              href="/about"
              class = "display:flex flex-grow   sm:hidden  "
              on:click={() => (isSideNavOpen = !isSideNavOpen)} 
            />
            <SideNavLink
              text="Help"
              href="/help"
              class = "display:flex flex-grow  sm:hidden"
              on:click={() => (isSideNavOpen = !isSideNavOpen)} 
            />
            <SideNavLink
            text="Contacts"
            href="/contacts"
            class = "display:flex flex-grow  sm:hidden"
            on:click={() => (isSideNavOpen = !isSideNavOpen)} 
          />
         
          <SideNavLink
          text="Sign in"
          href="http://localhost:8080/realms/Myrealm/account"
          class = "display:flex flex-grow  uppercase  sm:hidden"
          on:click={() => (isSideNavOpen = !isSideNavOpen)} 
        />
        <SideNavLink
        text="Sign up"
        href="http://localhost:8080/realms/Myrealm/account"
        class = "display:flex flex-grow  uppercase sm:hidden"
        on:click={() => (isSideNavOpen = !isSideNavOpen)} 
           />
          </SideNavItems>
          </div>
          </div>
        </SideNav>
        
      </Header>
  
      <Content>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Route path="/contacts" component={Contacts} />
        <!--<Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />-->
        <Route let:location>
          <InlineNotification
            hideCloseButton
            title="Error:"
            subtitle={`No route found for this route}`}
          />
        </Route>
        <SkipToContent  class = "hidden"/>
      </Content>
    </Router>
  </div>
 
 
</div>

<slot />

<main class = "absolute block f-full">
  
</main>

</body>
<Footer/>