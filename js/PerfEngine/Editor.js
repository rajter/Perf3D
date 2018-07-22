class Editor{
	
	constructor(engine, renderer, scene, camera, raycaster){
		this.raycaster = raycaster;
		this.renderer = renderer;
		this.camera = camera;
		this.scene = scene;
		this.engine = engine;

		this.boards = [];
		this.mouse = new THREE.Vector3();

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);

		this.firstClick = null;
		this.secondClick = null;

		this.components = [];

		this.init();
	};

	init(){
		this.addBoard(10,10);
	}

	addBoard(cols, rows){
		let board = new PerfBoard();
		board.createBoard(cols, rows);
		this.boards.push(board);
		this.scene.add(board.mesh);
	}

	onMouseDown(event){				
		this.mouse.set( ( event.layerX / this.renderer.domElement.width ) * 2 - 1, - ( event.layerY / this.renderer.domElement.height ) * 2 + 1, 0.5 ); // z = 0.5 important!

		this.mouse.unproject( this.camera );

		this.raycaster.set( this.camera.position, this.mouse.sub( this.camera.position ).normalize() );
		
		this.intersects = this.raycaster.intersectObjects( this.boards[0].pickHoles );
		
		if(this.intersects.length > 0){			
			let pickedBlock = this.boards[0].getSelectedBlock(this.intersects[0].object);
			pickedBlock.toggleSelection();
			console.log(pickedBlock.getPosition());

			if(this.firstClick == null)
			{
				this.firstClick = pickedBlock.getPosition();
			}
			else if(this.firstClick != null && this.secondClick == null)
			{
				this.secondClick = pickedBlock.getPosition();
			}

			if(this.firstClick != null && this.secondClick != null)
			{
				this.addResistorToBoard(this.firstClick, this.secondClick);
				pickedBlock.toggleSelection();
				this.firstClick = null;
				this.secondClick = null;
			}
			this.engine.render();
		}
		else{
			this.firstClick = null;
			this.secondClick = null;		
		}

	}

	onKeyDown(event){
		if(this.components.length > 0)
		{
			switch(event.key){
				case 'w':
				case 'W':
					this.components[0].moveUp();
					break;
				case 's':
				case 'S':
					this.components[0].moveDown();
					break;
				case 'a':
				case 'A':
					this.components[0].moveLeft();
					break;
				case 'd':
				case 'D':
					this.components[0].moveRight();
					break;
				case 'r':
					this.components[0].rotate();
					break;
				default:				
			}
			this.engine.render();
		}
	}

	addResistorToBoard(m1, m2){
		let n = 2.54;
		let resistorMesh = createResistorMesh();
		resistorMesh.rotateX(Math.PI/2);
		resistorMesh.translateZ(-n/2);
		resistorMesh.translateX(n/2);

		console.log(m1.x);
		//resistorMesh.translateY(n*2);
		resistorMesh.translateY(n*2 +m1.y*n);
		resistorMesh.translateX(m1.x*n);

		let resistor = new PassiveComponent("Type1", "Resistor", "100 ohms", resistorMesh);
		this.components.push(resistor);

		this.scene.add(resistor.Mesh);
	}	
	
}