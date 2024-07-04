import { NgModule } from '@angular/core'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Test from '@components/Test'
import TestItem from '@components/TestItem'


export const components = [Header, Footer, Test, TestItem]

@NgModule({})
export default class ComponentsModule { }
