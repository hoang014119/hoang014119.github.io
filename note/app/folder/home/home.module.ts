import { Component, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'


@Component({
  selector: 'app-home',
  templateUrl: './home.module.html',
})
class HomePage { }


@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: '', component: HomePage }])],
  //  exports: [RouterModule],
})
export class HomeModule { }
