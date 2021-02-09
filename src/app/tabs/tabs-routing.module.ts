import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'navigate',
        loadChildren: () => import('../navigate/navigate.module').then(m => m.NavigatePageModule)
      },
      {
        path: 'config',
        loadChildren: () => import('../config/config.module').then(m => m.ConfigPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/navigate',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/navigate',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
