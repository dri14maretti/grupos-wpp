import { Injectable, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/modules/disciplina.model';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { CollectionReference } from '@firebase/firestore-types';

@Injectable({
	providedIn: 'root',
})
export class DisciplinasService {
	procurarDisciplina: string = '';

	constructor(private db: AngularFirestore) {
		this.disciplinas = this.db.collection<Disciplina>(
			'/disciplinas',
			(ref: CollectionReference) => ref.orderBy('codigo', 'asc')
		);
	}

	disciplinas: AngularFirestoreCollection<Disciplina>;

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

	// ???????????
	search(): void {
		console.log(this.procurarDisciplina);
	}
}
