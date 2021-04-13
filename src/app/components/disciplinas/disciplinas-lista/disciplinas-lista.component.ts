import { DisciplinasService } from './../disciplinas.service';
import { Disciplina } from './../../../models/disciplina.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map, startWith, take } from 'rxjs/operators';
import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'app-disciplinas-lista',
	templateUrl: './disciplinas-lista.component.html',
	styleUrls: ['./disciplinas-lista.component.css'],
})
export class DisciplinasListaComponent implements OnInit {
	dadosFiltrados: Disciplina[] = [];
	dadosFiltrados$!: Observable<Disciplina[]>;
	dadosMostra: Disciplina[] = [];
	dadosMostra$!: Observable<Disciplina[]>;

	displayedColumns = ['codigo', 'nome', 'turma', 'prof', 'horario', 'link'];

	loading: boolean = true;

	myControl = new FormControl();

	constructor(
		private disciplinasService: DisciplinasService,

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
