class ConnectionBlock{
	
	constructor(mesh){
		this.width = 2.54;
		this.height = 2.54;
		
		this.selected = false;
		
		this.material = new THREE.MeshLambertMaterial({ 
			color: 0xC3A162,
			side: THREE.DoubleSide,
			alphaTest: 1,
			transparent: true
		});
		
		this.selectedMaterial = new THREE.MeshLambertMaterial({ 
			color: 0xF17DE9,
			side: THREE.DoubleSide,
			alphaTest: 1,
			transparent: true
		});
		
		this.mesh = mesh;
		this.id = this.mesh.children.find(x => x.name == "PAD").uuid;
				
		this.toggleSelection = function(){
			this.selected = !this.selected;
			this.mesh.children.find(x => x.name == "PAD").material = this.selected == false ? this.material : this.selectedMaterial;
		}
	};
		
	getPad(){
		return this.mesh.children.find(x => x.name == "PAD");
	}

	getPosition(){
		let position = this.mesh.position.clone();
		position.x /= this.width;
		position.y /= this.width;
		position.z /= this.width;
		return position;
	}
}