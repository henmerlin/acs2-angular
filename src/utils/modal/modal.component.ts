import { SipGetComponent } from './../comandos/consultas/sip/sip.component';
import { SipSetComponent } from './../comandos/acoes/sip/sip.component';
import { HolderService } from './../holder/holder.service';
import { HistoriaComponent } from './../comandos/consultas/historia/historia.component';
import { DmzComponent } from './../comandos/consultas/dmz/dmz.component';
import { PortMappingComponent } from './../comandos/consultas/port-mapping/port-mapping.component';
import { XdslComponent } from './../comandos/consultas/xdsl/xdsl.component';
import { LanHostComponent } from './../comandos/consultas/lan-host/lan-host.component';
import { InterfaceStaticsComponent } from './../comandos/consultas/interface-statics/interface-statics.component';
import { WanComponent } from './../comandos/consultas/wan/wan.component';
import { DhcpComponent } from './../comandos/acoes/dhcp/dhcp.component';
import { ServiceClassComponent } from './../comandos/acoes/service-class/service-class.component';
import { AuthPPPoEComponent } from './../comandos/acoes/auth-pppoe/auth-pppoe.component';
import { WifiComponent } from './../comandos/acoes/wifi/wifi.component';
import { PingComponent } from './../comandos/acoes/ping/ping.component';
import { FactoryResetComponent } from './../comandos/acoes/factory-reset/factory-reset.component';
import { ResetComponent } from './../comandos/acoes/reset/reset.component';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-component',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css']
})

export class ModalComponent implements OnInit {

    @Input() nomeDoBtn: string;
    @Input() styleBtn: string;
    @Input() component: any;

    private modalOptions: {
        backdrop?: boolean | 'static',
        size?: 'sm' | 'lg'
    }

    constructor(
        private modalService: NgbModal,
        public holderService: HolderService) { }

    ngOnInit() {
        this.whatComponentAction();
        this.whatComponentSearch();
    }

    whatComponentAction() {
        switch (this.component) {
            case "reset-component":
                this.component = ResetComponent;
                this.setModalOptions("static", "sm");
                break;
            case "factory-reset-component":
                this.component = FactoryResetComponent
                this.setModalOptions("static", "sm");
                break;
            case "ping-component":
                this.component = PingComponent
                this.setModalOptions("static");
                break;
            case "wifi-component":
                this.component = WifiComponent
                this.setModalOptions("static");
                break;
            case "auth-pppoe-component":
                this.component = AuthPPPoEComponent
                this.setModalOptions("static");
                break;
            case "sip-set-component":
                this.component = SipSetComponent
                break;
            case "service-class-component":
                this.component = ServiceClassComponent
                this.setModalOptions("static");
                break;
            case "dhcp-component":
                this.component = DhcpComponent
                this.setModalOptions("static");
                break;
        }
    }

    whatComponentSearch() {
        switch (this.component) {
            case "wan-component":
                this.component = WanComponent
                this.setModalOptions("static");
                break;
            case "interface-statics-component":
                this.component = InterfaceStaticsComponent
                this.setModalOptions("static", "lg");
                break;
            case "lan-host-component":
                this.component = LanHostComponent
                this.setModalOptions("static", "lg");
                break;
            case "xdsl-component":
                this.component = XdslComponent
                this.setModalOptions("static");
                break;
            case "port-mapping-component":
                this.component = PortMappingComponent
                this.setModalOptions("static", "lg")
                break;
            case "sip-get-component":
                this.component = SipGetComponent
                break;
            case "dmz-component":
                this.component = DmzComponent
                break;
            case "historia-component":
                this.component = HistoriaComponent
                break;
        }
    }

    setModalOptions(bdname: boolean | 'static', sz?: 'sm' | 'lg') {
        this.modalOptions = {
            backdrop: bdname,
            size: sz
        }
    }

    open() {
        if (this.holderService.checkOnline) {
            this.modalService.open(this.component, this.modalOptions)
        }
    }

}