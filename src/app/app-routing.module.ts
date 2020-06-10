import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'articulos',
    component: ArticulosComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, ArticulosComponent];

