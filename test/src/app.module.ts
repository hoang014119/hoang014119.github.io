import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy, PreloadAllModules, RouterModule, Routes } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'


@Component({
  selector: 'app-root',
  templateUrl: 'app.module.html',
})
class AppPage {
  appPages = [
    { title: 'Favorites', url: '/favorite', icon: 'heart' },
    { title: 'Folder', url: '/folder', icon: 'archive' },
    { title: 'Outbox', url: '/outbox', icon: 'paper-plane' },
    { title: 'Trash', url: '/trash', icon: 'trash' },
    { title: 'Spam', url: '/spam', icon: 'warning' },
  ]
  labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders']
}

const routes: Routes = [
  { path: 'favorite', loadChildren: () => import('@favorite/favorite.module').then(m => m.FavoriteModule) },
  { path: 'folder', loadChildren: () => import('@folder/folder.module').then(m => m.FolderModule) },
  { path: '', pathMatch: 'full', redirectTo: 'folder' },
  { path: '**', redirectTo: 'folder' },
]

@NgModule({
  declarations: [AppPage],
  imports: [BrowserModule, IonicModule.forRoot(), RouterModule.forRoot(routes, { /*preloadingStrategy: PreloadAllModules,*/ useHash: true })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
