//===============
// RESISTOR MESH
//   --[]=[]--
//===============
function createResistorMesh(){
    let d = 2.54;
    let radialSegments = 10;
    let heightSegments = 1;
    let openEnded = true;

    let bodyLength = 6.0;
    let bodyDiameter = 2.3;
    let leadLength = 28.0; 
    let leadDiameter = 0.4;

    // Materials
    let material = new THREE.MeshLambertMaterial({ 
        color: 0xDEB87A,
        side: THREE.DoubleSide,
        alphaTest: 1,
        transparent: true
    });

    let leadMaterial = new THREE.MeshLambertMaterial({
        color: 0x828F96,
        side: THREE.DoubleSide,
        alphaTest: 1,
        transparent: true
    });

    // center cylinder =
    let cLength = 2.5;
    let cRadius = 1.9/2;
    let centerGeometry = new THREE.CylinderGeometry(cRadius, cRadius, cLength, radialSegments, heightSegments, openEnded);

    // first cone cylinder <
    let c1Length = 0.3;
    let c1RadiusTop = 2.3/2;
    let c1RadiusBottom = 1.9/2;

    let c1Geometry = new THREE.CylinderGeometry(c1RadiusTop, c1RadiusBottom, c1Length, radialSegments, heightSegments, openEnded);
    c1Geometry.translate(0,cLength/2+c1Length/2,0);
    let c1CloneGeometry = c1Geometry.clone();
    c1CloneGeometry.rotateX(Math.PI);

    // head cylinder =
    let cHLength = 1.0;
    let cHRadius = 2.3/2;

    let cHGeometry = new THREE.CylinderGeometry(cHRadius, cHRadius, cHLength, radialSegments, heightSegments, openEnded);
    cHGeometry.translate(0,cLength/2 + c1Length + cHLength/2,0);
    let cHCloneGeometry = cHGeometry.clone();
    cHCloneGeometry.rotateX(Math.PI);

    // second cone cylinder >
    let c2Length = 0.3;
    let c2TopRadius = 1.9/2;
    let c2BottomRadius = 2.3/2;

    let c2Geometry = new THREE.CylinderGeometry(c2TopRadius, c2BottomRadius, c2Length, radialSegments, heightSegments, openEnded);
    c2Geometry.translate(0,cLength/2 + c1Length + cHLength + c2Length/2,0);
    let c2CloneGeometry = c2Geometry.clone();
    c2CloneGeometry.rotateX(Math.PI);

    // Final cone cylinder >
    let cFLength = 0.2;
    let cFTopRadius = 0.4/2;
    let cFBottomRadius = 1.9/2;

    let cFGeometry = new THREE.CylinderGeometry(cFTopRadius, cFBottomRadius, cFLength, radialSegments, heightSegments, openEnded);
    cFGeometry.translate(0,cLength/2 + c1Length + cHLength + c2Length + cFLength/2,0);
    let cFCloneGeometry = cFGeometry.clone();
    cFCloneGeometry.rotateX(Math.PI);

    // Megre geometries
    let groupGeometry = new THREE.Geometry();
    groupGeometry.merge(centerGeometry);
    groupGeometry.merge(c1Geometry);
    groupGeometry.merge(c1CloneGeometry);
    groupGeometry.merge(cHGeometry);
    groupGeometry.merge(cHCloneGeometry);
    groupGeometry.merge(c2Geometry);
    groupGeometry.merge(c2CloneGeometry);
    groupGeometry.merge(cFGeometry);
    groupGeometry.merge(cFCloneGeometry);

    // Create and return mesh
    let mesh = new THREE.Mesh(groupGeometry, material);

    // LEADS
    let tubularSegments = 5;
    let centerLeadLength = d*3 - 1;

    // Center Lead
    let centerLeadPath = new THREE.LineCurve3(
        new THREE.Vector3(0, -centerLeadLength/2, 0),
        new THREE.Vector3(0, centerLeadLength/2, 0)
    );
    let centerLeadGeometry = new THREE.TubeGeometry(centerLeadPath, tubularSegments, 0.2, 8, false);

    // Corner Leads
    let cornerLeadPath = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 0, 0.5, 0 ),
        new THREE.Vector3( 0, 0.5, 0.5 )
    ); 

    let rightCornerLeadGeometry = new THREE.TubeGeometry(cornerLeadPath, tubularSegments, 0.2, 8, false);
    rightCornerLeadGeometry.translate(0,centerLeadLength/2,0);
    let leftCornerLeadGeometry = rightCornerLeadGeometry.clone();
    leftCornerLeadGeometry.rotateZ(Math.PI);

    // Board Lead
    let boardLeadPath = new THREE.LineCurve3(
        new THREE.Vector3(0, centerLeadLength/2 + 0.5, 0.5),
        new THREE.Vector3(0, centerLeadLength/2 + 0.5, 4)
    );
    let rightBoardLeadGeometry = new THREE.TubeGeometry(boardLeadPath, tubularSegments, 0.2, 8, false);
    let leftBoardLeadGeometry = rightBoardLeadGeometry.clone();
    leftBoardLeadGeometry.rotateZ(Math.PI);

    let leadGroupGeometry = new THREE.Geometry();
    leadGroupGeometry.merge(centerLeadGeometry);
    leadGroupGeometry.merge(leftCornerLeadGeometry);
    leadGroupGeometry.merge(rightCornerLeadGeometry);
    leadGroupGeometry.merge(leftBoardLeadGeometry);
    leadGroupGeometry.merge(rightBoardLeadGeometry);

    let leadMesh = new THREE.Mesh(leadGroupGeometry, leadMaterial);    

    let group = new THREE.Group();
    group.add(mesh);
    group.add(leadMesh);

    let pivotPoint = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 5, 5),
        leadMaterial
    );
    pivotPoint.position.set(0, -centerLeadLength/2 - 0.5, 0);
    pivotPoint.Name = "Pivot Point";
    group.add(pivotPoint);

    return group;
}

//=================
// CONNECTION BLOCK
//      ----
//      -()-
//      ----
//=================
function createConnectionBlockMesh(){
    material = new THREE.MeshLambertMaterial({ 
        color: 0xC3A162,
        side: THREE.DoubleSide,
        alphaTest: 1,
        transparent: true
    });

    let width = 2.54;
    let height = 2.54;
    
    // Rectangle shape for extrusion
    let blockShape = new THREE.Shape();
    blockShape.moveTo( 0, 0 );
    blockShape.lineTo( 0, height );
    blockShape.lineTo( width, height );
    blockShape.lineTo( width, 0 );
    blockShape.lineTo( 0, 0 );
    
    // Hole of the block
    let holePath;
    holePath = new THREE.Path();
    holePath.moveTo( 0, 0 );
    holePath.absarc( width/2, width/2, 0.5, 0, Math.PI * 2, true );
    blockShape.holes.push( holePath );
    
    // Extrusion of the block with the hole
    var extrudeSettings = { 
        steps: 2, 
        amount: 2, 
        bevelEnabled: false 
    };
    
    let geometry = new THREE.ExtrudeGeometry( blockShape, extrudeSettings );						
    let blockMesh = new THREE.Mesh( geometry, material );
    blockMesh.name = "PAD";
            
    // Copper ring
    let ringGeometry = new THREE.RingBufferGeometry( 0.5, 1, 32 );
    let ringMaterial = new THREE.MeshLambertMaterial( {color: 0xFCCD23} );
    let ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.set(width/2, width/2, 2.01);
    ringMesh.name = "RING";
    
    // Group for block with hole and copper ring
    let connectionBlockMesh = new THREE.Group();
    connectionBlockMesh.add(blockMesh);
    connectionBlockMesh.add(ringMesh);
    
    return connectionBlockMesh;
}
