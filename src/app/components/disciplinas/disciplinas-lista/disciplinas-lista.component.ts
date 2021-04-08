import { DisciplinasService } from './../disciplinas.service';
import { Disciplina } from './../../../models/disciplina.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';

@Component({
	selector: 'app-disciplinas-lista',
	templateUrl: './disciplinas-lista.component.html',
	styleUrls: ['./disciplinas-lista.component.css'],
})
export class DisciplinasListaComponent implements OnInit {
	disciplinasFiltradas$: Observable<Disciplina[]>;
	displayedColumns = ['codigo', 'nome', 'prof', 'turma', 'horario', 'link'];
	selectedDisciplina: Disciplina;
	loading: boolean = true;

	constructor(
		private disciplinasService: DisciplinasService,

		private dialog: MatDialog
	) {
		this.selectedDisciplina = {
			codigo: '',
			nome: '',
			link: '',
			professor: '',
			turma: 0,
			horario: '',
		};

		this.disciplinasFiltradas$ = this.disciplinasService.disciplinasFiltradas$;
	}

	ngOnInit(): void {
		this.disciplinasFiltradas$
			.pipe(take(1))
			.subscribe(() => (this.loading = false));
		console.log(
			this.disciplinasFiltradas$.subscribe((val) => console.log(val))
		);
	}

	// Copia a mensagem que está salva em disciplina.link para a clipboard do usuário
	copyMessage(val: string) {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = val;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);

		this.disciplinasService.showMessage(
			'Copiado para a área de transferência!'
		);
	}

	openAuthentication(): void {
		this.dialog.open(AuthenticationDialogComponent);
	}
}
