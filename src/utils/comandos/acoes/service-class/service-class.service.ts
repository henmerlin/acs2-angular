import { ServiceClass } from './../../../../viewmodel/serviceclass/serviceclass';
import { Equipamento } from './../../../../viewmodel/equipamento/equipamento';
import { UrlService } from './../../../url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class ServiceClassService {

    constructor(
        private urlService: UrlService) { }

    public getServiceClass(device: Equipamento): Promise<ServiceClass> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, executor: string };
        _data = { device: device, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/getServiceClass", _data)
            .then(data => {
                return data as ServiceClass
            })
            .catch(this.handleError);
    }

    public setServiceClass(device: Equipamento, service: ServiceClass): Promise<Boolean> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { device: Equipamento, service: ServiceClass, executor: string };
        _data = { device: device, service: service, executor: usr.usr }
        return this.urlService.request("post", this.urlService.pathAcs + "device/setServiceClass", _data)
            .then(data => {
                return data as Boolean
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}