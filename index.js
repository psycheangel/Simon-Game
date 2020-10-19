
function audio (typeOfObj, callback){
		var object = document.createElement('AUDIO');
		if(typeOfObj === object.tagName)
		callback(object);
//callback(document.createElement('AUDIO'));	
}
function switcher(evented) {
	// body...
	switch(this.element) {
		case 'w' :
		this.sound.src = 'sounds/tom-1.mp3';
			break;
		case 'a' :

		this.sound.src = 'sounds/tom-2.mp3';
			break;
		case 's' :

		this.sound.src = 'sounds/tom-3.mp3';
			break;
		case 'd' :

		this.sound.src = 'sounds/tom-4.mp3';
			break

		case 'j' :

		this.sound.src = 'sounds/crash.mp3';
			break;
		case 'k' :

		this.sound.src = 'sounds/snare.mp3';
			break;
		case 'l' :

		this.sound.src = 'sounds/kick-bass.mp3';
			break;
			
	}
}

function init (classes, callback) {
	var i = document.querySelectorAll('.'+classes);
	if(classes === i[0].classList[1])
		callback(i)
}
function evented(element,callback){
	var self = this;
	this.round = [];
	this.c = 0;
	
	this.element = element;
	this.sound = audio;
	this.switch = switcher;
	this.i = init;
	this.rec = (key,callback)=> {
		var i = key;
		var con = self.round.length > 0 ? self.round[self.round.length-1] : self.element; 
		if(i === con){
			self.c = 0
			callback(i)
		}
	}

	this.reset = () => {
		self.round = [];
		self.c = 0;
	}
	this.step = (n,key)=> {
		if(  self.round.length == 0 || key == self.round[n]){
			self.c++;
			if(self.c == self.round.length || self.round.length == 0 )
			self.rec(self.element,function(e){
				self.randRound();
			});
		} else {
			self.reset();
		}
	}
	this.randRound = () => {
		var randomizer = Math.floor((Math.random() * 4) );
		var key = ['w','a','s','d'];
		var res = key[randomizer];
			self.round.push(res);		
			setTimeout(function() {
			self.element = res;
			self.switch();
			self.sound('AUDIO',function(e){
			e.src = self.sound.src;
			e.play();
			});
		    self.animate(res);
		  }, 500);	
	}
	this.animate = (element)=> {
			var el = element ? element : self.element
		  var activeButton = document.querySelector("." + el);
			var pressed = document.querySelector(".pressed" );
			if(pressed)
			pressed.classList.remove("pressed");
		  activeButton.classList.add("pressed");
		  setTimeout(function() {
		    activeButton.classList.remove("pressed");
		  }, 100);
	}
	this.level = () => {
			var began = self.c == 0 && self.round.length == 0 ? "press any key to start": self.c;
			var h1 = document.querySelector("h1");
			var h3 = document.querySelector("h3");
			h1.innerHTML = "Simon Game Level "+self.round.length;
			h3.innerHTML = "Step : "+began;
	}
	this.play = ()=> {
		self.switch();
		//mute
		if(self.c != 0 && self.round.length > 0){
		self.sound('AUDIO',function(e){
			e.src = self.sound.src;
			e.play();
		});
		self.animate();
		}
		self.step(self.c,self.element);
		self.level();
	};
	this.setup = ()=> {
		self.i('drum',function(e){
			var list = [];
			for (var i = e.length - 1; i >= 0; i--) {
				e[i].addEventListener('click',(e)=>{
					self.element = e.target.classList[0];
					self.play();
				});
			list.push(e[i].classList[0]);
			}
		
			document.addEventListener('keypress',(e)=>{
			if(list.includes(e.key) == true ) {
				self.element = e.key;
				self.play();
			}
			});		
		});
	};
}
