import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Disciplina } from 'src/app/models/disciplina.model';
import { DisciplinasDialogComponent } from '../disciplinas-dialog/disciplinas-dialog.component';
import { DisciplinasService } from '../disciplinas.service';

@Component({
	selector: 'app-disciplinas-lista-admin',
	templateUrl: './disciplinas-lista-admin.component.html',
	styleUrls: ['./disciplinas-lista-admin.component.css'],
})
export class DisciplinasListaAdminComponent implements OnInit {
	disciplinas$: Observable<Disciplina[]>;
	displayedColumns = ['codigo', 'nome', 'prof', 'turma', 'horario', 'edit'];
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

		this.disciplinas$ = this.disciplinasService.disciplinas.valueChanges();
	}

	ngOnInit(): void {
		this.disciplinas$ = this.disciplinasService.disciplinas.valueChanges();
		this.disciplinas$.pipe(take(1)).subscribe(() => (this.loading = false));
		console.log(this.disciplinas$);
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

	editDisciplina(): void {}

	// onPerformTask(task: Task): void {
	// 	task.done = !task.done;
	// 	this.taskService.update(task);
	// }

	showDialog(disciplina?: Disciplina): void {
		const config: MatDialogConfig<any> = disciplina
			? { data: { disciplina } }
			: {};
		this.dialog.open(DisciplinasDialogComponent, config);
	}

	onDelete(disciplina: Disciplina): void {
		this.disciplinasService.delete(disciplina);
	}

	// onDelete(task: Task): void {
	// 	this.taskService.delete(task);
	// }
}
