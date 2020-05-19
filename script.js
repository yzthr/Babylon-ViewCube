var currentTarget = null;
var targetIndicator = null;
var targetIndicatorLine = null;
var targetIndicatorLinePreview = null;
var targetIndicatorColor = new BABYLON.Color3(0, 0.5, 0);
$(document).ready(function(){
	var canvas = document.getElementById("renderCanvas");

	var scene = createScene(canvas);

	$('#toggleDebugLayer').click(function(){
		if(scene.debugLayer._enabled){
			scene.debugLayer.hide();
		} else {
			scene.debugLayer.show();
		}
	})


});

var createScene = function (canvas) {
	var engine = new BABYLON.Engine(canvas, true);
	var scene = new BABYLON.Scene(engine);

	// create camera
	var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI/2 , Math.PI/4, 50, new BABYLON.Vector3(0, 0, 5), scene);
	//camera.upperBetaLimit = 1;
	camera.lowerRadiusLimit = 4;
	camera.attachControl(canvas, true);
	scene.activeCamera = camera;

	// create directional light
	var light = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
	light.intensity = 0.3;

	var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
	fireTexture.speed = new BABYLON.Vector2(0.00001, 0.00001);
	//console.log(fireTexture.fireColors);
	//console.log(fireTexture.alphaThreshold);
	
	fireTexture.fireColors = [
		new BABYLON.Color3(1,0.1,0),
		new BABYLON.Color3(1,0.1,0),
		new BABYLON.Color3(1,0,0),
		new BABYLON.Color3(1,0.5,0.4),
		new BABYLON.Color3(1,0.1,0),
		new BABYLON.Color3(1,0,0)
	];

	// create sun - "God Rays" effect (volumetric light scattering)
	var sunLight = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);
	var sun = BABYLON.Mesh.CreateSphere('sun', 16, 1500, scene);
	sun.rotation.y = Math.PI;
	sun.rotation.x = -Math.PI/8;
	material = new BABYLON.StandardMaterial('sunMaterial', scene);
	material.diffuseTexture = fireTexture;
	sun.material = material;

	var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, sun, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
	/*
	var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 0.8, camera, null, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
	godrays.mesh.material.diffuseTexture = new BABYLON.Texture('textures/sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
	godrays.mesh.material.diffuseTexture.hasAlpha = true;

	godrays.mesh.scaling = new BABYLON.Vector3(2000, 2000, 2000);
	*/
	godrays.mesh.position = new BABYLON.Vector3(-4500, -100, 4500);

	sunLight.position = godrays.mesh.position;

	// create ground for spaceship navigation
	var precision = {
		"w" : 1,
		"h" : 1
	};
	var subdivisions = {
		'h' : 100,
		'w' : 100
	};
	var ground = BABYLON.Mesh.CreateTiledGround("ground1", -500, -500, 500, 500, subdivisions, precision, scene);
	ground.material = new BABYLON.StandardMaterial('mat', scene);
	ground.material.specularColor = BABYLON.Color3.Black();
	ground.material.alpha = 0;
	ground.visibility = 0;

	// create starbox
	var starbox = BABYLON.Mesh.CreateBox("starbox", 10000, scene);
	var starboxMaterial = new BABYLON.StandardMaterial("starbox material", scene);
	starboxMaterial.backFaceCulling = false;
	starboxMaterial.reflectionTexture = new BABYLON.CubeTexture("starbox/stars", scene);
	starboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	starboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	starboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	starbox.material = starboxMaterial;

	// create environment
	createNebulas(scene);
	createPlanets(scene);
	createStars(2000, scene);

	// create spacecraft
	var spacecraft;
	BABYLON.SceneLoader.ImportMesh("space_frig", "assets/", "space_frigate.babylon", scene, function (newMeshes, particleSystems) {
		spacecraft = newMeshes[0];

		spacecraft.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
		spacecraft.material.specularColor = new BABYLON.Color3(1, 1, 1);

		spacecraft.receiveShadows = true;

		spacecraft.checkCollisions = true;
		spacecraft.ellipsoid = new BABYLON.Vector3(1, 1, 1);
		spacecraft.ellipsoidOffset = new BABYLON.Vector3(0, 5, 0);

		spacecraft.material.bumpTexture = new BABYLON.Texture('assets/space_frigate_6_normalmap.png', scene);
		spacecraft.material.specularTexture = new BABYLON.Texture('assets/space_frigate_6_specular.png', scene);
		spacecraft.material.emissiveTexture = new BABYLON.Texture('assets/space_frigate_6_illumination.png', scene);

		createSpacecraftEngine(spacecraft, scene);
		createSpacecraftLaserEmitter(spacecraft, scene);

		camera.target = spacecraft;
	});

	// create asteroids
	var asteroids = [];
	BABYLON.SceneLoader.ImportMesh("Asteroid", "assets/", "asteroid.babylon", scene, function (newMeshes, particleSystems) {
		var asteroid = newMeshes[0];
		var numberOfAsteroid = 500;

		asteroid.material.bumpTexture = new BABYLON.Texture('textures/asteroid_normalmap.jpg', scene);
		asteroid.material.backFaceCulling = false;
		asteroid.material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
		asteroid.position.x = -10;
		asteroid.isTargetable = true;

		asteroid.customOutline = asteroid.clone('customAsteroidOutline');
		asteroid.customOutline.isVisible = false;
		asteroid.customOutline.scaling = new BABYLON.Vector3(1.1, 1.1, 1.1);
		asteroid.customOutline.material = new BABYLON.StandardMaterial('outlineMaterial', scene);
		asteroid.customOutline.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
		asteroid.customOutline.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
		asteroid.customOutline.material.specularColor = new BABYLON.Color3(0,0,0);
		asteroid.customOutline.material.alpha = 0.7;

		asteroid.isTargetable = true;
		initTargetableActions(asteroid, asteroid.customOutline, scene);


		for(i=0; i<numberOfAsteroid; i++) {
			var asteroidInstance = asteroid.createInstance('Asteroid-' + i);
			asteroidInstance.position = new BABYLON.Vector3(
				Math.round(Math.random() * 1000) - 500,
				Math.round(Math.random() * 30) - 15,
				Math.round(Math.random() * 1000) - 500
			);
			asteroidInstance.rotationSpeed = Math.random() * 0.03;
			asteroidInstance.rotationDirection = Math.ceil(Math.random()*6);

			asteroidInstance.isTargetable = true;
			initTargetableActions(asteroidInstance, asteroid.customOutline, scene);

			asteroids.push(asteroidInstance);
		}

	});

	// create event listeners
	window.addEventListener("mousedown", function (e) {

		if (e.target.id == 'renderCanvas') {
			var pickResult = scene.pick(scene.pointerX, scene.pointerY);

			if(pickResult.pickedMesh.isTargetable || e.button == 0) {
				camera.detachControl(canvas);
			}
		}

	});

	var targetToTurnTo = false;
	var movementTargetPoint = null;
	window.addEventListener("mouseup", function (e) {

		if (e.target.id == 'renderCanvas' && e.button == 0) {

			var pickResult;
			pickResult = scene.pick(scene.pointerX, scene.pointerY, function(mesh){
				return mesh.isTargetable;
			});

			if (pickResult.hit) {

				clearTargetIndicator();
				movementTargetPoint = null;
				targetToTurnTo = pickResult.pickedMesh; // spacecraft will be turned to this point and then fires laser

			} else {

				pickResult = scene.pick(scene.pointerX, scene.pointerY);
				if (pickResult.pickedPoint) {
					// set spacecraft target
					movementTargetPoint = pickResult.pickedPoint;
					if (targetIndicator) {
						targetIndicator.dispose();
					}
					targetIndicator = BABYLON.Mesh.CreateSphere('targetIndicator', 1, 0.7, scene);
					targetIndicator.scaling.y = 0.01;
					targetIndicator.material = new BABYLON.StandardMaterial('indicatiorMaterial', scene);
					targetIndicator.material.emissiveColor = targetIndicatorColor;
					targetIndicator.position = movementTargetPoint.clone();
				}

			}

			camera.attachControl(canvas, true);

		}

	});

	// Watch for browser/canvas resize events
	window.addEventListener("resize", function () {
		engine.resize();
	});

	var cursor = null;
	var cursorMaterial = new BABYLON.StandardMaterial('cursorMaterial', scene);
	cursorMaterial.emissiveColor = targetIndicatorColor;
	cursor = BABYLON.Mesh.CreateSphere('targetIndicator', 1, 0.3, scene);
	cursor.scaling.y = 0.01;
	cursor.material = cursorMaterial;
	scene.registerBeforeRender(function () {

		// face target for shooting
		if(targetToTurnTo){
			var turnDone = faceTarget(spacecraft, targetToTurnTo);
			if(turnDone){
				shootLaser(spacecraft, targetToTurnTo, scene);
				targetToTurnTo = null;
			}
		}

		// move spaceship
		if (movementTargetPoint) {
			facePoint(spacecraft, movementTargetPoint);
			moveForward(spacecraft, movementTargetPoint, scene);
		}

		for(i=0; i<asteroids.length; i++) {
			var direction = asteroids[i].rotationDirection;

			// rotate asteroids
			if(direction >= 3 || direction == 1) {
				asteroids[i].rotation.x += asteroids[i].rotationSpeed;
			}
			if(direction >= 4 || direction == 2) {
				asteroids[i].rotation.y += asteroids[i].rotationSpeed;
			}
			if(direction >= 5 || direction == 3) {
				asteroids[i].rotation.z += asteroids[i].rotationSpeed;
			}

			// move asteroid slightly
			if(direction >= 3 || direction == 1) {
				asteroids[i].position.x += asteroids[i].rotationSpeed;
			}
			if(direction >= 5 || direction == 3) {
				asteroids[i].position.z += asteroids[i].rotationSpeed;
			}
		}

		// move cursor
		var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function(mesh){
			return mesh == ground;
		});
		if (scene && spacecraft && pickInfo.hit) {
			// place cursor marker
			cursor.position = pickInfo.pickedPoint;

			// show movement direction/attack line
			if(targetIndicatorLinePreview){
				targetIndicatorLinePreview.dispose();
			}
			targetIndicatorLinePreview = BABYLON.Mesh.CreateDashedLines('targetIndicator', [
				spacecraft.position,
				pickInfo.pickedPoint
			], 1, 1, Math.round(spacecraft.position.subtract(pickInfo.pickedPoint).length()/2), scene);

			// decide line color
			if(currentTarget){
				targetIndicatorLinePreview.color = new BABYLON.Color3(0.7, 0, 0);
			} else {
				targetIndicatorLinePreview.color = targetIndicatorColor;
			}
		}

	});

	engine.runRenderLoop(function () {
		scene.render();
	});

	return scene;

};

/*
 * FUNCTIONS
 */

/**
 * @param rotatingObject
 * @param pointToRotateTo
 * @returns {boolean}
 */
function facePoint(rotatingObject, pointToRotateTo) {

	// a directional vector from one object to the other one
	var direction = pointToRotateTo.subtract(rotatingObject.position);
	var distanceToTargetPoint = direction.length();

	if(distanceToTargetPoint > 0.5) {

		var axisVectorY = new BABYLON.Vector3(0, 0, 1);
		var directionAxisForY = 'x';
		var deltaY = calculateRotationDeltaForAxis(rotatingObject, 'y', axisVectorY, direction, directionAxisForY);

		var axisVectorZ = new BABYLON.Vector3(0, 1, 0);
		var directionAxisForZ = 'z';
		var deltaZ = calculateRotationDeltaForAxis(rotatingObject, 'z', axisVectorZ, direction, directionAxisForZ);

		var turnAroundYAxisDone = applyRotationForAxis(rotatingObject, 'y', deltaY);
		var turnAroundZAxisDone = applyRotationForAxis(rotatingObject, 'z', deltaZ);

		return (turnAroundYAxisDone && turnAroundZAxisDone) ? true : false;

	}
}

function faceTarget(rotatingObject, target){
	return facePoint(rotatingObject, target.position);
}

function calculateRotationDeltaForAxis(rotatingObject, axis, axisVector, direction, directionAxis){
	var axisVectorNormalized = axisVector.normalize();
	var directionVectorNormalized = direction.normalize();

	// calculate the angel for the new direction
	var angle = Math.acos(BABYLON.Vector3.Dot(axisVectorNormalized, directionVectorNormalized));

	if (directionAxis == 'x') {
		// decide it the angle has to be positive or negative
		if (direction[directionAxis] < 0) angle *= -1;
		// compensate initial rotation of imported spaceship mesh
		angle += Math.PI / 2;
	} else {
		angle -= Math.PI / 2;
	}

	// calculate both angles in degrees
	var playerRotationOnAxis = rotatingObject.rotation[axis];
	// calculate and return the delta
	return playerRotationOnAxis - angle;
}

function applyRotationForAxis(rotatingObject, axis, delta){
	var pi = Math.PI;

	// check what direction to turn to take the shortest turn
	if (delta > pi) {
		delta -= pi*2;
	} else if (delta < -pi) {
		delta += pi*2;
	}

	var absDelta = Math.abs(delta);
	// rotate until the difference between the object angle and the target angle is no more than 3 degrees
	if (absDelta > pi/360) {

		var rotationSpeed = Math.max(0.2, Math.min(absDelta*absDelta, 1));

		if (delta > 0) {
			rotatingObject.rotation[axis] -= rotationSpeed * 0.1;
			if (rotatingObject.rotation[axis] < -pi) {
				rotatingObject.rotation[axis] = pi;
			}
		}
		if (delta < 0) {
			rotatingObject.rotation[axis] += rotationSpeed * 0.1;
			if (rotatingObject.rotation[axis] > pi) {
				rotatingObject.rotation[axis] = -pi;
			}
		}

		// turn not done yet
		return false;

	} else {

		// turn done
		return true;

	}
}

/**
 * @param rotatingObject
 * @param pointToRotateTo
 * @returns {boolean}
 */
function _facePoint(rotatingObject, pointToRotateTo) {
	var axis1 = rotatingObject.position.subtract(pointToRotateTo);
	var axis2 = BABYLON.Vector3.Cross(axis1, new BABYLON.Vector3(0, 1, 0));
	var axis3 = BABYLON.Vector3.Cross(axis1, axis2);

	//console.log('old rotation: ', rotatingObject.rotation);
	var oldRotation = rotatingObject.rotation;
	var newRotation = BABYLON.Vector3.RotationFromAxis(axis1, axis2, axis3);
	//console.log('new rotation target: ', newRotation);

	var rotationDifference = oldRotation.subtract(newRotation);
	//console.log(oldRotation.subtract(newRotation));
	//console.log(rotationDifference);

	if(!isNaN(rotationDifference.x) && Math.abs(rotationDifference.y) > 0.01) {
		console.log(rotationDifference.y);
		var newRotationStep = new BABYLON.Vector3(0, newRotation.y/50, 0);

		rotatingObject.rotation.y += newRotationStep.y;
	}
	//console.log('new rotation: ', rotatingObject.rotation);

	return true;
}

/**
 * @param objectToMove
 * @param pointToMoveTo
 * @param scene
 */
function moveForward(objectToMove, pointToMoveTo, scene) {
	var distanceToTargetPoint = pointToMoveTo.subtract(objectToMove.position).length();

	if(distanceToTargetPoint > 0.5) {
		var angle = objectToMove.rotation.y;

		// compensate initial rotation of imported spaceship mesh
		angle -= Math.PI/2;

		// convert rotation to vector
		var x = Math.sin(angle);
		var z = Math.cos(angle);
		var moveVector = new BABYLON.Vector3(x, 0, z);

		var speed = Math.min(0.4, Math.sqrt(distanceToTargetPoint / 500));

		moveVector = moveVector.normalize();
		moveVector = moveVector.scale(speed);
		objectToMove.moveWithCollisions(moveVector);

		// show target position
		if(targetIndicatorLine) {
			targetIndicatorLine.dispose();
		}
		var currentPosition = objectToMove.position.clone();
		var targetPosition = pointToMoveTo.clone();
		targetIndicatorLine = BABYLON.Mesh.CreateLines('targetIndicator', [
			currentPosition,
			targetPosition
		], scene);
		targetIndicatorLine.color = targetIndicatorColor;
	} else {
		clearTargetIndicator();
		pointToMoveTo = null;
	}

}

function clearTargetIndicator(){
	if(targetIndicatorLine) {
		targetIndicatorLine.dispose();
		targetIndicatorLine = null;
	}
	if(targetIndicator) {
		targetIndicator.dispose();
		targetIndicator = null;
	}
}

/**
 * @param spacecraft
 * @param target
 * @param scene
 */
function shootLaser(spacecraft, target, scene){
	var laserMaterial = new BABYLON.StandardMaterial('laserMaterial', scene);
	laserMaterial.emissiveColor = new BABYLON.Color3(1, 0.7, 0.7);
	laserMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
	laserMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	laserMaterial.alpha = 1;

	var outerLaserMaterial = new BABYLON.StandardMaterial('laserMaterial', scene);
	outerLaserMaterial.emissiveColor = new BABYLON.Color3(1, 0.4, 0.4);
	outerLaserMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
	outerLaserMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	outerLaserMaterial.alpha = 0.67

	var laser = BABYLON.Mesh.CreateBox('laser', 1, scene);
	laser.material = laserMaterial;

	var outerLaser = BABYLON.Mesh.CreateBox('laser', 1, scene, false, BABYLON.Mesh.BACKSIDE);
	outerLaser.material = outerLaserMaterial;

	var laserEmitterPosition = spacecraft.position;
	if(spacecraft.laserEmitter){
		laserEmitterPosition = spacecraft.laserEmitter.getAbsolutePosition();
	}

	var axis1 = laserEmitterPosition.subtract(target.position);
	var axis2 = BABYLON.Vector3.Cross(axis1, new BABYLON.Vector3(0, 1, 0));
	var axis3 = BABYLON.Vector3.Cross(axis1, axis2);

	laser.rotation = BABYLON.Vector3.RotationFromAxis(axis1, axis2, axis3);
	laser.scaling.x = axis1.length();
	laser.scaling.y = laser.scaling.z = 0.04;
	laser.position = target.position.add(laserEmitterPosition).scale(0.5);

	outerLaser.position = laser.position;
	outerLaser.rotation = laser.rotation;
	outerLaser.scaling = laser.scaling.clone();
	outerLaser.scaling.y = outerLaser.scaling.z = 0.07;


	// Create a particle system for emitting the laser
	var particleSystemEmit = new BABYLON.ParticleSystem("particles", 1000, scene);
	//Texture of each particle
	particleSystemEmit.particleTexture = new BABYLON.Texture("textures/star.png", scene);
	// Where the particles come from
	particleSystemEmit.emitter = laserEmitterPosition; // the starting object, the emitter
	particleSystemEmit.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all from
	particleSystemEmit.maxEmitBox = new BABYLON.Vector3(0, 0, 0); // To...
	// Colors of all particles
	particleSystemEmit.color1 = new BABYLON.Color4(1, 0.5, 0.5, 1.0);
	particleSystemEmit.color2 = new BABYLON.Color4(1, 0, 0, 1.0);
	particleSystemEmit.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
	// Size of each particle (random between...
	particleSystemEmit.minSize = 0.1;
	particleSystemEmit.maxSize = 0.3;
	// Life time of each particle (random between...
	particleSystemEmit.minLifeTime = 0.3;
	particleSystemEmit.maxLifeTime = 0.4;
	// Emission rate
	particleSystemEmit.emitRate = 100;
	// manually emit
	//particleSystem.manualEmitCount = 3000;
	// Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
	particleSystemEmit.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
	// Direction of each particle after it has been emitted
	var baseEmitDirection = target.position.subtract(spacecraft.position).normalize().scale(5);
	particleSystemEmit.direction1 = baseEmitDirection.add(new BABYLON.Vector3(5, 5, 5));
	particleSystemEmit.direction2 = baseEmitDirection.subtract(new BABYLON.Vector3(5, 5, 5));
	// Angular speed, in radians
	particleSystemEmit.minAngularSpeed = 0;
	particleSystemEmit.maxAngularSpeed = Math.PI;
	// Speed
	particleSystemEmit.minEmitPower = 0.1;
	particleSystemEmit.maxEmitPower = 0.2;
	particleSystemEmit.updateSpeed = 0.04;
	// Start the particle system
	particleSystemEmit.start();

	// Create a particle system for hit
	var impactPoint = target.position.add(axis1.normalize().scale(0.8));

	var particleSystemHit = new BABYLON.ParticleSystem("particles", 1000, scene);
	//Texture of each particle
	particleSystemHit.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
	// Where the particles come from
	particleSystemHit.emitter = impactPoint; // the starting object, the emitter
	particleSystemHit.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all from
	particleSystemHit.maxEmitBox = new BABYLON.Vector3(0, 0, 0); // To...
	// Colors of all particles
	particleSystemHit.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
	particleSystemHit.color2 = new BABYLON.Color4(1, 0.5, 0, 0.8);
	particleSystemHit.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
	// Size of each particle (random between...
	particleSystemHit.minSize = 0.1;
	particleSystemHit.maxSize = 0.3;
	// Life time of each particle (random between...
	particleSystemHit.minLifeTime = 0.3;
	particleSystemHit.maxLifeTime = 1;
	// Emission rate
	particleSystemHit.emitRate = 300;
	// manually emit
	//particleSystemHit.manualEmitCount = 3000;
	// Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
	particleSystemHit.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
	// Direction of each particle after it has been emitted
	var baseImpactReactionDirection = spacecraft.position.subtract(target.position).normalize().scale(5);
	particleSystemHit.direction1 = baseImpactReactionDirection.add(new BABYLON.Vector3(5, 5, 5));
	particleSystemHit.direction2 = baseImpactReactionDirection.subtract(new BABYLON.Vector3(5, 5, 5));
	// Angular speed, in radians
	particleSystemHit.minAngularSpeed = 0;
	particleSystemHit.maxAngularSpeed = Math.PI;
	// Speed
	particleSystemHit.minEmitPower = 0.3;
	particleSystemHit.maxEmitPower = 0.7;
	particleSystemHit.updateSpeed = 0.01;
	// Start the particle system
	particleSystemHit.start();

	setTimeout(function(){
		laser.dispose();
		outerLaser.dispose();
		particleSystemHit.stop();
		particleSystemEmit.stop();
	}, 500);

	return laser;
}

/**
 * @param amount
 * @param scene
 */
function createStars(amount, scene){
	// Create a particle system
	var particleSystem = new BABYLON.ParticleSystem("particles", amount, scene);
	//Texture of each particle
	particleSystem.particleTexture = new BABYLON.Texture("textures/star.png", scene);
	// Where the particles come from
	particleSystem.emitter = BABYLON.Vector3.Zero(); // the starting object, the emitter
	particleSystem.minEmitBox = new BABYLON.Vector3(-1000, -1000, -1000); // Starting all from
	particleSystem.maxEmitBox = new BABYLON.Vector3(1000, -500, 1000); // To...
	// Colors of all particles
	particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.8);
	particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 0.7, 1.0);
	particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
	// Size of each particle (random between...
	particleSystem.minSize = 1;
	particleSystem.maxSize = 5;
	// Life time of each particle (random between...
	particleSystem.minLifeTime = 1000;
	particleSystem.maxLifeTime = 10000;
	// Emission rate
	particleSystem.emitRate = 1500;
	// Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
	particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
	// Angular speed, in radians
	particleSystem.minAngularSpeed = 0;
	particleSystem.maxAngularSpeed = Math.PI;
	// Start the particle system
	particleSystem.start();
}

/**
 * @param scene
 */
function createNebulas(scene){
	var nebulaTexture = new BABYLON.Texture('textures/nebula.png', scene);
	var nebulaMaterial = new BABYLON.StandardMaterial('nebulaMaterial', scene);
	nebulaMaterial.diffuseTexture = nebulaTexture;
	nebulaMaterial.diffuseTexture.hasAlpha = true;
	nebulaMaterial.opacityTexture = nebulaTexture;
	nebulaMaterial.opacityTexture.hasAlpha = true;
	nebulaMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

	var nebulaPlane = BABYLON.Mesh.CreatePlane('nebulaPlane', 2000, scene);
	nebulaPlane.material = nebulaMaterial;
	nebulaPlane.rotation.x = Math.PI/2;
	nebulaPlane.position.y = -1000;
	nebulaPlane.position.x = 1000;
	nebulaPlane.position.z = 1000;
	nebulaPlane.visibility = 0.7;

	var nebulaTexture2 = new BABYLON.Texture('textures/nebula2.png', scene);
	var nebulaMaterial2 = new BABYLON.StandardMaterial('nebulaMaterial', scene);
	nebulaMaterial2.diffuseTexture = nebulaTexture2;
	nebulaMaterial2.diffuseTexture.hasAlpha = true;
	nebulaMaterial2.opacityTexture = nebulaTexture2;
	nebulaMaterial2.opacityTexture.hasAlpha = true;
	nebulaMaterial2.specularColor = new BABYLON.Color3(0, 0, 0);

	var nebulaPlane2 = BABYLON.Mesh.CreatePlane('nebulaPlane2', 2000, scene);
	nebulaPlane2.material = nebulaMaterial2;
	nebulaPlane2.rotation.x = Math.PI/2;
	nebulaPlane2.scaling.x = 2;
	nebulaPlane2.position.y = -800;
	nebulaPlane2.position.x = 750;
	nebulaPlane2.position.z = -1000;
	nebulaPlane2.visibility = 0.5;
}

/**
 * @param scene
 */
function createPlanets(scene) {
	var planetTexture = new BABYLON.Texture('textures/planet_2_d.jpg', scene);
	var planetBumpTexture = new BABYLON.Texture('textures/planet_2_d_normal.jpg', scene);

	var planetMaterial = new BABYLON.StandardMaterial('planetMaterial', scene);
	//planetMaterial.diffuseColor = new BABYLON.Color3(0.8, 1, 0.6);
	//planetMaterial.emissiveColor = new BABYLON.Color3(0.15, 0.05, 0.05);
	planetMaterial.diffuseTexture = planetTexture;
	planetMaterial.bumpTexture = planetBumpTexture;
	planetMaterial.bumpTexture.level = 2;
	planetMaterial.specularColor = new BABYLON.Color3(0.6, 0.5, 0.6);
	planetMaterial.specularPower = 256;

	var planet = BABYLON.Mesh.CreateSphere('planet', 24, 300, scene);
	planet.material = planetMaterial;
	planet.position = new BABYLON.Vector3(-50, -300, 300);
	//planet.applyDisplacementMap("textures/planet_1_d_displacement.jpg", 0, 1.5);



	var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
	fireTexture.fireColors = [
		new BABYLON.Color3(1,0.1,0),
		new BABYLON.Color3(1,0.4,0),
		new BABYLON.Color3(1,0,0),
		new BABYLON.Color3(1,0.5,0.4),
		new BABYLON.Color3(1,0.1,0),
		new BABYLON.Color3(1,0,0)
	];
	fireTexture.speed = {x: 0.1, y: 0.1};

	var fresnelMaterial = new BABYLON.StandardMaterial('athmosphereMaterial', scene);

	//fresnelMaterial.reflectionTexture = fireTexture;
	fresnelMaterial.diffuseTexture = fireTexture;
	//fresnelMaterial.emissiveTexture = fireTexture;
	fresnelMaterial.opacityTexture = fireTexture;

	//fresnelMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	fresnelMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0.5);
	//fresnelMaterial.specularColor = new BABYLON.Color3(0.4, 0.4, 0.2);

	fresnelMaterial.alpha = 0;
	fresnelMaterial.specularPower = 8;

	// Fresnel
	//fresnelMaterial.emissiveFresnelParameters = new BABYLON.FresnelParameters();
	//fresnelMaterial.emissiveFresnelParameters.bias = 0.6;
	//fresnelMaterial.emissiveFresnelParameters.power = 1;

	fresnelMaterial.opacityFresnelParameters = new BABYLON.FresnelParameters();
	fresnelMaterial.opacityFresnelParameters.bias = 0.7;
	fresnelMaterial.opacityFresnelParameters.power = 4;
	fresnelMaterial.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
	fresnelMaterial.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

	//fresnelMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
	//fresnelMaterial.reflectionFresnelParameters.bias = 0.1;
	//fresnelMaterial.reflectionFresnelParameters.power = 100;
	//fresnelMaterial.reflectionFresnelParameters.leftColor = BABYLON.Color3.White();
	//fresnelMaterial.reflectionFresnelParameters.rightColor = BABYLON.Color3.Black();

	//fresnelMaterial.emissiveFresnelParameters = new BABYLON.FresnelParameters();
	//fresnelMaterial.emissiveFresnelParameters.bias = 0.2;
	//fresnelMaterial.emissiveFresnelParameters.power = 4;
	//fresnelMaterial.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
	//fresnelMaterial.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

	var atmosphere = BABYLON.Mesh.CreateSphere('athmosphere', 24, 330, scene);
	atmosphere.position = planet.position;
	atmosphere.material = fresnelMaterial;

	scene.registerBeforeRender(function () {
		atmosphere.rotation.z += 0.002;
		atmosphere.rotation.x += 0.002;
		planet.rotation.y += 0.0002;
	});
}

function createSpacecraftEngine(emitter, scene){
	// Create a particle system
	var particleSystem = new BABYLON.ParticleSystem("particles", 10000, scene);

	//Texture of each particle
	particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

	// Where the particles come from
	particleSystem.emitter = emitter; // the starting object, the emitter
	particleSystem.minEmitBox = new BABYLON.Vector3(17, -1.3, 0); // Starting all from
	particleSystem.maxEmitBox = new BABYLON.Vector3(17, -1.3, 0); // To...

	// Colors of all particles
	particleSystem.color1 = new BABYLON.Color4(0.1, 0.1, 1.0, 1.0);
	particleSystem.color2 = new BABYLON.Color4(0.1, 0.1, 1.0, 1.0);
	particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.5, 0.0);

	// Size of each particle (random between...
	particleSystem.minSize = 0.5;
	particleSystem.maxSize = 0.6;

	// Life time of each particle (random between...
	particleSystem.minLifeTime = 0.005;
	particleSystem.maxLifeTime = 0.02;

	// Emission rate
	particleSystem.emitRate = 10000;

	// Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
	particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

	// Set the gravity of all particles
	//particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

	// Direction of each particle after it has been emitted
	particleSystem.direction1 = new BABYLON.Vector3(5, 0, 0);
	particleSystem.direction2 = new BABYLON.Vector3(-2, 0, 0);

	// Angular speed, in radians
	particleSystem.minAngularSpeed = 0;
	particleSystem.maxAngularSpeed = Math.PI;

	// Speed
	particleSystem.minEmitPower = 10;
	particleSystem.maxEmitPower = 50;
	particleSystem.updateSpeed = 0.001;

	// Start the particle system
	particleSystem.start();
}

function createSpacecraftLaserEmitter(spacecraft, scene){
	spacecraft.laserEmitter = BABYLON.Mesh.CreateBox('laserEmitter', 0.1, scene);
	spacecraft.laserEmitter.parent = spacecraft;
	spacecraft.laserEmitter.position = new BABYLON.Vector3(-17, -3.5, 0);
}

function initTargetableActions(target, customOutline, scene){
	target.actionManager = new BABYLON.ActionManager(scene);
	target.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(e){
			var mesh = e.meshUnderPointer;
			customOutline.position = mesh.position;
			customOutline.rotation = mesh.rotation;
			customOutline.isVisible = true;
			currentTarget = mesh;
		})
	);

	target.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(e){
			customOutline.isVisible = false;
			currentTarget = null;
		})
	);
}