import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ExplorerComponent } from './explorer/explorer.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'explorer',
  component: ExplorerComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
