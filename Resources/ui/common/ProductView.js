function ProductView() {
	//declare module dependencies
	var AddRuleView = require('ui/common/AddRuleView');
	var NestView = require('ui/common/NestView');
	var WeMoView = require('ui/common/WeMoView');
	
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	///////CONTROL AREA/////////////////////
	
	var controlView = Ti.UI.createView({
		backgroundColor:'white',
		top:0,
		width:'100%',
		height:'40%'
	});
	self.add(controlView);
	
	///////RULE AREA////////////////////////
	
	var ruleView = Ti.UI.createView({
		backgroundColor:'white',
		bottom:0,
		width:'100%',
		height:'60%'
	});
		var ruleListHeaderView = Ti.UI.createView({
			height:'20%',
			width:'100%',
			top:0,
			backgroundColor:'#CCAC00'
		});
			var ruleLabel = Ti.UI.createLabel({
				color: 'black',
				font: { fontSize:48 },
				shadowColor: '#998100',
				shadowOffset: {x:5, y:5},
				shadowRadius: 3,
				text: 'Rules',
				top: 2,
				left: 5
			});
			ruleListHeaderView.add(ruleLabel);
			var addRuleButton = Ti.UI.createButton({
			   title: '+',
			   top: 2,
			   right: 5,
			   height: 48
			});
			addRuleButton.addEventListener('click',function(e){
				var addRuleView = AddRuleView(ruleView);
				ruleView.add(addRuleView);
			});
			ruleListHeaderView.add(addRuleButton);
		ruleView.add(ruleListHeaderView);
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
				var nestView = NestView();
				controlView.add(nestView);
				break;
			case 'WeMo':
				var weMoView = WeMoView();
				controlView.add(weMoView);
				break;
			default:
				break;
		}
	});

	return self;
};

module.exports = ProductView;
