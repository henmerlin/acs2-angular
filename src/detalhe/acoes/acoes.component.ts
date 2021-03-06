import { HolderService } from './../../utils/holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'acoes-component',
    templateUrl: 'acoes.component.html',
    styleUrls: ['acoes.component.css']
})

export class AcoesComponent implements OnInit {

    @Input() isModem: boolean;

    constructor(
        public holderService: HolderService) { }

    ngOnInit() {
    }

}