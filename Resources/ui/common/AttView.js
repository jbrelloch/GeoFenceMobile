function AttView() {	
	var self = Ti.UI.createView({
		backgroundColor:'white',
		width:'100%',
		height:'100%'
	});
	
	
	
	
	
	
	self.addEventListener('addAttRule', function(e) {
		self.DISABLE_CONTROLS = true;
	});
	
	self.addEventListener('addAttRuleComplete', function(e) {
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
	});
	self.fireEvent('addAttRuleComplete', {});
	
	
	
	return self;
};

module.exports = AttView;
