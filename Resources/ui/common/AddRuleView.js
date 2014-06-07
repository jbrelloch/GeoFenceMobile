function AddRuleView(parentView) {	
	var self = Ti.UI.createView({
		backgroundColor:'#CCAC00',
		width:'100%',
		height:'100%'
	});
	
	var latitudeField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  borderWidth: 1,
	  hintText:'latitude',
	  top: 5, left: 5,
	  width: '70%', height: 60
	});
	self.add(latitudeField);
	
	var longitudeField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  borderWidth: 1,
	  hintText:'longitude',
	  top: 70, left: 5,
	  width: '70%', height: 60
	});
	self.add(longitudeField);
	
	var radiusField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  borderWidth: 1,
	  hintText:'radius',
	  top: 135, left: 5,
	  width: '45%', height: 60
	});
	self.add(radiusField);
	
	var unitPicker = Ti.UI.createPicker({
	  color: '#336699',
	  borderColor: '#336699',
	  borderWidth: 1,
	  top:135, right: 5,
	  width: '45%', height: 60
	});
	var distAbbrdata = [];
	distAbbrdata[0]=Ti.UI.createPickerRow({title:'mi'});
	distAbbrdata[1]=Ti.UI.createPickerRow({title:'ft'});
	distAbbrdata[2]=Ti.UI.createPickerRow({title:'km'});
	distAbbrdata[3]=Ti.UI.createPickerRow({title:'m'});
	unitPicker.add(distAbbrdata);
	unitPicker.selectionIndicator = true;
	self.add(unitPicker);
	unitPicker.setSelectedRow(0, 1, false);
	
	var addButton = Ti.UI.createButton({
	   title: 'Add',
	   bottom: 2,
	   left: 5,
	   height: 48
	});
	addButton.addEventListener('click',function(e){
		
	});
	self.add(addButton);
			
	var cancelButton = Ti.UI.createButton({
	   title: 'Cancel',
	   bottom: 2,
	   right: 5,
	   height: 48
	});
	cancelButton.addEventListener('click',function(e){
		parentView.remove(self);
	});
	self.add(cancelButton);
	
	return self;
};

module.exports = AddRuleView;