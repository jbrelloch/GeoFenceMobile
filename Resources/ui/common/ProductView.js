function ProductView() {	
	var self = Ti.UI.createView({
		backgroundColor:'black'
	});
	
	///////CONTROL AREA/////////////////////
	
	var controlView = Ti.UI.createView({
		backgroundColor:'gray',
		top:0,
		width:'100%',
		height:'40%'
	});
	self.add(controlView);
	
	///////RULE AREA////////////////////////
	
	var ruleView = Ti.UI.createView({
		backgroundColor:'yellow',
		bottom:0,
		width:'100%',
		height:'60%'
	});
	var ruleLabel = Ti.UI.createListView({
		color: '#900',
		font: { fontSize:48 },
		shadowColor: '#aaa',
		shadowOffset: {x:5, y:5},
		shadowRadius: 3,
		text: 'Rules',
		top: 2,
		left: 5
	});
	ruleView.add(ruleLabel);
	var addRuleButton = Ti.UI.createListView({
	   title: 'Submit',
	   top: 65,
	   right: 5,
	   width: '25%',
	   height: 60
	});
	addRuleButton.addEventListener('click',function(e){
		
	});
	ruleView.add(addRuleButton);
	var ruleListView = Ti.UI.createListView({
		height:'80%',
		width:'100%',
		bottom:0
	});
	ruleView.add(ruleListView);
	self.add(ruleView);
	
	///////LISTENER AREA////////////////////

	self.addEventListener('itemSelected', function(e) {
		//lbl.text = e.name;
		switch(e.name)
		{
			case 'NEST':
				break;
			case 'WeMo':
				break;
			default:
				break;
		}
	});

	return self;
};

module.exports = ProductView;
