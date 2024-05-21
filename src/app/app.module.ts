import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MapComponent } from './map/map.component';
import { AppComponent } from './app.component';
import { ConsoleLogComponent } from './console-log/console-log.component';

@NgModule({
  declarations: [AppComponent, MapComponent, ConsoleLogComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
