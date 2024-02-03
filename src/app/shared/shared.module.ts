import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from "./components/toast/toast.component";
import { RadioButtonComponent } from "./components/inputs/radio-button/radio-button.component";
import { NgbToastModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ToggleButtonComponent } from './components/inputs/toggle-button/toggle-button.component';

@NgModule({
  declarations: [
    RadioButtonComponent,
    HeaderComponent,
    ToastComponent,
    ToggleButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbToastModule,
    NgbCollapseModule,
  ],
  exports: [
    RadioButtonComponent,
    HeaderComponent,
    ToastComponent
  ]
})
export class SharedModule {
}
