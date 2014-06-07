function NestView() {	
	var self = Ti.UI.createView({
		backgroundColor:'black',
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
		var tempLabel = Ti.UI.createLabel({
				color: 'white',
				font: { fontSize:32 },
				text: '##',
		});
		circle.add(tempLabel);
	self.add(circle);
	
	//LEFT BUTTONS
	var homeButton = Ti.UI.createButton({
	   title: 'home',
	   top: 10,
	   left: 10,
	   height: 50,
	   width: 70
	});
	homeButton.addEventListener('click',function(e){
		
	});
	self.add(homeButton);
	var awayButton = Ti.UI.createButton({
	   title: 'away',
	   top: 61,
	   left: 10,
	   height: 50,
	   width: 70
	});
	awayButton.addEventListener('click',function(e){
		
	});
	self.add(awayButton);
	
	//RIGHT BUTTONS
	var plusButton = Ti.UI.createButton({
	   title: '+',
	   top: 10,
	   right: 10,
	   height: 50,
	   width: 50
	});
	plusButton.addEventListener('click',function(e){
		
	});
	self.add(plusButton);
	var minusButton = Ti.UI.createButton({
	   title: '-',
	   top: 61,
	   right: 10,
	   height: 50,
	   width: 50
	});
	minusButton.addEventListener('click',function(e){
		
	});
	self.add(minusButton);

	return self;
};

module.exports = NestView;
