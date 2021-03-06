import { ToastyComponent } from './../../../toasty/toasty.component';
import { Wifi } from './../../../../viewmodel/wifi/wifi';
import { HolderService } from './../../../holder/holder.service';
import { WifiService } from './wifi.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wifi-component',
    templateUrl: 'wifi.component.html',
    styleUrls: ['wifi.component.css'],
    providers: [WifiService, ToastyComponent]
})

export class WifiComponent implements OnInit {

    public wifi: Wifi;
    public searching: boolean = false;
    public btnSetWifi: boolean = false;
    public nomeBtn: string = "Modificar";

    constructor(
        public activeModal: NgbActiveModal,
        private wifiService: WifiService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() {
        this.getWifi();
    }

    public getWifi() {
        this.searching = true;
        this.btnSetWifi = true;
        this.wifiService.getWifi(this.holderService.equipamento)
            .then(data => {
                this.wifi = data;
                this.searching = false;
                this.btnSetWifi = false;
            }, error => {
                this.searching = false;
                this.btnSetWifi = false;
                this.activeModal.close();
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    public setWifi() {
        if (this.wifi) {
            this.btnSetWifi = true;
            this.nomeBtn = "Aguarde";
            this.wifiService.setWifi(this.holderService.equipamento, this.wifi)
                .then(data => {
                    this.wifi = data;
                    this.callToasty("Successo", "Alterações realizadas com sucesso.", "success", 10000);
                    this.nomeBtn = "Modificar";
                    this.btnSetWifi = false;
                }, error => {
                    this.nomeBtn = "Modificar";
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                    this.btnSetWifi = false;
                });
        }
    }

    private callAlert(msg, type) {
        this.holderService.alertOn = true;
        this.holderService.alertInfo = {
            alertType: type,
            alertMsg: msg
        }
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }
}