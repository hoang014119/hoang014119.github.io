import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import Home from './Home'
import Account from './Account'


const routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'account',
    component: Account
  }
]

export const components = [Home, Account]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export default class { }
