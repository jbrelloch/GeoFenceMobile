function NestView() {	
	var self = Ti.UI.createView({
		backgroundColor:'white',
		width:'100%',
		height:'100%'
	});
	
	self.DISABLE_CONTROLS = false;
	
	var circle = Ti.UI.createImageView({
            width: 140,
            height: 140,
            borderRadius: 70,
            borderColor: 'blue',
            backgroundColor: 'blue'
	});
	self.add(circle);
	
	var tempLabel = Ti.UI.createLabel({
			color: 'white',
			font: { fontSize:32 },
			text: '##',
	});
	var currentTempLabel = Ti.UI.createLabel({
			color: 'black',
			bottom: 5,
			font: { fontSize:32 },
			text: 'Current: ##',
	});
	self.add(tempLabel);
	self.add(currentTempLabel);
	
	//LEFT BUTTONS
	var homeButton = Ti.UI.createButton({
	   title: 'home',
	   backgroundColor: 'gray',
	   top: 60,
	   left: 25,
	   height: 50,
	   width: 70
	});
	homeButton.addEventListener('click',function(e){
		homeButton.backgroundColor = 'blue';
		awayButton.backgroundColor = 'gray';
		
		if(!self.DISABLE_CONTROLS) {
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(120000);
			xhr.open('GET', 'http://atthack.pagekite.me/nest_home');
			xhr.onload = function(incJSON) {
			};
			xhr.send();
			
			tempLabel.text = '72';
		}
		else {
			tempLabel.text = '72';
		}
	});
	self.add(homeButton);
	var awayButton = Ti.UI.createButton({
	   title: 'away',
	   backgroundColor: 'gray',
	   top: 111,
	   left: 25,
	   height: 50,
	   width: 70
	});
	awayButton.addEventListener('click',function(e){
		homeButton.backgroundColor = 'gray';
		awayButton.backgroundColor = 'blue';
		
		if(!self.DISABLE_CONTROLS) {
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(120000);
			xhr.open('GET', 'http://atthack.pagekite.me/nest_away');
			xhr.onload = function(incJSON) {
			};
			xhr.send();
			
			tempLabel.text = '85';
		}
		else {
			tempLabel.text = '85';
		}
	});
	self.add(awayButton);
	
	//RIGHT BUTTONS
	var plusButton = Ti.UI.createButton({
	   title: '+',
	   top: 60,
	   right: 35,
	   height: 50,
	   width: 50
	});
	plusButton.addEventListener('click',function(e){
		homeButton.backgroundColor = 'gray';
		awayButton.backgroundColor = 'gray';
		
		if(!self.DISABLE_CONTROLS) {
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(120000);
			xhr.open('GET', 'http://atthack.pagekite.me/nest_up');
			xhr.onload = function(incJSON) {
			};
			xhr.send();
			
			tempLabel.text = parseInt(tempLabel.text) + 1;
		}
		else {
			tempLabel.text = parseInt(tempLabel.text) + 1;
		}
	});
	self.add(plusButton);
	var minusButton = Ti.UI.createButton({
	   title: '-',
	   top: 111,
	   right: 35,
	   height: 50,
	   width: 50
	});
	minusButton.addEventListener('click',function(e){
		homeButton.backgroundColor = 'gray';
		awayButton.backgroundColor = 'gray';
		
		if(!self.DISABLE_CONTROLS) {
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(120000);
			xhr.open('GET', 'http://atthack.pagekite.me/nest_up');
			xhr.onload = function(incJSON) {
			};
			xhr.send();
			
			tempLabel.text = parseInt(tempLabel.text) - 1;
		}
		else {
			tempLabel.text = parseInt(tempLabel.text) - 1;
		}
	});
	self.add(minusButton);

	self.addEventListener('addNestRule', function(e) {
		self.DISABLE_CONTROLS = true;
		tempLabel.text = '70';
	});
	
	self.addEventListener('addNestRuleComplete', function(e) {
		self.DISABLE_CONTROLS = false;
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(120000);
		xhr.open('GET', 'http://atthack.pagekite.me/nest');
		xhr.onload = function(incJSON) {
			var nestStatus = JSON.parse(incJSON.source.responseText);
			
			tempLabel.text = nestStatus.target_temperature;
			currentTempLabel.text = 'Current: ' + nestStatus.current_temperature;
			
			if(nestStatus.target_temperature >= 85)
			{
				homeButton.backgroundColor = 'gray';
				awayButton.backgroundColor = 'blue';
			}
		};
		xhr.send();
		//refresh controller
	});
	self.fireEvent('addNestRuleComplete', {});

	return self;
};

module.exports = NestView;
