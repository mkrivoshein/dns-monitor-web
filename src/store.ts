import { writable, derived } from 'svelte/store';
import type {Auth} from "$components/Auth.class";

export const domainRecords = writable(new Map());
export const authStore = writable<Auth>(null);