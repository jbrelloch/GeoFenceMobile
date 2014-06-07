
var CalculateDist = function(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180;
    var radlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344; }
    if (unit=="N") { dist = dist * 0.8684; }
    return dist;
};

/////////////////////////////////////////////////////////////////
// DEVICE FORMAT
// device: parentsParentView.SELECTED_DEVICE,
// latitude: latitudeField.value,
// longitude: longitudeField.value,
// radius: radiusField.value,
// unit: unitPicker.getSelectedRow(0).title,
// zone: zonePicker.getSelectedRow(0).title,
// currentZone: zonePicker.getSelectedRow(0).title,
// name: nameField.value
// 
// NEST
// SetStatus
// SetTemp
// 
// WEMO
// TurnOnOff
/////////////////////////////////////////////////////////////////


// this will switch on the GPS
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 5;

Titanium.Geolocation.getCurrentPosition(function(e){
	if(e.success){
		var ruleList = Ti.App.Properties.getList('RuleList', []);
		
		for(var i=0; i<ruleList.length; i++){
			//Calculate Distance
			var dist = 99999999;
			if(ruleList[i].unit == 'miles' || ruleList[i].unit == 'feet'){
				dist = CalculateDist(e.coords.latitude, e.coords.longitude, ruleList[i].latitude, ruleList[i].longitude, "M");
				if(ruleList[i].unit == 'feet'){
					dist = imperialDist * 5280;
				}
			}
			else if(ruleList[i].unit == 'kilometers' || ruleList[i].unit == 'meters'){
				dist = CalculateDist(e.coords.latitude, e.coords.longitude, ruleList[i].latitude, ruleList[i].longitude, "M");
				if(ruleList[i].unit == 'meters'){
					dist = metricDist * 1000;
				}
			}
			
			if(dist < 99999999) {//valid distance
				var fireAction = false;
				if(ruleList[i].currentZone == ''){//initial state
					if(dist > ruleList[i].radius && ruleList[i].zone == 'outside zone'){
						fireAction = true;
					}
					else if(dist <= ruleList[i].radius && ruleList[i].zone == 'inside zone'){
						fireAction = true;
					}
				}
				else if(dist > ruleList[i].radius){
					if(ruleList[i].zone == 'outside zone' && ruleList[i].currentZone == 'inside zone'){//moved from out to in
						fireAction = true;
					}
					ruleList[i].currentZone = 'outside zone';
				}
				else if(dist <= ruleList[i].radius){
					if(ruleList[i].zone == 'inside zone' && ruleList[i].currentZone == 'outside zone'){//moved from in to out
						fireAction = true;
					}
					ruleList[i].currentZone = 'inside zone';
				}
				
				if(fireAction){//perform necessary action
					switch(ruleList[i].device){
						case 'Att':
							//SMS SECTION
							break;
						case 'Nest':
							if(ruleList[i].SetStatus != null){
								if(ruleList[i].SetStatus == 'home'){
									var xhr = Ti.Network.createHTTPClient();
									xhr.setTimeout(120000);
									xhr.open('GET', 'http://atthack.pagekite.me/nest_home');
									xhr.onload = function(incJSON) {
									};
									xhr.send();
								}
								else{
									var xhr = Ti.Network.createHTTPClient();
									xhr.setTimeout(120000);
									xhr.open('GET', 'http://atthack.pagekite.me/nest_away');
									xhr.onload = function(incJSON) {
									};
									xhr.send();
								}
							}
							else if(ruleList[i].SetTemp != null){
								var xhr = Ti.Network.createHTTPClient();
								xhr.setTimeout(120000);
								xhr.open('GET', 'http://atthack.pagekite.me/nest');
								xhr.onload = function(incJSON) {
									var nestStatus = JSON.parse(incJSON.source.responseText);
									
									var difference = ruleList[i].SetTemp - parseInt(nestStatus.target_temperature);
									
									for(var i = 0; i < Math.abs(difference); i++){
										if(difference > 0){
											var xhr = Ti.Network.createHTTPClient();
											xhr.setTimeout(120000);
											xhr.open('GET', 'http://atthack.pagekite.me/nest_up');
											xhr.onload = function(incJSON) {
											};
											xhr.send();
										}
										else if(difference < 0){
											var xhr = Ti.Network.createHTTPClient();
											xhr.setTimeout(120000);
											xhr.open('GET', 'http://atthack.pagekite.me/nest_down');
											xhr.onload = function(incJSON) {
											};
											xhr.send();
										}
									}
								};
								
							}
							break;
						case 'WeMo':
							if(ruleList[i].TurnOnOff != null){
								if(ruleList[i].TurnOnOff == 'on'){
									var xhr = Ti.Network.createHTTPClient();
									xhr.setTimeout(120000);
									xhr.open('GET', 'http://atthack.pagekite.me/wemo_on');
									xhr.onload = function(incJSON) {
									};
									xhr.send();
								}
								else if(ruleList[i].TurnOnOff == 'off'){
									var xhr = Ti.Network.createHTTPClient();
									xhr.setTimeout(120000);
									xhr.open('GET', 'http://atthack.pagekite.me/wemo_off');
									xhr.onload = function(incJSON) {
									};
									xhr.send();
								}
							}
							break;
						default:
							break;
					}
				}
			}
		};
	}
});

