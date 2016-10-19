import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [];

@NgModule({
  imports: [
    // we want nice urls so make the user/id goto correct place
    RouterModule.forRoot([
      { path: '', component: UserListComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'users', component: UserListComponent },
      
    ])
    ],
  exports: [RouterModule],
  providers: []
})
export class TestExperimentsRoutingModule { }
