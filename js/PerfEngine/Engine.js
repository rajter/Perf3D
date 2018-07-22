class Engine{
	
	constructor(containerEl){
		this.board = null;
		this.editor = null;

		this.testComponent = null;
		
		this.container = containerEl;
		
		this.onWindowResize = this.onWindowResize.bind(this);

		this.render = this.render.bind(this);
		
		this.mouse = new THREE.Vector3();
		this.intersects = null;
		
		this.renderer = null;
		this.raycaster = null;
		this.projector = null;
		this.scene = null;
		this.camera = null;
		this.cameraController = null;
		this.lights = {};			
		
		this.initEngine();
		this.initLights();
		this.initListeners();
		
		//this.testDraw();
		
		this.initRender();
		
		this.firstClick = null;
		this.secondClick = null;
	};
	
	
	initEngine() {
        var viewWidth = this.container.offsetWidth;
        var viewHeight = this.container.offsetHeight-6;
        
        // create the scene
        this.scene = new THREE.Scene();
		
		// create camera
		this.camera = new THREE.PerspectiveCamera( 75, viewWidth / viewHeight, 0.1, 10000 );
		this.camera.position.set(0, 5, 10);
		this.camera.updateProjectionMatrix();
		
        // instantiate the WebGL Renderer
        this.renderer = new THREE.WebGLRenderer({
			alpha: true,
            antialias: true
        });
        this.renderer.setSize(viewWidth / viewHeight);
		this.renderer.localClippingEnabled = true;
        this.container.appendChild(this.renderer.domElement);		
		
		// create camera controlls
		this.cameraController = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.cameraController.addEventListener( 'change', this.render ); // remove when using animation loop			
		
		var axesHelper = new THREE.AxesHelper( 5 );
		this.scene.add( axesHelper );

		// Raycasting for picking
		this.raycaster = new THREE.Raycaster();
		
		// ======
		// EDITOR
		// ======
		this.editor = new Editor(this, this.renderer, this.scene, this.camera, this.raycaster);
		
    }
	
	initLights(){	
		this.scene.add(new THREE.AmbientLight( 0x555555 ));	
		
		var spotLight = new THREE.SpotLight( 0xffffff );
		spotLight.position.set( -500,500,300 );
		spotLight.intensity = 0.7;
		
		this.scene.add( spotLight );
		
		//var spotLightHelper = new THREE.SpotLightHelper( spotLight );
		//this.scene.add( spotLightHelper );
		
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
		directionalLight.position.set(0,100,0);
		this.scene.add( directionalLight );

		var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight2.position.set(0,-100,0);
		this.scene.add( directionalLight2 );

		//var directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
		//this.scene.add(directionalLightHelper);
	}
	
	initListeners(){
		window.addEventListener( 'resize', this.onWindowResize);

		if(this.editor != null)
		{
			document.addEventListener( 'mousedown', this.editor.onMouseDown);
			document.addEventListener('keydown', this.editor.onKeyDown);
		}
	}
	
	initRender(){
		var viewWidth = this.container.offsetWidth;
        var viewHeight = this.container.offsetHeight-6;
		this.renderer.setSize( viewWidth, viewHeight );
		this.renderer.render( this.scene, this.camera );
	}
			
	render() {		
		this.renderer.render( this.scene, this.camera );
	}	
	
	onWindowResize() {
		var viewWidth = this.container.offsetWidth;
		var viewHeight = this.container.offsetHeight-6;
		
		//var viewWidth = this.renderer.domElement.width;
		//var viewHeight = this.renderer.domElement.height;
		
		this.camera.aspect = viewWidth / viewHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( viewWidth, viewHeight );
		this.render();
	}
}