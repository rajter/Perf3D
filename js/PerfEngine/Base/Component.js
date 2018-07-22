class Component{
	
	constructor(type, name, value, mesh){
		this.Type = type;
		this.Name = name;
		this.Value = value;		
		this.Mesh = mesh;

		this.n = 2.54;
	};
	
	moveLeft(){
		let currentPosition = this.Mesh.position.x;
		this.Mesh.position.setX(currentPosition - this.n);
	}

	moveRight(){
		let currentPosition = this.Mesh.position.x;
		this.Mesh.position.setX(currentPosition + this.n);
	}

	moveUp(){
		let currentPosition = this.Mesh.position.z;
		this.Mesh.position.setZ(currentPosition - this.n);
	}

	moveDown(){
		let currentPosition = this.Mesh.position.z;
		this.Mesh.position.setZ(currentPosition + this.n);
	}
	
	rotate(){
		//rotateAboutPoint(this.Mesh, new THREE.Vector3(this.n*3 + this.n/2,0,this.n*3 + this.n/2), new THREE.Vector3(0,1,0), -Math.PI/2);
		console.log("Hand calculated pivot point");
		console.log(new THREE.Vector3(this.n*3 + this.n/2, 0 ,this.n*3 + this.n/2));
		let target = new THREE.Vector3(0,0,0);
		this.Mesh.children[2].getWorldPosition(target);
		
		console.log("Calculated Target");
		console.log(target);
		rotateAboutPoint(this.Mesh, target, new THREE.Vector3(0,1,0), -Math.PI/2);
		this.Mesh.rotateZ(Math.PI/2);
	}
}

// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
function rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
	pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;
  
	if(pointIsWorld){
		obj.parent.localToWorld(obj.position); // compensate for world coordinate
	}
  
	obj.position.sub(point); // remove the offset
	obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
	obj.position.add(point); // re-add the offset
  
	if(pointIsWorld){
		obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
	}
  
	//obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}