import { Login } from './../../models/login.model';
import { Disciplina } from './../../models/disciplina.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
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
	login: Login[];
	disciplinas: AngularFirestoreCollection<Disciplina>;
	disciplinasFiltradas$: Observable<Disciplina[]>;
	logged: boolean = false;

	constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {
		this.disciplinas = this.db.collection<Disciplina>(
			'/disciplinas',
			(ref: CollectionReference) => ref.orderBy('codigo', 'asc')
		);

		this.login = this.transformaDataDoFirebaseParaArray('login');

		this.disciplinasFiltradas$ = this.disciplinas.valueChanges();
	}

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
			codigo: disciplina.codigo.toUpperCase(),
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

	search(key: string): void {
		this.disciplinasFiltradas$ = this.disciplinas
			.valueChanges()
			.map((disciplinaVet) =>
				disciplinaVet.filter(
					(disciplina) =>
						disciplina.codigo
							.toLocaleLowerCase()
							.includes(key.toLocaleLowerCase()) ||
						disciplina.nome
							.toLocaleLowerCase()
							.includes(key.toLocaleLowerCase())
				)
			);
		this.disciplinasFiltradas$.subscribe((val) => console.log(val));
	}

	transformaDataDoFirebaseParaArray(path: string): any[] {
		let dataConvertida: any[] = [];

		firebase
			.firestore()
			.collection(path)
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.forEach((doc) => {
					dataConvertida.push(doc.data());
				});
			});

		return dataConvertida;
	}
}
