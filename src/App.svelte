<script>
    import './Tailwind.css';
    import {onMount} from "svelte";
    import {domainRecords} from './store.ts';
    import Footer from './components/Footer.svelte'
    import dnsClient, {subDomains} from './DnsClient'


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
    InlineNotification,
  } from "carbon-components-svelte";

  




  import About from "./routes/About.svelte";
  import Help from "./routes/Help.svelte";
  import Contacts from "./routes/Contacts.svelte";
  import Home from "./routes/Home.svelte";
  import Authorization from "./routes/Authorization.svelte";
  import Login from "./routes/Login.svelte";


  let isSideNavOpen = false;




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
  <link
  rel="stylesheet"
  href="https://unpkg.com/carbon-components-svelte/css/white.css"
/>
</svelte:head>


<div class = " container w-screen ">

   
    <div use:links>
    <Router url="">
      <Header
      
        bind:isSideNavOpen
        expandedByDefault={false}
      
      >
        <div slot="skip-to-content">
        
  
    </div>  
   
   
        <HeaderNav class = " relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
                  
            <div class= "  hidden  sm:flex sm:flex-row py-4 navbar-nav   items-left pl-0 list-style-none mr-auto" >
              <div class = "flex flex-row">
                 <HeaderNavItem   text="Query DNS Records "  href ="/" class = "uppercase font-bold bg-gray-100 text-gray-500 " />         
               <HeaderNavItem text="About" href="/about"  />
                   <HeaderNavItem text="Help" href="/help" />
                <HeaderNavItem text="Contacts" href="/contacts"/>
            <div class = "absolute inset-y-0 right-0 flex flex-row">
                 <HeaderNavItem text="Sign in "  href ="/login"  />       
              <HeaderNavItem text="Sign up" href="/auth" />
               </div>
            </div>
          </div>
        </HeaderNav>

        <SideNav bind:isOpen={isSideNavOpen} class ="relative display:flex flex-grow w-full md:display-none collapse navbar-collapse">
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
          href="/login"
          class = "display:flex flex-grow  sm:hidden"
          on:click={() => (isSideNavOpen = !isSideNavOpen)} 
        />
        <SideNavLink
        text="Sign up"
        href="/auth"
        class = "display:flex flex-grow  sm:hidden"
        on:click={() => (isSideNavOpen = !isSideNavOpen)} 
           />
          </SideNavItems>
        </SideNav>
        
      </Header>
  
      <Content>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/login" component={Login} />
        <Route path="/auth" component={Authorization} />
        <Route let:location>
          <InlineNotification
            hideCloseButton
            title="Error:"
            subtitle={`No route found for ${location.pathname}`}
          />
        </Route>
        <SkipToContent  class = "hidden"/>
      </Content>
    </Router>
  </div>


</div>

<slot />

<main class = " container w-full ">
   

</main>
<Footer/>