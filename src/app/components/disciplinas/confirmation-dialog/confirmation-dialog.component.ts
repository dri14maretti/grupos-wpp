import { DisciplinasService } from './../disciplinas.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disciplina } from 'src/app/models/disciplina.model';

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
	disciplina: Disciplina = {
		codigo: '',
		nome: '',
		link: '',
		professor: '',
		turma: 0,
		horario: '',
	};

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
		private disciplinasService: DisciplinasService
	) {}

	ngOnInit(): void {
		this.disciplina = this.data.disciplina;
	}

	onDelete(): void {
		const operation = this.disciplinasService.delete(this.disciplina);

		operation.then(() => this.dialogRef.close());
	}
}
