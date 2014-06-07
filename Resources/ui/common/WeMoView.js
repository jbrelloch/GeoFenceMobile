function WeMoView() {	
	var self = Ti.UI.createView({
		backgroundColor:'white',
		width:'100%',
		height:'100%'
	});
	
	var onButton = Ti.UI.createButton({
	   title: 'ON',
	   backgroundColor: 'gray',
	   left: 55,
	   height: 100,
	   width: 100
	});
	onButton.addEventListener('click',function(e){
		onButton.backgroundColor = 'blue';
		offButton.backgroundColor = 'gray';
		
		if(!self.DISABLE_CONTROLS) {
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(120000);
			xhr.open('GET', 'http://atthack.pagekite.me/wemo_on');
			xhr.onload = function(incJSON) {
			};
			xhr.send();
		}
		else {
		}
	});
	self.add(onButton);
	var offButton = Ti.UI.createButton({
	   title: 'OFF',
	   backgroundColor: 'gray',
	   right: 55,
	   height: 100,
	   width: 100
	});
	offButton.addEventListener('click',function(e){
		onButton.backgroundColor = 'blue';
		offButton.backgroundColor = 'gray';
		
		if(!self.DISABLE_CONTROLS) {
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(120000);
			xhr.open('GET', 'http://atthack.pagekite.me/wemo_off');
			xhr.onload = function(incJSON) {
			};
			xhr.send();
		}
		else {
		}
	});
	self.add(offButton);
	
	
	self.addEventListener('addWeMoRule', function(e) {
		self.DISABLE_CONTROLS = true;
	});
	
	self.addEventListener('addWeMoRuleComplete', function(e) {
		self.DISABLE_CONTROLS = false;
		
		// var xhr = Ti.Network.createHTTPClient();
		// xhr.setTimeout(120000);
		// xhr.open('GET', 'http://atthack.pagekite.me/nest');
		// xhr.onload = function(incJSON) {
			// var nestStatus = JSON.parse(incJSON.source.responseText);
// 			
			// tempLabel.text = nestStatus.target_temperature;
			// currentTempLabel.text = 'Current: ' + nestStatus.current_temperature;
// 			
			// if(nestStatus.target_temperature >= 85)
			// {
				// homeButton.backgroundColor = 'gray';
				// awayButton.backgroundColor = 'blue';
			// }
		// };
		// xhr.send();
		//refresh controller
	});
	self.fireEvent('addWeMoRuleComplete', {});
	
	
	return self;
};

module.exports = WeMoView;
