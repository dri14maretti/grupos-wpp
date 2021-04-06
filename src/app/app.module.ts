import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { DisciplinasListaComponent } from './components/disciplinas/disciplinas-lista/disciplinas-lista.component';

import { AngularFireModule } from 'angularfire2';

import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { DisciplinasListaAdminComponent } from './components/disciplinas/disciplinas-lista-admin/disciplinas-lista-admin.component';

@NgModule({
	declarations: [
		AppComponent,
		DisciplinasListaComponent,
		FooterComponent,
		HeaderComponent,
		DisciplinasListaComponent,
  HomeComponent,
  AdminComponent,
  DisciplinasListaAdminComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		MatToolbarModule,
		MatDialogModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		MatProgressSpinnerModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
