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
	dialogTitle: string = 'Nova Disciplina';

	disciplina: Disciplina = {
		codigo: '',
		nome: '',
		link: '',
		professor: '',
		turma: 0,
		horario: '',
	};

	check: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<DisciplinasDialogComponent>,
		private disciplinaService: DisciplinasService
	) {
		this.check = true;
	}

	ngOnInit(): void {
		if (this.data) {
			this.dialogTitle = 'Atualizar Disciplina';
			this.disciplina = this.data.disciplina;
		}
	}

	checkFunc(): boolean {
		if (
			this.disciplina.codigo &&
			this.disciplina.nome &&
			this.disciplina.link &&
			this.disciplina.professor &&
			this.disciplina.turma &&
			this.disciplina.horario
		)
			return false;
		else return true;
	}

	onSave(): void {
		const operation: Promise<void> = !this.data
			? this.disciplinaService.create(this.disciplina)
			: this.disciplinaService.update(this.disciplina);

		operation.then(() => this.dialogRef.close());
	}
}
