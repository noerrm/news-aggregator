import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';

import { TileDataService } from './tiles/tile-data.service';
import { TilesModule } from './tiles/tiles.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TilesModule,
    HttpClientModule
  ],
  providers: [TileDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
