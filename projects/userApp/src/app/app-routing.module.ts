import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthgardService } from './services/authgard/authgard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'buy',
    loadChildren: () => import('./pages/buy/buy.module').then(m => m.BuyPageModule)
  },
  {
    path: 'sell',
    loadChildren: () => import('./pages/sell/sell.module').then(m => m.SellPageModule),
    canActivate: [AuthgardService]
  },
  {
    path: 'buy/:id',
    loadChildren: () => import('./pages/property-details/property-details.module').then(m => m.PropertyDetailsPageModule)
  },
  {
    path: 'join-us',
    loadChildren: () => import('./pages/join-us/join-us.module').then( m => m.JoinUsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
