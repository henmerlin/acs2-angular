import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { PPPoECredentials } from './../../../../viewmodel/pppoecredentials/pppoecredentials';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthPPPoEService } from './auth-pppoe.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'auth-pppoe-component',
    templateUrl: 'auth-pppoe.component.html',
    styleUrls: ['auth-pppoe.component.css'],
    providers: [AuthPPPoEService, ToastyComponent]
})

export class AuthPPPoEComponent implements OnInit {

    public pppoecred: PPPoECredentials;
    public searching: boolean = false;
    public btnName: string = "Modificar";
    public btnDisabled: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private authPPPoEService: AuthPPPoEService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() {
        this.getPPPoECredentials();
    }

    public getPPPoECredentials() {
        this.searching = true;
        this.authPPPoEService.getPPPoECredentials(this.holderService.equipamento)
            .then(data => {
                this.pppoecred = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.activeModal.close();
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            })
    }

    public setPPPoECredentials() {
        if (this.pppoecred && !this.btnDisabled) {
            this.btnName = "Aguarde";
            this.btnDisabled = true;
            this.authPPPoEService.setPPPoECredentials(this.holderService.equipamento, this.pppoecred)
                .then(data => {
                    this.btnName = "Modificar";
                    this.btnDisabled = false;
                    if (data) {
                        this.callToasty("Sucesso.", "Modificado com sucesso.", "success", 10000);
                    } else {
                        this.callToasty("Ops, aconteceu algo.", "Comando voltou negativo, não modificado.", "error", 10000);
                    }
                }, error => {
                    this.btnName = "Modificar";
                    this.btnDisabled = false;
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                });
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