function loadResistorFromJSON(){
    
    let m = new THREE.MeshLambertMaterial({ 
        color: 0xDEB87A,
        side: THREE.DoubleSide,
        alphaTest: 1,
        transparent: true
    }); 

    var loader = new THREE.ObjectLoader();

    loader.load( 'assets/3DModels/Resistor.json', function ( object ) {
        object.children.forEach(function(e){
            e.material = m;
        });

        return object;
    });
}