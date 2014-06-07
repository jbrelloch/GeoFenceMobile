
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
    return dist
};

// this will switch on the GPS
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 5;

Titanium.Geolocation.getCurrentPosition(function(e){
	if(e.success){
		var ruleList = Ti.App.Properties.getList('RuleList', []);
		
		e.coords;
		e.coords.latitude;
		e.coords.longitude;
		for(var i=0; i<ruleList.length; i++){
			if(ruleList[i].unit == 'miles' || ruleList[i].unit == 'feet'){
				var imperialDist = CalculateDist(e.coords.latitude, e.coords.longitude, ruleList[i].latitude, ruleList[i].longitude, "M");
				if(ruleList[i].unit == 'feet'){
					imperialDist = imperialDist * 5280;
				}
			}
			else if(ruleList[i].unit == 'kilometers' || ruleList[i].unit == 'meters'){
				var metricDist = CalculateDist(e.coords.latitude, e.coords.longitude, ruleList[i].latitude, ruleList[i].longitude, "M");
				if(ruleList[i].unit == 'meters'){
					metricDist = metricDist * 1000;
				}
			}
		};
	}
}

