function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		ProductView = require('ui/common/ProductView');

	//create object instance
	var self = Ti.UI.createWindow({
		title:'Products',
		exitOnClose:true,
		navBarHidden:true,
		backgroundColor:'#ffffff'
	});

	//construct UI
	var masterView = MasterView();
	self.add(masterView);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		var productView = ProductView();
		var productContainerWindow = Ti.UI.createWindow({
			title:'Details',
			navBarHidden:true,
			backgroundColor:'#ffffff'
		});
		productContainerWindow.add(productView);
		productView.fireEvent('itemSelected',e);
		productContainerWindow.open();
	});
	
	/////////////////SERVICE///////////////////////
	
	
	return self;
};

module.exports = ApplicationWindow;
