import { UrlService } from './../utils/url-service/url.service';
import { Usuario } from './../viewmodel/usuario/usuario';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class LoginService {

    constructor(
        private urlService: UrlService) { }

    autentica(usuario: Usuario): Promise<Boolean> {
        return this.urlService.request("post", this.urlService.pathAuth + "autentica/verificarCredencial", usuario, "10.200.35.67:80/")
            .then(data => {
                return data as Boolean
            })
            .catch(this.handleError);
    }

    getUsuario(usuario: Usuario): Promise<Usuario> {
        return this.urlService.request("get", this.urlService.pathAuth + "autentica/consultar/", usuario.login, "10.200.35.67:80/")
            .then(data => {
                return data as Usuario
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}