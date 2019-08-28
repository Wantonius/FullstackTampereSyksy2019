 import {Injectable} from '@angular/core'
 
 @Injectable()
 export class GameMechanics {
	 
	private currentTarget:number;
	private numberOfGuesses:number;
	private playerName:string;
	private topList = [];
	
	constructor() {
		this.currentTarget = 0;
		this.numberOfGuesses = 0;
		this.playerName = "";
	}
	 
	startGame(name:string) {
		if(localStorage.getItem("toplist")) {
			this.topList = JSON.parse(localStorage.getItem("toplist"));
		}
		this.playerName = name;
		this.numberOfGuesses = 0;
		this.currentTarget = Math.floor(Math.random()*100)+1;
	}
	
	runGame(guess:number) {
		this.numberOfGuesses++;
		if(guess > this.currentTarget) {
			return {
				type:"high",
				guesses:this.numberOfGuesses
			}
		}
		if(guess < this.currentTarget) {
			return {
				type:"low",
				guesses:this.numberOfGuesses
			}			
		}
		this.topList.push({
			name:this.playerName,
			score: this.numberOfGuesses
		})
		localStorage.setItem("toplist",JSON.stringify(this.topList));
		return {
			type:"win",
			guesses:this.numberOfGuesses
		}
	}
	 
 }