import { DetalheComponent } from './../detalhe/detalhe.component';
import { BuscaComponent } from './../busca/busca.component';
import { HolderService } from './../utils/holder/holder.service';
import { ValidLoginService } from './../utils/login/valid-login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'template-component',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css']
})

export class TemplateComponent implements OnInit {

    private componentData = null;

    constructor(
        private router: Router,
        private validLoginService: ValidLoginService,
        private holderService: HolderService) { }

    ngOnInit() {
        this.validLoginService.isLogado()
            .then((result: boolean) => {
                if (!result) {
                    this.router.navigate(['./acs2/entrar']);
                }
            });
    }

    buscaEquipamento() {
        this.holderService.whoMenuIsActive = "busca-component";
        this.componentData = {
            component: BuscaComponent,
            inputs: {
                nothing: null
            }
        }
    }

    createDetalhesEquipamento() {
        this.holderService.whoMenuIsActive = "detalhe-component";
        this.componentData = {
            component: DetalheComponent,
            inputs: {
                id: null
            }
        }
    }

    buscaLogs() {
        this.holderService.whoMenuIsActive = "logs-component";
    }

    sair() {
        sessionStorage.clear();
        this.router.navigate(['acs2/entrar']);
    }

}