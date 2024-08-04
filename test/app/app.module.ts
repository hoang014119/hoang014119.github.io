import { Component, NgModule, COMPILER_OPTIONS, CompilerFactory, Inject } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import CoreModule, { components as cores } from '@core/CoreModule'
import ComponentsModule, { components } from '@components/ComponentsModule'
import PagesModule, { components as pages } from '@pages/PagesModule'
import Home from '@pages/Home'
import Account from '@pages/Account'


@Component({
  selector: 'App',
  templateUrl: './app.module.html'
})
class App { }


const routes = [
  { path: 'home', component: Home },
  { path: 'account', component: Account },
  {
    path: 'pages', loadChildren: async () => {
      const mod = await import('@pages/PagesModule')
      console.log('loadChildren', mod)
      return mod
    }
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
]

@NgModule({
  declarations: [App, ...cores, ...components, ...pages],
  imports: [RouterModule.forRoot(routes, { useHash: true }), BrowserModule, CoreModule, ComponentsModule/*, PagesModule*/],
  exports: [RouterModule, FormsModule],
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] }
  ],
  bootstrap: [App]
})
export default class AppModule {
  static instance: AppModule;

  @Inject(Router) router

  constructor() {
    AppModule.instance = this;
    //    console.log('router', this.router)
  }

  async getFragment() {
    return new Promise(res => this.router.fragment.subscribe(fragment => {
      console.log('fragment', fragment)
      res(fragment)
    }))
  }

  async test(hash, module) {
    const fragment = await this.getFragment()
    return hash == fragment && module
  }
}
