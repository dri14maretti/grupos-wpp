import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DisciplinasListaComponent } from "./components/disciplinas/disciplinas-lista/disciplinas-lista.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
  },

  {
    path: "disciplinas/disciplina-lista",
    component: DisciplinasListaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
