function NestView() {	
	var self = Ti.UI.createView({
		backgroundColor:'white',
		width:'100%',
		height:'100%'
	});
	
	var circle = Ti.UI.createImageView({
            width: 140,
            height: 140,
            borderRadius: 70,
            borderColor: 'blue',
            backgroundColor: 'blue'
	});
	self.add(circle);
	
	var tempLabel = Ti.UI.createLabel({
			color: 'white',
			font: { fontSize:32 },
			text: '##',
	});
	self.add(tempLabel);
	
	//LEFT BUTTONS
	var homeButton = Ti.UI.createButton({
	   title: 'home',
	   top: 60,
	   left: 25,
	   height: 50,
	   width: 70
	});
	homeButton.addEventListener('click',function(e){
		
	});
	self.add(homeButton);
	var awayButton = Ti.UI.createButton({
	   title: 'away',
	   top: 111,
	   left: 25,
	   height: 50,
	   width: 70
	});
	awayButton.addEventListener('click',function(e){
		
	});
	self.add(awayButton);
	
	//RIGHT BUTTONS
	var plusButton = Ti.UI.createButton({
	   title: '+',
	   top: 60,
	   right: 35,
	   height: 50,
	   width: 50
	});
	plusButton.addEventListener('click',function(e){
		
	});
	self.add(plusButton);
	var minusButton = Ti.UI.createButton({
	   title: '-',
	   top: 111,
	   right: 35,
	   height: 50,
	   width: 50
	});
	minusButton.addEventListener('click',function(e){
		
	});
	self.add(minusButton);

	return self;
};

module.exports = NestView;
