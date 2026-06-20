import { Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { LogAuthGuard } from './common/guards/log.guard';
import { AuthLayoutComponent } from './common/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './common/layouts/main-layout/main-layout.component';

export const routes: Routes = [

  // Authenticated Workspace (Main Layout)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./feature/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'feature/notes',
        loadComponent: () => import('./feature/notes/notes.component').then(m => m.NotesComponent)
      },
      {
        path: 'feature/physic',
        loadComponent: () => import('./feature/physic/physic.component').then(m => m.PhysicComponent)
      }
    ]
  },
  // Unauthenticated Gateway (Auth Layout)
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [LogAuthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./common/components/login/login.component').then(m => m.LoginComponent)
      }
    ]
  },
  // 3. Fallback Catch-All Wildcard
  { 
    path: '**', 
    redirectTo: '' 
  }
];