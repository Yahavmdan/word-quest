import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbTypeahead,
    SharedModule,
    NgOptimizedImage
  ]
})
export class HomeModule {
}
