class PerfBoard{
	
	constructor(){
		this.width = 2.54;
		this.height = 2.54;
		this.mesh = null;	
		this.holes = [];
		this.pickHoles = [];
		this.connectionBlocks = [];
		
		this.material = new THREE.MeshLambertMaterial({ 
			color: 0xC3A162,
			side: THREE.DoubleSide,
			alphaTest: 1,
			transparent: true
		});

		this.ConnectionBlockMesh = createConnectionBlockMesh();
	};
			
	createBoard(columns, rows){
				
		let board = new THREE.Group();
		
		for( let i = 0; i < columns; i++)
		{
			for( let j = 0; j < rows; j++)
			{				
				let blockMesh = this.ConnectionBlockMesh.clone();
				blockMesh.position.set(this.width * i, this.width * j,0);
				var connectionBlock = new ConnectionBlock(blockMesh);

				board.add(connectionBlock.mesh);

				this.connectionBlocks.push(connectionBlock);
				this.pickHoles.push(connectionBlock.getPad());
			}
		}
		
		board.rotation.set(Math.PI/2,0,0); // Rotate around the x axis to lay down the board
		this.mesh = board;
	}	
	
	getSelectedBlock(o){
		return this.connectionBlocks.find(x => x.id == o.uuid);
	}
	
}