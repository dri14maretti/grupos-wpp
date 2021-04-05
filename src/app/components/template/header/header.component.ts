import { DisciplinasService } from './../../disciplinas/disciplinas.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	procurarDisciplina: string;
	@Output() criterioBusca = new EventEmitter<String>();

	constructor(private disciplinasService: DisciplinasService) {
		this.procurarDisciplina = '';
	}

	ngOnInit(): void {}

	searchThis(): void {
		// Serve para mandar a string que está sendo procurada a cada vez que ela é modificada para o disciplinas.service
		this.disciplinasService.procurarDisciplina = this.procurarDisciplina;
		console.log(this.disciplinasService.procurarDisciplina);
	}
}
