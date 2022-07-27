import {domainRecords} from './store';
import axios from "axios";

const API_URL = `dns/`

export class DnsClient {
    fqdn(subDomain: string, domain: string): string {
        let fqdn;
        if (subDomain === '') {
            fqdn = domain;
        } else {
            fqdn = subDomain + '.' + domain;
        }
        return fqdn;
    }

    async updateDomainRecords(domain: string, subDomains: string[], errorHandler: (error) => void, successHandler: () => void) {
        const commands: Promise<void>[] = [];
        for (let subDomain of subDomains) {
            let fqdn = this.fqdn(subDomain, domain);
            const command = this.getDomainRecords(fqdn).then(records => {
                domainRecords.update(data => {
                    // data.set(subDomain, records);
                    // return new Map<string, Array<any>>([[fqdn, records]]);
                    data.set(fqdn, records);
                    return data;
                });
            });
            commands.push(command);
        }

        Promise.all(commands).catch(errorHandler).finally(successHandler);
    }

    private getDomainRecords(fqdn: string): Promise<Array<any>> {
        let url = `${API_URL}${fqdn}`;
        return axios
            .get(url)
            .then(response => {
                console.log('response.JSON:', {
                    message: 'Request received',
                    data: response.data
                });
                return response.data.records;
            })
    }
}

let dnsClient: DnsClient = new DnsClient();
export default dnsClient;

export let subDomains: string[] = ["",
    "www",
    "_dmarc", "sip", "autodiscover", "lyncdiscover", "enterpriseenrollment", "enterpriseregistration", "_sipfederationtls._tcp", "_sip._tls", "pm-bounces",
    "_domainconnect",
    "_acme-challenge",
    "_domainkey", "default._domainkey", "email._domainkey", "default._bimi",
    "webmail", "email", "pop3", "smtp",
    "ftp", "sftp", "dns", "ddns",
    "staging", "dev", "www.staging", "test",
    "cdn", "status", "uptime",
    "backup",
];