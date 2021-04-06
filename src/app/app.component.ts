import { Disciplina } from './models/disciplina.model';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	disciplinas$: Observable<Disciplina[]>;

	ngOnInit() {
		this.disciplinas$ = this.db
			.collection<Disciplina>('/disciplinas')
			.valueChanges();
	}

	constructor(private db: AngularFirestore) {
		this.disciplinas$ = this.db
			.collection<Disciplina>('/disciplinas')
			.valueChanges();
	}
}
