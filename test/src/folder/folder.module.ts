import { Component, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { IndexPage } from '@folder/index/index.page'


@Component({
  selector: 'app-folder',
  templateUrl: './folder.module.html',
})
class FolderPage { }


const routes: Routes = [
  {
    path: '', component: FolderPage, children: [
      { path: 'inbox', component: IndexPage },
      { path: 'home', loadChildren: () => import('@folder/home/home.module').then((m) => m.HomeModule), },
      { path: '', pathMatch: 'full', redirectTo: 'inbox' },
      { path: '**', redirectTo: 'inbox' },
    ]
  },
]

@NgModule({
  declarations: [FolderPage, IndexPage],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  //  exports: [RouterModule],
})
export class FolderModule { }
