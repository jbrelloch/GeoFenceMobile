function AddRuleView(parentView, parentsParentView, controlView) {	
	//declare module dependencies
	var FinderView = require('ui/common/FinderView');
	
	var self = Ti.UI.createView({
		backgroundColor:'#CCAC00',
		width:'100%',
		height:'100%'
	});
	
	var nameField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  borderWidth: 1,
	  hintText:'zone name',
	  top: 5,
	  width: '70%', height: 40
	});
	self.add(nameField);
	
	var latitudeField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  borderWidth: 1,
	  hintText:'latitude',
	  top: 50, left: 5,
	  width: '70%', height: 40
	});
	self.add(latitudeField);
	
	var longitudeField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  borderWidth: 1,
	  hintText:'longitude',
	  top: 95, left: 5,
	  width: '70%', height: 40
	});
	self.add(longitudeField);
	
	var findLatLongButton = Ti.UI.createButton({
	   title: 'Find',
	   top: 50,
	   right: 5,
	   height: 85,
	   width: '25%'
	});
	findLatLongButton.addEventListener('click',function(e){
		var finderView = FinderView(latitudeField, longitudeField, parentsParentView);
		// var finderContainerView = Ti.UI.createView({
			// backgroundColor:'transparent',
			// height: '100%',
			// width: '100%'
		// });
		// finderContainerView.add(finderView);
		parentsParentView.add(finderView);
	});
	self.add(findLatLongButton);
	
	var radiusField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  borderWidth: 1,
	  hintText:'radius',
	  top: 140, left: 5,
	  width: '45%', height: 40
	});
	self.add(radiusField);
	
	var unitPicker = Ti.UI.createPicker({
	  color: '#336699',
	  borderColor: '#336699',
	  borderWidth: 1,
	  top:140, right: 5,
	  width: '45%', height: 40
	});
	var distAbbrdata = [];
	distAbbrdata[0]=Ti.UI.createPickerRow({title:'miles'});
	distAbbrdata[1]=Ti.UI.createPickerRow({title:'feet'});
	distAbbrdata[2]=Ti.UI.createPickerRow({title:'kilometers'});
	distAbbrdata[3]=Ti.UI.createPickerRow({title:'meters'});
	unitPicker.add(distAbbrdata);
	unitPicker.selectionIndicator = true;
	self.add(unitPicker);
	unitPicker.setSelectedRow(0, 1, false);
	
	var zonePicker = Ti.UI.createPicker({
	  color: '#336699',
	  borderColor: '#336699',
	  borderWidth: 1,
	  top:185,
	  width: '40%', height: 40
	});
	var zonedata = [];
	zonedata[0]=Ti.UI.createPickerRow({title:'inside zone'});
	zonedata[1]=Ti.UI.createPickerRow({title:'outside zone'});
	zonePicker.add(zonedata);
	zonePicker.selectionIndicator = true;
	self.add(zonePicker);
	zonePicker.setSelectedRow(0, 1, false);
	
	var addButton = Ti.UI.createButton({
	   title: 'Add',
	   top: 225,
	   right: 5,
	   height: 50,
	   width: 100
	});
	addButton.addEventListener('click',function(e){
		var missing = false;
		if(nameField.value == null || nameField.value == '') {
			nameField.borderColor = 'red';
			nameField.borderWidth= 2;
			missing = true;
		}
		if(latitudeField.value == null || latitudeField.value == '') {
			latitudeField.borderColor = 'red';
			latitudeField.borderWidth= 2;
			missing = true;
		}
		if(longitudeField.value == null || longitudeField.value == '') {
			longitudeField.borderColor = 'red';
			longitudeField.borderWidth= 2;
			missing = true;
		}
		if(radiusField.value == null || radiusField.value == '') {
			radiusField.borderColor = 'red';
			radiusField.borderWidth= 2;
			missing = true;
		}
		
		if(!missing) {
			var ruleList = Ti.App.Properties.getList('RuleList', []);
			
			var rule = {
				device: parentsParentView.SELECTED_DEVICE,
				latitude: latitudeField.value,
				longitude: longitudeField.value,
				radius: radiusField.value,
				unit: unitPicker.getSelectedRow(0).title,
				zone: zonePicker.getSelectedRow(0).title,
				currentZone: '',
				name: nameField.value
			};
			switch(parentsParentView.SELECTED_DEVICE)
			{
				case 'Att':
					controlView.fireEvent('addAttRuleComplete', {});
					break;
				case 'Nest':
					var homeBut = {};
					var awayBut = {};
					var tempLbl = {};
					for(var i = 0; i < controlView.children.length; i++){
						if(controlView.children[i].id == "homeButton"){
							homeBut = controlView.children[i];
						}
						else if(controlView.children[i].id == "awayButton"){
							awayBut = controlView.children[i];
						}
						else if(controlView.children[i].id == "tempLabel"){
							tempLbl = controlView.children[i];
						}
					}
					if(homeBut.backgroundColor == 'blue') {
						rule.SetStatus = "home";
					}
					else if(awayBut.backgroundColor == 'blue') {
						rule.SetStatus = "away";
					}
					else {
						rule.SetTemp = tempLbl.text;
					}
			
					controlView.fireEvent('addNestRuleComplete', {});
					break;
				case 'WeMo':
					var onBut = {};
					var offBut = {};
					for(var i = 0; i < controlView.children.length; i++){
						if(controlView.children[i].id == "onButton"){
							onBut = controlView.children[i];
						}
						else if(controlView.children[i].id == "offButton"){
							offBut = controlView.children[i];
						}
					}
					if(onBut.backgroundColor == 'blue') {
						rule.TurnOnOff = "on";
					}
					else if(offBut.backgroundColor == 'blue') {
						rule.TurnOnOff = "off";
					}
					controlView.fireEvent('addWeMoRuleComplete', {});
					break;
				default:
					break;
			}
			
			ruleList.push(rule);
			
			Ti.App.Properties.setList('RuleList', ruleList);
			
			parentsParentView.fireEvent('refreshRuleList', {
				device: parentsParentView.SELECTED_DEVICE
			});
			
			parentView.remove(self);
		}
	});
	self.add(addButton);
			
	var cancelButton = Ti.UI.createButton({
	   title: 'Cancel',
	   top: 225,
	   left: 5,
	   height: 50,
	   width: 100
	});
	cancelButton.addEventListener('click',function(e){
		switch(parentsParentView.SELECTED_DEVICE)
		{
			case 'At&t':
				controlView.fireEvent('addAttRuleComplete', {});
				break;
			case 'Nest':
				controlView.fireEvent('addNestRuleComplete', {});
				break;
			case 'WeMo':
				controlView.fireEvent('addWeMoRuleComplete', {});
				break;
			default:
				break;
		}
		parentView.remove(self);
	});
	self.add(cancelButton);
	
	return self;
};

module.exports = AddRuleView;