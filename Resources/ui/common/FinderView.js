function FinderView() {
	var MapModule = require('ti.map');
	
	var self = Ti.UI.createView({
		backgroundColor:'black'
	});

	var addressField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  borderWidth: 1,
	  hintText:'street address',
	  value:'860 peachtree',
	  top: 5, left: 5,
	  width: '70%', height: 60
	});
	self.add(addressField);
	
	var zipField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  borderWidth: 1,
	  hintText:'zip code',
	  value:'30309',
	  top: 65, left: 5,
	  width: '70%', height: 60
	});
	self.add(zipField);
	
	var mapview = MapModule.createView({
		mapType:MapModule.NORMAL_TYPE,
		top:130,
		height:'60%',
		width:'98%'
	});
	self.add(mapview);
	
	var button = Titanium.UI.createButton({
	   title: 'Submit',
	   top: 65,
	   right: 5,
	   width: '25%',
	   height: 60
	});
	button.addEventListener('click',function(e)
	{
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
		    }
		});
	});
	self.add(button);

	return self;
};

module.exports = FinderView;
