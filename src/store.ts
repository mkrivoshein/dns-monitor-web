import {writable, derived} from 'svelte/store';

export const domainRecords = writable(new Map());