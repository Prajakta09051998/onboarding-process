import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '**', redirectTo: 'candidate-form' },
  {
    path: 'onBoard',
    loadChildren: () => import('./on-board/on-board.module').then((m) => m.OnBoardModule),
  },
];
