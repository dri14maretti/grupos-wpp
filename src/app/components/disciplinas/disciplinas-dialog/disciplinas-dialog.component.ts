import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disciplina } from 'src/app/models/disciplina.model';
import { DisciplinasService } from '../disciplinas.service';

@Component({
	selector: 'app-disciplinas-dialog',
	templateUrl: './disciplinas-dialog.component.html',
	styleUrls: ['./disciplinas-dialog.component.css'],
})
export class DisciplinasDialogComponent implements OnInit {
	dialogTitle: string = 'Nova Tarefa';
	disciplina: Disciplina = {
		codigo: '',
		nome: '',
		link: '',
		professor: '',
		turma: 0,
		horario: '',
	};

	focused = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<DisciplinasDialogComponent>,
		private disciplinaService: DisciplinasService
	) {}

	ngOnInit(): void {
		if (this.data) {
			this.dialogTitle = 'Atualizar Tarefa';
			this.disciplina = this.data.disciplina;
		}
	}

	onSave(): void {
		const operation: Promise<void> = !this.data
			? this.disciplinaService.create(this.disciplina)
			: this.disciplinaService.update(this.disciplina);

		operation.then(() => this.dialogRef.close());
	}
}
