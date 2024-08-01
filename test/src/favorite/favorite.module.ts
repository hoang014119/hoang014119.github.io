import { Component, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.module.html',
})
class FavoritePage { }


@NgModule({
  declarations: [FavoritePage],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: '', component: FavoritePage }])],
  //  exports: [RouterModule],
})
export class FavoriteModule { }
