export class SipIn {
    directoryNumber: string;
    authUserName: string;
    authPassword: string;
    proxyServer: string;
    registrarServer: string;
    userAgentDomain: string;
    outboundProxy: string;
    phyReferenceList: string = "1";
    t38Enable: boolean = false;
}