function AttView() {	
	var self = Ti.UI.createView({
		backgroundColor:'white',
		width:'100%',
		height:'100%'
	});
	
	var phoneField = Ti.UI.createTextField({
	  color: '#336699',
	  backgroundColor: 'white',
	  borderColor: '#336699',
	  font: {fontSize:20},
	  borderWidth: 1,
	  hintText:'phone number',
	  top: 5, left: 5,
	  width: '95%', height: 60
	});
	self.add(phoneField);
	
	var textContentArea = Ti.UI.createTextArea({
	  borderWidth: 1,
	  borderColor: '#336699',
	  color: '#336699',
	  font: {fontSize:20},
	  textAlign: 'left',
	  hintText: 'text content',
	  top: 70, left: 5,
	  width: '65%', height : 150
	});
	textContentArea.addEventListener('focus', function f(e){
	    textContentArea.blur();
	    textContentArea.removeEventListener('focus', f);
	});
	self.add(textContentArea);
	
	var callButton = Ti.UI.createButton({
	   title: 'Call',
	   top: 100,
	   right: 5,
	   height: 100,
	   width: '30%'
	});
	callButton.addEventListener('click',function(e){
		if(!self.DISABLE_CONTROLS) {
			//AT&T CALL LOGIC
		}
		else {
		}
	});
	self.add(callButton);
	
	self.addEventListener('addAttRule', function(e) {
		self.DISABLE_CONTROLS = true;
		callButton.hide();
	});
	
	self.addEventListener('addAttRuleComplete', function(e) {
		self.DISABLE_CONTROLS = false;
		callButton.show();
	});
	self.fireEvent('addAttRuleComplete', {});
	
	
	
	return self;
};

module.exports = AttView;
