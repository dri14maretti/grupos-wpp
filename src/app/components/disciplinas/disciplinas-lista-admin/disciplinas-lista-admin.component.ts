import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { Disciplina } from 'src/app/models/disciplina.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DisciplinasDialogComponent } from '../disciplinas-dialog/disciplinas-dialog.component';
import { DisciplinasService } from '../disciplinas.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-disciplinas-lista-admin',
	templateUrl: './disciplinas-lista-admin.component.html',
	styleUrls: ['./disciplinas-lista-admin.component.css'],
})
export class DisciplinasListaAdminComponent implements OnInit {
	displayedColumns = ['codigo', 'nome', 'prof', 'turma', 'horario', 'edit'];

	dadosFiltrados: Disciplina[] = [];
	dadosFiltrados$!: Observable<Disciplina[]>;
	dadosMostra: Disciplina[] = [];
	dadosMostra$!: Observable<Disciplina[]>;

	loading: boolean = true;

	myControl = new FormControl();
	constructor(
		private disciplinasService: DisciplinasService,
		private router: Router,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.dadosMostra$ = this.disciplinasService.disciplinas.valueChanges();
		this.dadosMostra$.subscribe((dados) => {
			// Começa a parte de filtro por CPF
			this.dadosMostra = dados;
			this.dadosFiltrados = dados;
		});

		this.dadosMostra$.pipe(take(1)).subscribe(() => (this.loading = false));

		this.dadosFiltrados$ = this.myControl.valueChanges.pipe(
			startWith(''),
			map((value) => this._filter(value))
		);
		this.dadosFiltrados$.subscribe((dadosFiltrados) => {
			this.dadosFiltrados = dadosFiltrados;
		});

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

	_filter(valorFiltro: string): Disciplina[] {
		let returnArray: Disciplina[] = [];
		if (this.loading) {
			return this.dadosMostra;
		}
		if (valorFiltro === '') {
			return this.dadosMostra;
		}

		if (this.dadosMostra != null) {
			returnArray = this.dadosMostra.filter((value) => {
				return (
					value.codigo.toLowerCase().indexOf(valorFiltro.toLowerCase()) >= 0 ||
					value.nome.toLowerCase().indexOf(valorFiltro.toLowerCase()) >= 0
				);
			});
		}
		return returnArray;
	}
}
