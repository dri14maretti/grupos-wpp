import { DisciplinasService } from './../../disciplinas/disciplinas.service';
import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	procurarDisciplina: string;

	constructor(private disciplinasService: DisciplinasService) {
		this.procurarDisciplina = '';
	}

	ngOnInit(): void {}
}
