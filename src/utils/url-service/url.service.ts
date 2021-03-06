import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {

    //Modificar IPs 
    public urlIp = "10.200.35.67:80/";  // Produção e restante dos pjs para o path
    // IPS: 
    //  "http://10.40.195.81:8080/"; QA
    //  "http://10.200.35.67:80/"; Produção
    //  "http://dprcuradm0111:8080/"; CRM
    
    public pathAcs = "acs/";
    public pathAuth = "efikaAuth/";

    //Request Options *Não Mecher*
    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });
    public url = "http://" + this.urlIp;

    constructor(private http: Http) { }

    //Todo mundo faz a chamada para o request passando os parametros.
    public request(rqst: string, command: string, _data?: any, otherUrl?: string) {
        //Verifica se url é outra
        this.modUrl(otherUrl);
        switch (rqst) {
            case "get":
                return this.httpGetRequest(command, _data);
            case "post":
                return this.httpPostRequest(command, _data);
        }
    }

    private httpPostRequest(command: string, _data: any) {
        const url = `${this.url}` + command;
        return this.http.post(url, JSON.stringify(_data), this.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                this.modUrl(this.urlIp);
                return response.json()
            })
            .catch(this.handleError);
    }

    private httpGetRequest(command: string, _data?: any) {
        let rstlink;
        if (_data) {
            rstlink = command + _data;
        } else {
            rstlink = command;
        }
        const url = `${this.url}` + rstlink;
        return this.http.get(url, this.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                this.modUrl(this.urlIp);
                return response.json()
            })
            .catch(this.handleError);
    }

    private modUrl(l) {
        if (l) {
            this.url = "http://" + l;
        }
    }

    private handleError(error: any): Promise<any> {
        //console.error('Ocorreu o seguinte erro: ', error); // for demo purposes only
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Timeout",
                mError: "Tempo de busca excedido, por favor realize a busca novamente, caso o problema persista informe ao administrador do sistema."
            }
        } else {
            let erJson: any;
            erJson = error.json();
            er = {
                tError: "",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }

}