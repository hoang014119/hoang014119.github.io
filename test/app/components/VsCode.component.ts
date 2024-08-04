import { Component, Inject } from '@angular/core'
import AuthenService from '@services/AuthenService'

@Component({
  selector: 'VsCode',
  templateUrl: './VsCode.component.html'
})
export default class {
  @Inject(AuthenService) authenService
}
