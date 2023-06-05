import { writable } from 'svelte/store';
import { User } from "$components/User.class";
import Keycloak from "keycloak-js";
import type {KeycloakInitOptions, KeycloakFlow, KeycloakOnLoad, KeycloakConfig} from "keycloak-js";

//Template for local storage mapping
export type localStorageMapping = {"access_token": string, "refresh_token": string, "exp": string};

export class Auth {
    //The actual keycloak connector
    private keycloak: Keycloak;
    //Used mapping
    private localStorageMapping: localStorageMapping;
    //This keeps track whether Auth and Role guards can call buildUser method
    private initialized: any;

    //This class builds the actual User from access token
    public buildUser(): User {
        console.log('Bearer ' + this.keycloak.token)

        let parsed = this.keycloak.tokenParsed;
        if(!parsed){
            return null;
        }
        //If you also want the resource roles, just concat them here
        return new User(parsed["sub"], parsed["preferred_username"], parsed["given_name"], parsed["family_name"], parsed["realm_access"]["roles"]);
    };

    public constructor(config: KeycloakConfig, localStorageMapping?: localStorageMapping) {
        //Keycloak class is not defined, because we add that library into the template.html
        //@ts-ignore
        this.keycloak = new Keycloak(config);

        this.initialized = writable(false);

        if(localStorageMapping){
            this.localStorageMapping = localStorageMapping;
        }else{
            this.localStorageMapping = {
                "access_token": "access_token",
                "refresh_token": "refresh_token",
                "exp": "exp"
            };
        }

        //Check, if user is authenticated
        if (localStorage.getItem(this.localStorageMapping.access_token) !== null) {
            this.refresh();
        }
    }

    public isInitialized(): any{
        return this.initialized;
    }

    //Makes the initialization process with given parameters
    private init(initParams: KeycloakInitOptions = {}) {
        this.keycloak
            .init(initParams)
            .then((authenticated) => {
                if (authenticated) {
                    console.log('authenticated!!!')
                    localStorage.setItem(
                        this.localStorageMapping.access_token,
                        this.keycloak.token
                    );
                    localStorage.setItem(
                        this.localStorageMapping.refresh_token,
                        this.keycloak.refreshToken
                    );
                    localStorage.setItem(this.localStorageMapping.exp, String(this.keycloak.tokenParsed["exp"]));
                    //Setting the update (refresh) of our token
                    this.keycloak.updateToken(5).then((refreshed) => {
                        if (refreshed) {
                            localStorage.setItem(
                                this.localStorageMapping.access_token,
                                this.keycloak.token
                            );
                            localStorage.setItem(
                                this.localStorageMapping.refresh_token,
                                this.keycloak.refreshToken
                            );
                            localStorage.setItem(this.localStorageMapping.exp, String(this.keycloak.tokenParsed["exp"]));
                        }
                    });
                } else {
                    console.log('not authenticated!!!')
                }
                this.initialized.set(true);
            })
            .catch(function (e) {
                console.error(e);
            });
        this.keycloak.onTokenExpired = () => {
            //Setting the update (refresh) of our token
            this.keycloak.updateToken(5).then((refreshed) => {
                if (refreshed) {
                    localStorage.setItem(
                        this.localStorageMapping.access_token,
                        this.keycloak.token
                    );
                    localStorage.setItem(
                        this.localStorageMapping.refresh_token,
                        this.keycloak.refreshToken
                    );
                    localStorage.setItem(this.localStorageMapping.exp, String(this.keycloak.tokenParsed["exp"]));
                }
            });
        };
    }

    // Builds initial parameters and add the access token and refresh token.
    // You can also use the check-sso. More in official docs.
    private buildInitParams(onLoad: KeycloakOnLoad = 'login-required', silentCheckSsoRedirectUri?: string, redirectUri: string = 'http://localhost:3000/history'): KeycloakInitOptions {
        return {
            adapter : 'default',
            onLoad,
            token: localStorage.getItem(this.localStorageMapping.access_token),
            refreshToken: localStorage.getItem(this.localStorageMapping.refresh_token),
            checkLoginIframe: true, //TODO: should be false
            redirectUri,
            silentCheckSsoRedirectUri,
            flow: 'implicit' //hybrid
        };
    }

    public login() {
        this.init(this.buildInitParams());
    }

    public refresh() {
        this.init(this.buildInitParams());
    }

    public logout() {
        localStorage.removeItem(this.localStorageMapping.access_token);
        localStorage.removeItem(this.localStorageMapping.refresh_token);
        localStorage.removeItem(this.localStorageMapping.exp);
        this.keycloak.logout();
    }

    //Checks whether there is the back redirect from auth server
    public checkParams(){
        let params = (new URL(document.location.href.replace("#", "?"))).searchParams;
        if(params.get("state") && params.get("session_state") && params.get("code")){
            this.init(this.buildInitParams());
        }
    }
}