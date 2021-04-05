import { environment } from "./../environments/environment";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HeaderComponent } from "./components/template/header/header.component";
import { FooterComponent } from "./components/template/footer/footer.component";

import { AngularFireModule } from "angularfire2";

import { AngularFirestoreModule } from "angularfire2/firestore";

import { MatToolbarModule } from "@angular/material/toolbar";
import { DisciplinasListaComponent } from "./components/disciplinas/disciplinas-lista/disciplinas-lista.component";

@NgModule({
  declarations: [
    AppComponent,
    DisciplinasListaComponent,
    FooterComponent,
    HeaderComponent,
    DisciplinasListaComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
