import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from "./components/toast/toast.component";
import { ToggleButtonComponent } from "./components/toggle-button/toggle-button.component";
import { NgbToastModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ToggleButtonComponent,
    HeaderComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbToastModule,
    NgbCollapseModule,
  ],
  exports: [
    ToggleButtonComponent,
    HeaderComponent,
    ToastComponent
  ]
})
export class SharedModule {
}
