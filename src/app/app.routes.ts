import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', loadComponent: () => import('./cocktails/cocktail-list/cocktail-list.component').then(m => m.CocktailListComponent) },
    { path: 'list/:cocktailId', loadComponent: () => import('./cocktails/cocktail-detail/cocktail-detail.component').then(m => m.CocktailDetailComponent) },
    { path: '**', redirectTo: '/list' },
];
