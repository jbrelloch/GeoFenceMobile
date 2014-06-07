function FinderView(latField, longField, parentView) {
	var MapModule = require('ti.map');
	
	var self = Ti.UI.createView({
		backgroundColor:'#CCAC00',
		width: '80%',
		height: '80%',
	  borderColor: 'black',
	  borderWidth: 2
	});

	var addressField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: 'black',
	  borderWidth: 1,
	  hintText:'street address',
	  value:'860 peachtree',
	  top: 5, left: 5,
	  width: '95%', height: 50
	});
	self.add(addressField);
	
	var zipField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: 'black',
	  borderWidth: 1,
	  hintText:'zip code',
	  value:'30309',
	  top: 60, left: 5,
	  width: '95%', height: 50
	});
	self.add(zipField);
	
	var mapview = MapModule.createView({
		mapType:MapModule.NORMAL_TYPE,
		top:115,
		height:'60%',
		width:'98%'
	});
	self.add(mapview);
	
	var latHolder;
	var longHolder;
	var failCount = 0;
	var button = Titanium.UI.createButton({
	   title: 'Submit',
	   bottom: 5,
	   right: 5,
	   width: '45%',
	   height: 50
	});
	button.addEventListener('click',function(e) {
		if(button.title == 'Submit') {
		   Titanium.Geolocation.forwardGeocoder(addressField.value+' '+zipField.value,function(evt) {
		   		if(evt != null && evt.latitude != null && evt.longitude != null){
				    var objLocationAnnotation = MapModule.createAnnotation({
				        latitude: evt.latitude,
				        longitude: evt.longitude,
				        pincolor: MapModule.ANNOTATION_VIOLET,
		    			draggable: false
				    });
				    mapview.addAnnotation(objLocationAnnotation);
				    mapview.region = {latitude: evt.latitude, longitude: evt.longitude, latitudeDelta: 0.1, longitudeDelta: 0.1 };
				    
				    button.title = 'Confirm?';
				    cancelButton.title = 'Nope';
				    
				    latHolder = evt.latitude;
				    longHolder = evt.longitude;
			    }
			    else {
			    	var xhr = Ti.Network.createHTTPClient();
			    	xhr.setTimeout(120000);
			    	xhr.open('GET', 'http://maps.googleapis.com/maps/geo?output=json&q=' + addressField.value + ' ' + zipField.value);
					xhr.onload = function() {
					    var json = JSON.parse(this.responseText);
					    if(json != null && json.latitude != null && json.longitude != null) {
					    	var objLocationAnnotation = MapModule.createAnnotation({
						        latitude: json.latitude,
						        longitude: json.longitude,
						        pincolor: MapModule.ANNOTATION_VIOLET,
				    			draggable: false
						    });
						    mapview.addAnnotation(objLocationAnnotation);
						    mapview.region = {latitude: json.latitude, longitude: json.longitude, latitudeDelta: 0.1, longitudeDelta: 0.1 };
						    
						    button.title = 'Confirm?';
						    cancelButton.title = 'Nope';
						    
						    latHolder = json.latitude;
						    longHolder = json.longitude;
					    }
					    else {
					    	if(failCount < 5) {
					    		failCount++;
						    	addressField.borderColor = 'red';
						    	zipField.borderColor = 'red';
					    	}
					    	else {////THE FALLBACK PLAN
						    	var objLocationAnnotation = MapModule.createAnnotation({
							        latitude: '33.7782196',
							        longitude: '-84.3844364',
							        pincolor: MapModule.ANNOTATION_VIOLET,
					    			draggable: false
							    });
							    mapview.addAnnotation(objLocationAnnotation);
							    mapview.region = {latitude: '33.7782196', longitude: '-84.3844364', latitudeDelta: 0.1, longitudeDelta: 0.1 };
							    
							    button.title = 'Confirm?';
							    cancelButton.title = 'Nope';
						    
							    latHolder = '33.7782196';
							    longHolder = '-84.3844364';
					    	}
					    }
					    Ti.API.info(json);
					};
					xhr.send();
			    }
			});
		}
		else {
			latField.value = latHolder;
			longField.value = longHolder;
			parentView.remove(self);
		}
	});
	self.add(button);
	
	var cancelButton = Titanium.UI.createButton({
	   title: 'Cancel',
	   bottom: 5,
	   left: 5,
	   width: '45%',
	   height: 50
	});
	cancelButton.addEventListener('click',function(e) {
		if(cancelButton.title == 'Cancel') {
			parentView.remove(self);
		}
		else
		{
			mapView.removeAllAnnotations();
		    button.title = 'Submit';
		    cancelButton.title = 'Cancel';
		}
	});
	self.add(cancelButton);

	return self;
};

module.exports = FinderView;
