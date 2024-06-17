import { NgModule, COMPILER_OPTIONS, CompilerFactory } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic'
import { FormsModule } from '@angular/forms';
import CoreModule, { components as core } from './core/CoreModule'
import ComponentsModule, { components } from './components/ComponentsModule'
import PagesModule, { components as pages } from './pages/PagesModule'
import App from './App'

const routes = [
  {
    path: '**',
    component: App
  }
]

@NgModule({
  declarations: [App, ...core, ...components, ...pages],
  imports: [RouterModule.forRoot(routes), BrowserModule, CoreModule, ComponentsModule, PagesModule],
  exports: [RouterModule, FormsModule],
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] }
  ],
  bootstrap: [App]
})
export default class { }
