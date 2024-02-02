import { NgModule } from "@angular/core";
import { FavoriteItemComponent } from "./components/favorite-item/favorite-item.component";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    FavoriteItemComponent
  ],
  exports: [
    FavoriteItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgOptimizedImage
  ]
})
export class FavoritesModule { }
