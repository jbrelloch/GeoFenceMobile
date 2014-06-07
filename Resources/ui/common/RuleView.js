function RuleView(ruleObject, parentView) {	
	var self = Ti.UI.createView({
		backgroundColor:'#CCAC00',
		width: '80%',
		height: '80%',
	  borderColor: 'black',
	  borderWidth: 2
	});
	
	var nameLabel = Ti.UI.createLabel({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: 'black',
	  text: 'name: '+ruleObject.name,
					font:{
						fontFamily:'Helvetica Neue',
						fontSize:24
					},
	  borderWidth: 1,
	  top: 5, left:5,
	  width: '70%', height: 40
	});
	self.add(nameLabel);
	
	var latitudeLabel = Ti.UI.createLabel({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: 'black',
	  text: 'lat: '+ruleObject.latitude,
					font:{
						fontFamily:'Helvetica Neue',
						fontSize:24
					},
	  borderWidth: 1,
	  top: 50, left: 5,
	  width: '70%', height: 40
	});
	self.add(latitudeLabel);
	
	var longitudeLabel = Ti.UI.createLabel({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: 'black',
	  text: 'long: '+ruleObject.longitude,
					font:{
						fontFamily:'Helvetica Neue',
						fontSize:24
					},
	  borderWidth: 1,
	  top: 95, left: 5,
	  width: '70%', height: 40
	});
	self.add(longitudeLabel);
	
	var radiusLabel = Ti.UI.createLabel({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: 'black',
	  text: 'radius: '+ruleObject.radius,
					font:{
						fontFamily:'Helvetica Neue',
						fontSize:24
					},
	  borderWidth: 1,
	  top: 140, left: 5,
	  width: '70%', height: 40
	});
	self.add(radiusLabel);
	
	var unitLabel = Ti.UI.createLabel({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: 'black',
	  text: 'unit: '+ruleObject.unit,
					font:{
						fontFamily:'Helvetica Neue',
						fontSize:24
					},
	  borderWidth: 1,
	  top: 195, left: 5,
	  width: '70%', height: 40
	});
	self.add(unitLabel);
	
	var zoneLabel = Ti.UI.createLabel({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: 'black',
	  text: 'zone: '+ruleObject.zone,
					font:{
						fontFamily:'Helvetica Neue',
						fontSize:24
					},
	  borderWidth: 1,
	  top: 240, left: 5,
	  width: '70%', height: 40
	});
	self.add(zoneLabel);
	
	var cancelButton = Ti.UI.createButton({
	   title: 'Cancel',
	   bottom: 5,
	   right: 5,
	   height: 50,
	   width: 100
	});
	cancelButton.addEventListener('click',function(e){
		parentView.remove(self);
	});
	self.add(cancelButton);
	
	return self;
};

module.exports = RuleView;