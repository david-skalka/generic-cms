import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntityComponent } from './entity/entity.component';

const routes: Routes = [ {path: 'entity/:name', component: EntityComponent} ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
