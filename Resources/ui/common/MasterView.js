//Master View Component Constructor
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var controlHeaderView = Ti.UI.createView({
		backgroundColor:'#CCAC00',
		top:0,
		width:'100%',
		height:'20%'
	});
		var homeButton = Ti.UI.createButton({
		   title: 'home',
		   left: 10,
		   height: 50,
		   width: 70
		});
		homeButton.addEventListener('click',function(e){
			
		});
		controlHeaderView.add(homeButton);
		var titleLabel = Ti.UI.createLabel({
				color: 'black',
				font: { fontSize:48 },
				shadowColor: '#998100',
				shadowOffset: {x:5, y:5},
				shadowRadius: 3,
				text: 'Devices'
		});
		controlHeaderView.add(titleLabel);
		var awayButton = Ti.UI.createButton({
		   title: 'away',
		   right: 10,
		   height: 50,
		   width: 70
		});
		awayButton.addEventListener('click',function(e){
			
		});
		controlHeaderView.add(awayButton);
	self.add(controlHeaderView);
	
	var tableData = [
		{title:'At&t', hasChild:true, color: 'black', font:{fontFamily:'Helvetica Neue',fontSize:32}},
		{title:'NEST', hasChild:true, color: 'black', font:{fontFamily:'Helvetica Neue',fontSize:32}},
		{title:'WeMo', hasChild:true, color: 'black', font:{fontFamily:'Helvetica Neue',fontSize:32}}
	];
	
	// var latLabel = Ti.UI.createLabel({
		// id:'latitudelabel',
		// text:'',
		// color:'#CCAC00',
		// width:250,
		// height:'auto',
		// top: 5,
		// font:{
			// fontFamily:'Helvetica Neue',
			// fontSize:18
		// },
		// textAlign:'center'
	// });
	// self.add(latLabel);

	// var longLabel = Ti.UI.createLabel({
		// id:'longitudelabel',
		// text:'',
		// color:'#CCAC00',
		// width:250,
		// height:'auto',
		// top: 25,
		// font:{
			// fontFamily:'Helvetica Neue',
			// fontSize:18
		// },
		// textAlign:'center'
	// });
	// self.add(longLabel);

	var table = Ti.UI.createTableView({
		data:tableData,
		height:'80%',
		width:'100%',
		bottom:0,
		backgroundColor:'white',
    	separatorColor :'#E0CD66'
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
	// Titanium.Geolocation.addEventListener('location',function(e) {
		// latLabel.text = e.coords.latitude;
		// longLabel.text = e.coords.longitude;
	// });
	
	return self;
};

module.exports = MasterView;