import { DisciplinasService } from './../disciplinas.service';
import { Disciplina } from './../../../modules/disciplina.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-disciplinas-lista',
	templateUrl: './disciplinas-lista.component.html',
	styleUrls: ['./disciplinas-lista.component.css'],
})
export class DisciplinasListaComponent implements OnInit {
	disciplinas$: Observable<Disciplina[]>;
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
			horario: ';',
		};

		this.disciplinas$ = this.disciplinasService.disciplinas.valueChanges();
	}

	ngOnInit(): void {
		this.disciplinas$ = this.disciplinasService.disciplinas.valueChanges();
		this.disciplinas$.pipe(take(1)).subscribe(() => (this.loading = false));
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

	// onPerformTask(task: Task): void {
	// 	task.done = !task.done;
	// 	this.taskService.update(task);
	// }

	// showDialog(task?: Task): void {
	// 	const config: MatDialogConfig<any> = task ? { data: { task } } : {};
	// 	this.dialog.open(TaskDialogComponent, config);
	// }

	// onDelete(task: Task): void {
	// 	this.taskService.delete(task);
	// }
}
