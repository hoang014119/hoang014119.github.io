import { Component, Inject, NgModule } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import Home from '@pages/Home'
import Account from '@pages/Account'


@Component({
  selector: 'Pages',
  templateUrl: './PagesModule.html'
})
class Pages {
  @Inject(Router) router

  goTo(url) {
    this.router.navigate([url])
  }
}


const routes = [
  {
    path: '', component: Pages, children: [
      { path: 'home1', component: Home },
      { path: 'account1', component: Account },
      { path: '', pathMatch: 'full', redirectTo: 'home1' },
      { path: '**', redirectTo: 'home1' },
    ]
  },
]

export const components = [Pages, Home, Account]

@NgModule({
  declarations: components,
  imports: [RouterModule.forChild(routes)],
})
export default class PagesModule { }
