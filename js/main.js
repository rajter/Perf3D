var engine;

function mainFunction(){
	
	var resistor1 = new PassiveComponent(COMPONENTTYPE.Passive, "resistor1", "100 Ohms");
	console.log(resistor1);
	
	engine = new Engine(document.getElementById("engineContainer"));
};