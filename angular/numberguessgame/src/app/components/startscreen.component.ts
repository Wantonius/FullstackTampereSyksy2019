import {Component, OnInit} from '@angular/core';
import {GameMechanics} from '../services/gamemechanics.service';
import {Router} from '@angular/router';

@Component({
	selector:"startscreen",
	templateUrl:"./startscreen.component.html"
})
export class StartScreen {
	
	name:string = "";
	topList = [];
	
	constructor(private _game:GameMechanics, private _router:Router) {}

	ngOnInit() {
		if(localStorage.getItem("toplist")) {
			this.topList = JSON.parse(localStorage.getItem("toplist"));
		}
	}
	
	startGame() {
		if(this.name.length === 0) {
			alert("Please enter a name");
			return;
		}
		this._game.startGame(this.name);
		this.name = "";
		this._router.navigate(["/game"]);
	}
}