//Master View Component Constructor
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var tableData = [
		{title:'NEST', hasChild:true, color: '#CCAC00', font:{fontFamily:'Helvetica Neue',fontSize:22}},
		{title:'WeMo', hasChild:true, color: '#CCAC00', font:{fontFamily:'Helvetica Neue',fontSize:22}}
	];
	
	var latLabel = Ti.UI.createLabel({
		id:'latitudelabel',
		text:'',
		color:'#CCAC00',
		width:250,
		height:'auto',
		top: 5,
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:18
		},
		textAlign:'center'
	});
	self.add(latLabel);

	var longLabel = Ti.UI.createLabel({
		id:'longitudelabel',
		text:'',
		color:'#CCAC00',
		width:250,
		height:'auto',
		top: 25,
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:18
		},
		textAlign:'center'
	});
	self.add(longLabel);

	var table = Ti.UI.createTableView({
		data:tableData,
		top:80
	});
	self.add(table);

	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title
		});
	});
	
	// this will switch on the GPS
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 5;
	Titanium.Geolocation.addEventListener('location',function(e) {
		latLabel.text = e.coords.latitude;
		longLabel.text = e.coords.longitude;
	});
	
	return self;
};

module.exports = MasterView;