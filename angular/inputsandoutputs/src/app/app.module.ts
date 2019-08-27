import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Apple } from './components/apple.component';
import { Bucket } from './components/bucket.component';

@NgModule({
  declarations: [
    AppComponent,
	Apple,
	Bucket
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
