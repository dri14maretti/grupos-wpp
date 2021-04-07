import { Disciplina } from './../../models/disciplina.model';
import { Observable, of, Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { CollectionReference } from '@firebase/firestore-types';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class DisciplinasService {
	constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {
		this.disciplinas = this.db.collection<Disciplina>(
			'/disciplinas',
			(ref: CollectionReference) => ref.orderBy('codigo', 'asc')
		);

		this.transformaDataDoFirebaseParaArray();

		this.dataConvertidaParaArray = [];

		this.dataFinal$ = new Subject<Array<Disciplina>>();

		this.arrayFiltrado = [];
	}

	disciplinas: AngularFirestoreCollection<Disciplina>;

	dataConvertidaParaArray: any[];

	arrayFiltrado: Disciplina[];

	dataFinal$: Observable<Disciplina[]>;

	showMessage(msg: string, isError: boolean = false) {
		this.snackBar.open(msg, 'x', {
			duration: 3000,
			horizontalPosition: 'right',
			verticalPosition: 'top',
			panelClass: isError ? ['msg-error'] : ['msg-success'],
		});
	}

	create(disciplina: Disciplina): Promise<void> {
		const uid = this.db.createId();
		return this.disciplinas.doc<Disciplina>(uid).set({
			uid,
			nome: disciplina.nome,
			codigo: disciplina.codigo,
			link: disciplina.link,
			professor: disciplina.professor,
			turma: disciplina.turma,
			horario: disciplina.horario,
		});
	}

	update(disciplina: Disciplina): Promise<void> {
		return disciplina.uid
			? this.disciplinas.doc<Disciplina>(disciplina.uid).update(disciplina)
			: this.disciplinas.doc<Disciplina>('').update(disciplina); //Check se aquele uid do parametro existe, para que possa ser passado direto pra dentro do firebase
	}

	delete(disciplina: Disciplina): Promise<void> {
		return disciplina.uid
			? this.disciplinas.doc<Disciplina>(disciplina.uid).delete()
			: this.disciplinas.doc<Disciplina>('').delete(); //Check se aquele uid do parametro existe, para que possa ser excluído direto de dentro do firebase
	}

	transformaDataDoFirebaseParaArray(): void {
		firebase
			.firestore()
			.collection('disciplinas')
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.forEach((doc) => {
					this.dataConvertidaParaArray.push(doc.data());
				});
			});
	}
}
