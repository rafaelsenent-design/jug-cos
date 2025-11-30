import { Routes } from '@angular/router';
import {JuguetesList} from './web/juguetes/juguetes-list/juguetes-list';
import {CosmeticosList} from './web/cosmeticos/cosmeticos-list/cosmeticos-list';
import {CosmeticosDetail} from './web/cosmeticos/cosmeticos-detail/cosmeticos-detail';
import {JuguetesDetail} from './web/juguetes/juguetes-detail/juguetes-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/juguetes',
    pathMatch: 'full'
  },
  {
    path: 'juguetes',
    component: JuguetesList
  },
  {
    path: 'juguetes/edit',
    component: JuguetesDetail
  },
  {
    path: 'juguetes/edit/:id',
    component: JuguetesDetail
  },
  {
    path: 'cosmeticos/list',
    component: CosmeticosList
  },
  {
    path: 'cosmeticos/edit',
    component: CosmeticosDetail
  },
  {
    path: 'cosmeticos/edit/:id',
    component: CosmeticosDetail
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
