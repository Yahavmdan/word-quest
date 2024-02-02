import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SharedModule } from "./shared/shared.module";
import { HomeModule } from "./components/home/home.module";
import { FavoritesModule } from "./components/favorites/favorites.module";
import { NgOptimizedImage } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    FavoritesModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
