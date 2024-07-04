import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import Home from '@pages/Home'
import Account from '@pages/Account'


//const routes = [
//  {
//    path: 'home',
//    redirectTo: '',
//    pathMatch: 'full'
//  },
//  {
//    path: '',
//    component: Home
//  },
//  //  {
//  //    path: 'home',
//  //    component: Home
//  //  },
//  {
//    path: 'account',
//    component: Account
//  }
//]

export const components = [Home, Account]

@NgModule({
  //  imports: [RouterModule.forChild(routes)],
})
export default class { }
