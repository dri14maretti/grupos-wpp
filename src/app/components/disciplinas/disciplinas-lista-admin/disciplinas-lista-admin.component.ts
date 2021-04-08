import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Disciplina } from 'src/app/models/disciplina.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DisciplinasDialogComponent } from '../disciplinas-dialog/disciplinas-dialog.component';
import { DisciplinasService } from '../disciplinas.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-disciplinas-lista-admin',
	templateUrl: './disciplinas-lista-admin.component.html',
	styleUrls: ['./disciplinas-lista-admin.component.css'],
})
export class DisciplinasListaAdminComponent implements OnInit {
	disciplinas$: Observable<Disciplina[]>;
	displayedColumns = ['codigo', 'nome', 'prof', 'turma', 'horario', 'edit'];
	loading: boolean = true;

	constructor(
		private disciplinasService: DisciplinasService,
		private router: Router,
		private dialog: MatDialog
	) {
		this.disciplinas$ = this.disciplinasService.disciplinas.valueChanges();
	}

	ngOnInit(): void {
		this.disciplinas$ = this.disciplinasService.disciplinas.valueChanges();
		this.disciplinas$.pipe(take(1)).subscribe(() => (this.loading = false));
		console.log(this.disciplinas$);

		if (!this.disciplinasService.logged) {
			this.router.navigate(['']);
			this.dialog.open(AuthenticationDialogComponent);
		}
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
	}

	showDialog(type: string, disciplina?: Disciplina): void {
		const config: MatDialogConfig<any> = disciplina
			? { data: { disciplina } }
			: {};

		type === 'Formulário'
			? this.dialog.open(DisciplinasDialogComponent, config)
			: this.dialog.open(ConfirmationDialogComponent, config);
	}
}
