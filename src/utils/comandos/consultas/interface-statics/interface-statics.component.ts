import { ToastyComponent } from './../../../toasty/toasty.component';
import { HolderService } from './../../../holder/holder.service';
import { InterfaceStatic } from './../../../../viewmodel/interfacestatic/interfacestatic';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InterfaceStaticsService } from './interface-static.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'interface-statics-component',
    templateUrl: 'interface-statics.component.html',
    styleUrls: ['interface-statics.component.css'],
    providers: [InterfaceStaticsService, ToastyComponent]
})

export class InterfaceStaticsComponent implements OnInit {

    public intStatic: InterfaceStatic[];
    public searching: boolean = false;

    constructor(
        public activeModal: NgbActiveModal,
        private interfaceStaticsService: InterfaceStaticsService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() {
        this.getInterfaceStatistics();
    }

    public getInterfaceStatistics() {
        this.intStatic = null;
        this.searching = true;
        this.interfaceStaticsService.getInterfaceStatistics(this.holderService.equipamento)
            .then(data => {
                this.intStatic = data;
                this.searching = false;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                this.searching = false;
            });
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