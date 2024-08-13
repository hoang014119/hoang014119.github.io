import { Component, NgModule, COMPILER_OPTIONS, CompilerFactory, Inject } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { JitCompilerFactory, platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import CoreModule, { components as cores } from '@core/CoreModule'
import ComponentsModule, { components } from '@components/ComponentsModule'
import { components as pages } from '@pages/PagesModule'
import Home from '@pages/Home'
import Account from '@pages/Account'
import VsCode from '@components/VsCode.component'


@Component({
  selector: 'App',
  templateUrl: './app.module.html'
})
class App { }


const routes = [
  { path: 'home', component: Home },
  { path: 'account', component: Account },
  {
    path: 'pages', loadChildren: () => import('@pages/PagesModule').then(m => m.PagesModule)
  },
  { path: 'vscode', component: VsCode },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
]

@NgModule({
  declarations: [App, ...cores, ...components, ...pages, VsCode],
  imports: [RouterModule.forRoot(routes, { useHash: true }), BrowserModule, CoreModule, ComponentsModule/*, PagesModule*/],
  exports: [RouterModule, FormsModule],
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] }
  ],
  bootstrap: [App]
})
export class AppModule {
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

platformBrowserDynamic().bootstrapModule(AppModule)
