let ammountOfRings = 5;
let ammountOfRows = 3;
let lines = [
	[[0,0], [1,0], [2,0], [3,0], [4,0]],
	[[0,1], [1,1], [2,1], [3,1], [4,1]],
	[[0,2], [1,2], [2,2], [3,2], [4,2]],
	[[0,0], [1,1], [2,2], [3,1], [4,0]],
	[[0,2], [1,1], [2,0], [3,1], [4,2]],
	[[0,1], [1,0], [2,0], [3,0], [4,1]],
	[[0,1], [1,2], [2,2], [3,2], [4,1]],
	[[0,0], [1,0], [2,1], [3,2], [4,2]],
	[[0,2], [1,2], [2,1], [3,0], [4,0]],
	[[0,1], [1,2], [2,1], [3,0], [4,1]]
]
let pay = [
	[0,0,0.5,2.5,10],//0
	[0,0,0.5,2.5,10],//1
	[0,0,0.5,2.5,10],//2
	[0,0,0.5,4,10],//3
	[0,0,0.5,4,10],//4
	[0,0.5,3,10,75],//5
	[0,0.5,3,10,75],//6
	[0,0.5,4,40,200],//7
	[0,1,10,100,500],//8
	[0,0,2,20,200]//9
]
let tbl1 = [], tbl2 = [], tbl3 = [], tbl4 = [], tbl5 = [];
let crd1 = [], crd2 = [], crd3 = [], crd4 = [], crd5 = [];
let ammountOfWinBonus = 0,coins = 1000;
let betAmmount = 10;
let bonusIsOn = false;
let sping = false


let clearWheelAmmount = -1

async function spin(){
	if(!bonusIsOn && !sping){
		const ammountOfCoins = document.getElementById('ammount-coins');
		if(betAmmount <= ammountOfCoins.innerHTML){
			const selectIdCountWin = document.querySelector('.bonus-win');
			selectIdCountWin.innerHTML = "";
			const slot = document.querySelectorAll('.symbol-png');
			sping = true;
			playSound('sound/common_sounds_desktop2.ogg')
			setTimeout(function() {
				slideOut()
			}, 300)		
			setTimeout(function() {         
				apperWheel()
				playSound('sound/beben.ogg')
			}, 500)
		}
	}
}

function apperWheel(){		
		ammountOfWinBonus = 0;
		ammontLoop = 0;
		const ammountOfCoins = document.getElementById('ammount-coins');
		ammountOfCoins.innerHTML = ammountOfCoins.innerHTML - betAmmount;
		const ring = document.querySelectorAll('.ring')
		let bonusSymbol = 0;
		for(var x=0;x<=4;x++){
			let y = 0;
			let symbolsN = [0,1,2,3,4];
			let symbolsP = [5,6,7,8];
			let premium = true;
			for(var i=0;i<=2;i++){	
				let symbol = 0;
				let randoms = 0;		
				const slot = document.getElementById('slot'+x+i);
				const random = Math.floor(Math.random()*1000)
				if(random<600){
					randoms = Math.floor(Math.random()*symbolsN.length);
					symbol = symbolsN[randoms]
					symbolsN.splice(randoms, 1);
				}else if(random >=600 && random <= 615 && premium){				
					symbol = 9;
					premium = false;
				}else{
					randoms = Math.floor(Math.random()*symbolsP.length);
					symbol = symbolsP[randoms];
					symbolsP.splice(randoms, 1);
				}				
				slot.innerHTML = "<img src='img/"+symbol+"symbol.png' class='symbol-png symbol-png-slidein"+x+"'>";
				if(symbol == 9){
					bonusSymbol++;
				}
				switch(x) {
					case 0:
					tbl1[y] = symbol;
					crd1[y] = '#slot'+x+i;
					break;
					case 1:
					tbl2[y] = symbol;
					crd2[y] = '#slot'+x+i;				  
					break;
					case 2:
					tbl3[y] = symbol;
					crd3[y] = '#slot'+x+i;				  
					break;
					case 3:
					tbl4[y] = symbol;
					crd4[y] = '#slot'+x+i;				  
					break;
					case 4:
					tbl5[y] = symbol;
					crd5[y] = '#slot'+x+i;				  
					break;
				}
				y++;
			}
		}
		if(bonusSymbol >= 3){
			const selectedSymbol = Math.floor(Math.random()*9);
			bonusIsOn = true;
			bonusEsaa(selectedSymbol);
			setTimeout(function() { 
				playSoundBonus('sound/bookBonus.ogg');
			}, 1000)	
		}
		countWin();
	setTimeout(function() { 
		sping = false;
	}, 1100)
}

function createRings(){
	const wheel = document.querySelector('.wheel');
	for(var x=1;x<=ammountOfRings;x++){
		wheel.innerHTML += "<div id='ring"+x+"' class='ring'>";
	}
	const ammountOfCoins = document.getElementById('ammount-coins');
	ammountOfCoins.innerHTML = coins;
	const ammountOfBet = document.querySelector('.btn-spin');
	ammountOfBet.innerHTML = betAmmount+'<br/> SPIN';
	createRows();
}

function createRows(){
	const ring = document.querySelectorAll('.ring');
	let x = -1; 
	for(var rings of ring){
		x++;
		for(var i=0;i<=2;i++){
			rings.innerHTML += "<div id='slot"+x+i+"' class='slot'>";		
		}
	}
}

function bet(what){
	if(!bonusIsOn && !sping){
		const ammountOfBet = document.querySelector('.btn-spin');
		playSound('sound/common_sounds_desktop2.ogg')
		if(what == 'plus' && betAmmount <=99){
			betAmmount = betAmmount + 10;
			ammountOfBet.innerHTML = betAmmount+'<br/> SPIN';
		}else if(what == 'minus' && betAmmount >=11){
			betAmmount = betAmmount - 10;
			ammountOfBet.innerHTML = betAmmount+'<br/> SPIN';
		}
	}
}

function countWin(){
	const setZero = document.getElementById('win');
	setZero.innerHTML = '';
	let table = [tbl1,tbl2,tbl3,tbl4,tbl5];
	let cords = [crd1,crd2,crd3,crd4,crd5];
	let winnings = 0;
	for(var k in lines){
		var last = table[lines[k][0][0]][lines[k][0][1]] , level = 0;
		let wins = 0;
		for(var x in lines[k]){
			if(table[lines[k][x][0]][lines[k][x][1]] == 9){
				last=last;	
				wins++;
			}else if(last == 9){
				let firstSymbol =  Number(x) + 1;
				for(var v=x;v<=4;v++){
					last = table[lines[k][v][0]][lines[k][v][1]];
					if(last !=9){
						firstSymbol=v;
						v=4;
					}
				}
				last = table[lines[k][firstSymbol][0]][lines[k][firstSymbol][1]];
				wins++;
			}else if(last == table[lines[k][x][0]][lines[k][x][1]]){
				last = table[lines[k][x][0]][lines[k][x][1]];
				wins++;
			}
			else break;
		}
		switch (wins) {
			case 2:
			  if(last == 5 || last == 6 || last ==7 || last == 8 || last == 9) {
				level = 1;
			  }
			  break;
			case 3:
				level = 1;
			  break;
			case 4:
				level = 2;
			  break;
			case 5:
				level = 2;
			  break;
			default: 0;
		}
		winnings = winnings + 1 * pay[last][wins-1];
		if(level == 1){
			for(var p = wins - 1; p >= 0; p--) {
				const line = document.querySelector(cords[lines[k][p][0]][lines[k][p][1]]);
				setTimeout(function() {
				line.classList.add('line-2');
				},700);
			}
			setTimeout(() => {
				playSoundWin('sound/winCount.ogg');
			}, 800)
		}else if(level >= 2){
			for(var p = wins - 1; p >= 0; p--) {
				const line = document.querySelector(cords[lines[k][p][0]][lines[k][p][1]]);
				setTimeout(function() {
				line.classList.add('line-2');
				},700);
			}
			setTimeout(() => {
				playSoundWin('sound/bigWinCount.ogg');
			}, 800)
		}
		
	}
	if(winnings > 0){
		const ammountOfCoins = document.getElementById('ammount-coins');
		const win = document.getElementById('win');
		win.innerHTML = Number(betAmmount*winnings);
		ammountOfCoins.innerHTML = Number(ammountOfCoins.innerHTML) + Number(betAmmount*winnings);
	}
}

let ammontLoop = 0;
let ammontLooptoDo = 10

function bonusEsaa(selectedSymbol){
	if(bonusIsOn){
		setTimeout(function() {
			ammontLoop++;
			if (ammontLoop <= ammontLooptoDo) {
				const ring = document.querySelectorAll('.ring');
				const countSpins = document.querySelector('.btn-spin');
				countSpins.innerHTML = ammontLoop + '<br/>FREE';
				let x = -1;
				let bonusSymbol = 0;
				for(var rings of ring){
					x++;
					let y = 0;
					let symbolsN = [0,1,2,3,4];
					let symbolsP = [5,6,7,8];
					let premium = true;
					for(var i=0;i<=2;i++){	
						let symbol = 0;
						let randoms = 0;		
						const slot = document.getElementById('slot'+x+i);
						const random = Math.floor(Math.random()*1000)
						if(random<600){
							randoms = Math.floor(Math.random()*symbolsN.length);
							symbol = symbolsN[randoms]
							symbolsN.splice(randoms, 1);
						}else if(random >=600 && random <= 610 && premium){
							symbol = 9;
							premium = false;
						}else{
							randoms = Math.floor(Math.random()*symbolsP.length);
							symbol = symbolsP[randoms];
							symbolsP.splice(randoms, 1);
						}
						slot.innerHTML = "<img src='img/"+symbol+"symbol.png' class='symbol-png symbol-png-slidein"+x+"'>";
						if(symbol == 9){
							bonusSymbol++;
						}
						switch(x) {
							case 0:
							tbl1[y] = symbol;
							crd1[y] = '#slot'+x+i;
							break;
							case 1:
							tbl2[y] = symbol;
							crd2[y] = '#slot'+x+i;				  
							break;
							case 2:
							tbl3[y] = symbol;
							crd3[y] = '#slot'+x+i;				  
							break;
							case 3:
							tbl4[y] = symbol;
							crd4[y] = '#slot'+x+i;				  
							break;
							case 4:
							tbl5[y] = symbol;
							crd5[y] = '#slot'+x+i;				  
							break;
						}
						y++;
					} 
				}
				if(bonusSymbol >= 2){
					ammontLooptoDo = ammontLooptoDo +10;
					setTimeout(function() { 
						playSoundBonus('sound/bookBonus.ogg');
					}, 1000)	
				}
				countWin();
				setTimeout(function() {
					aleBonus(selectedSymbol);
				},2000);
			}
			if(ammontLoop <= ammontLooptoDo-1){
				playSound('sound/beben.ogg');
				setTimeout(function() {
					slideOut()
				},5900);
				bonusEsaa(selectedSymbol);
			}
			if(ammontLoop == ammontLooptoDo){
					turnOfBonus();			
			}
		},6000);
	}
}

function turnOfBonus(){
	const ammountOfCoins = document.getElementById('ammount-coins');
	ammountOfCoins.innerHTML = Number(ammountOfCoins.innerHTML) + Number(ammountOfWinBonus);
	const spinSelector = document.querySelector('.btn-spin');
	spinSelector.innerHTML = betAmmount+'<br/> SPIN';
	setTimeout(function() {
		ammontLooptoDo = 10;
		ammontLoop = 0;
		bonusIsOn = false;
		},3000);
}

function aleBonus(selectedSymbol){
	let selectedSymbolCount = 0;
	let table = [tbl1,tbl2,tbl3,tbl4,tbl5];
	let cordsBonus = [];
	let winnings = 0
	const selectIdCountWin = document.querySelector('.bonus-win');
	for(var k in table){		
		for(var x in table[k]){
			const slot = document.getElementById('slot'+k+x);
			slot.classList.remove('line-1');
			slot.classList.remove('line-2');
			slot.classList.remove('line-3');
			if(table[k][x] == selectedSymbol){
				cordsBonus.push(k);
				selectedSymbolCount++;
			}
		}
	}
	if (selectedSymbol <= 4 && selectedSymbolCount >= 3){
		setTimeout(() => {
			makeBonus(cordsBonus,selectedSymbol);
		}, 500);
	}else if(selectedSymbol >= 5 && selectedSymbolCount >= 2){
		setTimeout(() => {
			makeBonus(cordsBonus,selectedSymbol);
		}, 500);
	}
	if(pay[selectedSymbol][selectedSymbolCount-1] >= 0){
		winnings = winnings + 1 * pay[selectedSymbol][selectedSymbolCount-1]*10;
		ammountOfWinBonus = ammountOfWinBonus + Number(winnings*betAmmount);
	}
		selectIdCountWin.innerHTML = "<div style='margin: 50px 0 0 0;background: linear-gradient(0deg, rgba(201,154,0,1) 0%, rgba(193,101,43,1) 100%);text-align: center;line-height: 30px;color: white;border: solid rgb(255, 206, 47) 2px;font-weight: bold;width: 300px;height: 30px;position: absolute;left: 50%;-ms-transform: translateX(-50%);transform: translateX(-50%);text-align: center;font-weight: bold;font-size: 28px;z-index: 4;'>"+ammountOfWinBonus+"</div><img src='img/"+selectedSymbol+"symbol.png' style='width:100px;height:100px;margin: 0 0 0 500px'>";
}

function makeBonus(cordsBonus,selectedSymbol){
	playSoundBonus('sound/bonusCount.ogg');
	for(var k in cordsBonus){		
		for(var i=0;i<=2;i++){
			const slot = document.getElementById('slot'+cordsBonus[k]+i);
			slot.innerHTML = "<img src='img/"+selectedSymbol+"symbol.png' class='symbol-png line-2 line-3'>";
		}
	}
	setTimeout(() => {
		playSoundWin('sound/winCount.ogg');
	}, 500)
}

function slideOut(){
	let y = 0,j = 0;
	const slot = document.querySelectorAll('.symbol-png');
	for(var slots of slot){
		j++;		
		slots.classList.remove('symbol-png-slidein'+y);
		slots.classList.add('symbol-png-slidout');
		if(j%3 == 0){
			y++;
		}
	}
	for(var x = 0;x<=4;x++){
		for(var h=0;h<=2;h++){
			const slotek = document.getElementById('slot'+x+h);
			slotek.classList.remove('line-1');
			slotek.classList.remove('line-2');
			slotek.classList.remove('line-3');
		}
	}
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        spin();
    }
}

var music = document.getElementById("music");
var isPlaying = false;
music.volume = 0.2;
function togglePlay() {
	var text = document.querySelector('#toggle');
	if (isPlaying) {
		text.innerHTML = 'Music off';
		music.pause()
	} else {
		text.innerHTML = 'Music on';
		music.play();
	}
};
music.onplaying = function() {
  	isPlaying = true
};
music.onpause = function() {
  	isPlaying = false;
};


function playSound(audiosrc,volume = 0.2) {
	var audio = document.getElementById("audio");
	var source = document.getElementById('audioSource');
	audio.volume = volume;
	source.src = audiosrc;
	audio.load();
	audio.play();
  }

  function playSoundWin(audiosrc,volume = 0.2) {
	var audioWin = document.getElementById("audiowin");
	var sourceWin = document.getElementById('audioSourceWin');
	audioWin.volume = volume;
	sourceWin.src = audiosrc;
	audioWin.load();
	audioWin.play();
  }

  function playSoundBonus(audiosrc,volume = 0.2) {
	var audioBonus = document.getElementById("audiobonus");
	var sourceBonus = document.getElementById('audioSourcebonus');
	audioBonus.volume = volume;
	sourceBonus.src = audiosrc;
	audioBonus.load();
	audioBonus.play();
  }

createRings();