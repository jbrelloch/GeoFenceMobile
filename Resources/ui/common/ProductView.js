function ProductView() {
	//declare module dependencies
	var AddRuleView = require('ui/common/AddRuleView');
	var NestView = require('ui/common/NestView');
	var WeMoView = require('ui/common/WeMoView');
	var AttView = require('ui/common/AttView');
	
	var self = Ti.UI.createScrollView({
		backgroundColor:'white'
	});
	
	///////HEADER AREA/////////////////////
	
	var headerView = Ti.UI.createView({
		height:'10%',
		width:'100%',
		top:0,
		backgroundColor:'#CCAC00'
	});
		var titleLabel = Ti.UI.createLabel({
			color: 'black',
			font: { fontSize:48 },
			shadowColor: '#998100',
			shadowOffset: {x:5, y:5},
			shadowRadius: 3,
			text: 'ERROR',
			left: 5
		});
		headerView.add(titleLabel);
	self.add(headerView);
	
	///////CONTROL AREA/////////////////////
	
	var controlView = Ti.UI.createView({
		backgroundColor:'white',
		top:'10%',
		width:'100%',
		height:'40%'
	});
	self.add(controlView);
	
	///////RULE AREA////////////////////////
	
	var ruleView = Ti.UI.createView({
		backgroundColor:'white',
		bottom:0,
		width:'100%',
		height:'50%'
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
				left: 5
			});
			ruleListHeaderView.add(ruleLabel);
			var addRuleButton = Ti.UI.createButton({
			   title: 'add',
			   right: 5,
			   height: 48
			});
			addRuleButton.addEventListener('click',function(e){
				self.SELECTED_CONTROL_VIEW.fireEvent('add'+self.SELECTED_DEVICE+'Rule',{});
				var addRuleView = AddRuleView(ruleView, self, self.SELECTED_CONTROL_VIEW);
				ruleView.add(addRuleView);
			});
			ruleListHeaderView.add(addRuleButton);
		ruleView.add(ruleListHeaderView);
		var ruleTableView = Ti.UI.createTableView({
			height:'80%',
			width:'100%',
			bottom:0,
			backgroundColor:'white',
	    	separatorColor :'#E0CD66'
		});
		ruleView.add(ruleTableView);
	self.add(ruleView);
	
	///////LISTENER AREA////////////////////

	self.addEventListener('refreshRuleList', function(e) {
		var ruleList = Ti.App.Properties.getList('RuleList', []);
		
		var data = [];
		
		for(var i=0; i<ruleList.length; i++){
			if(ruleList[i].device == self.SELECTED_DEVICE) {
				dataEntry = {
					title:ruleList[i].name,
					//subtitle:'Radius: '+ruleList[i].radius+' '+ruleList[i].unit,
					hasChild:true, 
					color: 'black', 
					font:{
						fontFamily:'Helvetica Neue',
						fontSize:32
					}
				};
				data.push(dataEntry);
			}
		};
		
		ruleTableView.data = data;
	});

	self.addEventListener('itemSelected', function(e) {
		titleLabel.text = e.name;
		self.SELECTED_DEVICE = e.name;
		switch(e.name)
		{
			case 'At&t':
				var attView = AttView();
				self.SELECTED_CONTROL_VIEW = attView;
				controlView.add(attView);
				break;
			case 'Nest':
				var nestView = NestView();
				self.SELECTED_CONTROL_VIEW = nestView;
				controlView.add(nestView);
				break;
			case 'WeMo':
				var weMoView = WeMoView();
				self.SELECTED_CONTROL_VIEW = weMoView;
				controlView.add(weMoView);
				break;
			default:
				break;
		}
		
		self.fireEvent('refreshRuleList', {
			device: e.name
		});
	});

	return self;
};

module.exports = ProductView;
