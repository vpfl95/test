import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EcgComponent } from './ecg/ecg.component';
import { RespirationComponent } from './respiration/respiration.component';
import { MapComponent } from './map/map.component';
import { InformationComponent } from './information/information.component';


@NgModule({
  declarations: [
    AppComponent,
    EcgComponent,
    RespirationComponent,
    MapComponent,
    InformationComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCx86vDGeGD9pUfV8GL4pIrGzMIq5V6K5o'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
