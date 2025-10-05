import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'team/:id', component: DetailsComponent },
    { path: 'formAJout',component: FormulaireComponent},
    { path: 'accueil', component: AccueilComponent },
    { path: 'update/:id', component: UpdateComponent },
    { path: '', redirectTo: '/accueil', pathMatch: 'full' } // Redirection vers 'accueil' par défaut
];
