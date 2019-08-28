import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {GameMechanics} from './services/gamemechanics.service';
import {GameScreen} from './components/gamescreen.component';
import {StartScreen} from './components/startscreen.component';

@NgModule({
  declarations: [
    AppComponent,
	GameScreen,
	StartScreen
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule
  ],
  providers: [GameMechanics],
  bootstrap: [AppComponent]
})
export class AppModule { }
