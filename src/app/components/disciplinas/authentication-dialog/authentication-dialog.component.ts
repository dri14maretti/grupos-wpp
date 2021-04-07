import { Login } from './../../../models/login.model';
import { Component, OnInit } from '@angular/core';
import { DisciplinasService } from '../disciplinas.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
	selector: 'app-authentication-dialog',
	templateUrl: './authentication-dialog.component.html',
	styleUrls: ['./authentication-dialog.component.css'],
})
export class AuthenticationDialogComponent implements OnInit {
	constructor(
		private disciplinasService: DisciplinasService,
		private dialogRef: MatDialogRef<AuthenticationDialogComponent>,
		private router: Router
	) {}

	ngOnInit(): void {
		this.logins = this.disciplinasService.login;
	}

	logins: Login[] = [];

	login: Login = { user: '', senha: '' };

	authenticate(): void {
		if (
			this.logins.find(
				(login) =>
					login.user === this.login.user && login.senha === this.login.senha
			)
		) {
			this.disciplinasService.showMessage('Logado com sucesso!');
			this.disciplinasService.logged = true;
			this.router.navigate(['/admin']);
		} else {
			this.router.navigate(['']);
			this.disciplinasService.showMessage('Usuário ou senha incorretos!', true);
		}

		this.dialogRef.close();
	}

	checkFunc(): boolean {
		if (this.login.user && this.login.senha) return false;
		else return true;
	}
}
