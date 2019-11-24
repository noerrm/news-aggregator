import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Each route maps a URL path to a module or component. */
const routes: Routes = [
  {path: '', redirectTo: '/tiles', pathMatch: 'full'},
  {path: 'tiles', loadChildren: './tiles/tiles.module#TilesModule'},
  {path: 'data', loadChildren: './data/data.module#DataModule'}
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
