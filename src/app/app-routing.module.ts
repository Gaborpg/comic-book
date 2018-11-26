import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateComponent} from './create/create.component';
import {ListTableComponent} from './list-table/list-table.component';

const routes: Routes = [
  {path: '', redirectTo: '/list-table', pathMatch: 'full'},
  {path: 'list-table', component: ListTableComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: CreateComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
