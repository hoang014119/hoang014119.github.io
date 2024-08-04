import { Component, Inject, ViewChild } from '@angular/core'
import AuthenService from '@services/AuthenService'

@Component({
  selector: 'VsCode',
  templateUrl: './VsCode.component.html'
})
export default class {
  @Inject(AuthenService) authenService
  @ViewChild('vscode') vscode

  ngAfterViewInit() {
    console.log('vscode', this.vscode.nativeElement)
  }
}
