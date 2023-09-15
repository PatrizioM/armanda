//transparent background
var renderer = new THREE.WebGLRenderer( { alpha: true } );



$(document).ready(function () {		

//blinking


	$("#blendBlinkRange").slider("value", 50);

	
function blinkit(){
//console.log(renderReady);
if (renderReady == 0){
	var originalblink = $("#blendBlinkRange").slider("option", "value");
	blendBlink(100);
	$("#blendBlinkRange").slider("value", 100);
	setTimeout(function() {
		blendBlink(originalblink);
		$("#blendBlinkRange").slider("value", originalblink);
	},50);
}
}

(function loop() {
    var rand = Math.round(Math.random() * (10000 - 2000)) + 2000;
    setTimeout(function() {
            blinkit();
            loop(); 
			//console.log(rand);
    }, rand);
}());


		//can speak button
				if ('speechSynthesis' in window) {
					$("#talk").text("Talk (can speak!)")
				}

$("#talk").click(function (){
	
//text to speech & lips movement
	
	//retrieve text
		$.ajax({
			type: "GET",
			url: "./text.txt",
			success: function(tts) {
			
			//user text?
				var usertext = $('#speech').val();
				var defaulttext = "";
				if (usertext == defaulttext) {
					//console.log("no");
				}
				else {
					//console.log("yes");
					tts = usertext;
					
				}
			
			//word count for lips movement
					s = tts;
					s = s.replace(/(^\s*)|(\s*$)/gi,"");
					s = s.replace(/[ ]{2,}/gi," ");
					s = s.replace(/\n /,"\n");
					var movements = s.split(' ').length;
						//console.log(movements);
						//console.log(tts);
				
				//move lips through text
					var lipsarray = new Array();
					for (var k = 0; k < movements; k++) {
						lipsarray[k] = Math.floor(Math.random() * 80);
					}
					lipsarray.push('0');
					var time = 0;
					for (var i = 0; i < lipsarray.length; i++) {
						var numero = lipsarray[i];
						time += 500;
						setTimeout(function(numero) {
							return function() {
								//console.log("var is now", numero);
							blendJaw(numero); 
							$("#blendJawRange").slider("value", numero);
							}
						}(numero), time);
					}
			
			
				//speak!
				var msg = new SpeechSynthesisUtterance();
				var voices = window.speechSynthesis.getVoices();
				msg.volume = 1; // 0 to 1
				msg.text = tts;
				msg.lang = 'it-IT';

				//	console.log('Finished in ' + event.elapsedTime + ' seconds.');
			
				window.speechSynthesis.speak(msg);	

			//voices test
				//	console.log(voice.name);
			}
		});
		
//movement from values file		
		// $.ajax({
			// type: "GET",
			// url: "./values",
			// success: function(valori) {
				// var valoriarray = $.csv.toArray(valori);
				// valoriarray.push('0');
				// var time = 0;
				// for (var i = 0; i < valoriarray.length; i++) {
					// var numero = valoriarray[i];
					// time += 100;
					// setTimeout(function(numero) {
						// return function() {
							//console.log("var is now", numero);
							// blendJaw(numero); 
							// $("#blendJawRange").slider("value", numero);
						// }
					// }(numero), time);
				// }
			// }
		// });
		
		
	});
	
	$("#reset-blend-targets").click(function () {
        $("#blendJawRange").slider("value", 0);
        $("#blendSyncRange").slider("value", 50);
        $("#blendTwistRange").slider("value", 50);
        $("#blendLipRange").slider("value", 50);
        $("#blendBlinkRange").slider("value", 50);
        $("#blendWidthRange").slider("value", 50);
        $("#blendExpressRange").slider("value", 50);
        $("#blendSymRange").slider("value", 0);
        $("#blendTongueRange").slider("value", 50);
        $("#blendMaleRange").slider("value", 0);
        blendJaw(0);
        blendSync(50);
        blendTwist(50);
        blendSym(0);
        blendMale(0);
        blendExpress(50);
        blendLip(50);
        blendWidth(50);
        blendTongue(50);
        blendBlink(50)
    });
    $("#toggle-mouse-tracking").click(function (event) {
        if ($("#toggle-mouse-tracking-state").text() === "OFF") {
            resettoCenterCheck = false;
            document.addEventListener("mousemove", onDocumentMouseMove, false);
            $("#toggle-mouse-tracking-state").text("ON")
        } else {
            toggleCoords.clientX = (event.clientX / window.innerWidth) * 2 - 1;
            toggleCoords.clientY = -(event.clientY / window.innerHeight) * 2 + 1;
            resettoCenterCheck = true;
            document.removeEventListener("mousemove", onDocumentMouseMove, false);
            $("#toggle-mouse-tracking-state").text("OFF")
        }
    });
    $("#blendJawRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 0,
        slide: function (event, ui) {
            blendJaw(ui.value)
        }
    });
    $("#blendSyncRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 50,
        slide: function (event, ui) {
            expressval = $("#blendExpressRange").slider("value");
            blendSync(ui.value, expressval)
        }
    });
    $("#blendTwistRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 50,
        slide: function (event, ui) {
            blendTwist(ui.value)
        }
    });
    $("#blendLipRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 50,
        slide: function (event, ui) {
            blendLip(ui.value)
        }
    });
    $("#blendBlinkRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 50,
        slide: function (event, ui) {
            blendBlink(ui.value)
        }
    });
    $("#blendWidthRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 50,
        slide: function (event, ui) {
            blendWidth(ui.value)
        }
    });
    $("#blendExpressRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 50,
        slide: function (event, ui) {
            blendExpress(ui.value)
        }
    });
    $("#blendSymRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 0,
        slide: function (event, ui) {
            blendSym(ui.value)
        }
    });
    $("#blendTongueRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 50,
        slide: function (event, ui) {
            blendTongue(ui.value)
        }
    });
    $("#blendMaleRange").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 0,
        slide: function (event, ui) {
            blendMale(ui.value)
        }
    });
    $("#loading").css("top", $(window).height() / 2 - $("#loading").height() / 2);
    $("#loading").css("left", $(window).width() / 2 - $("#loading").width() / 2)
});
var container, stats;
var camera, scene, projector, renderer;
var mesh;
var meshReye;
var meshLeye;
var meshTeeth;
var meshRlashes;
var meshLlashes;
var meshTopTeeth;
var meshBotTeeth;
var meshTongue;
var meshHB;
var meshHP;
var eyelock = 0;
var groupLeye, groupReye, groupHead;
var ground;
var plight;
var mouse = {
    x: 0,
    y: 0
};
var SHADOW_MAP_WIDTH = 1024,
    SHADOW_MAP_HEIGHT = 1024;
var resettoCenterCheck = false;
var toggleCoords = {
    clientX: 0,
    clientY: 0
};
var renderReady = 0;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var FLOOR = 0;
var NEAR = 5,
    FAR = 2000;
var scene, sceneHUD, cameraOrtho, hudMaterial;
var initPos = new THREE.Vector3(700, 50, 1900);
var initLight = new THREE.Vector3(0, 1500, 1000);
var deltaCam = new THREE.Vector3();
var light, clight, ambientlight, dlight;
var loader = new THREE.JSONLoader(true);
init();
setInterval(loop, 1000 / 24);

function init() {
    container = document.createElement("div");
    document.body.appendChild(container);
    loadingmodal = document.getElementById("whatsloaded");
    camera = new THREE.Camera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.target.position.set(0, 250, 0);
    camera.position.set(0, 250, 800);
    var pars = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
    };
    shadowTexture = new THREE.WebGLRenderTarget(SHADOW_MAP_WIDTH, SHADOW_MAP_HEIGHT, pars);
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(16755285, 1000, FAR);
    THREE.ColorUtils.adjustHSV(scene.fog.color, 0.02, -0.15, -0.65);
    ambientlight = new THREE.AmbientLight(3355392, 0.5);
    scene.addLight(ambientlight);
    light = new THREE.SpotLight(16777215, 1.4);
    light.position.set(200, 800, 1600);
    light.target.position.set(0, 0, -800);
    light.castShadow = true;
    scene.addLight(light);
    dlight = new THREE.DirectionalLight(8921600, 0.5);
    dlight.position.x = -0.8;
    dlight.position.y = -0.8;
    dlight.position.z = -0.2;
    dlight.position.normalize();
    scene.addLight(dlight);
    plight = new THREE.DirectionalLight(8921600, 1);
    plight.position.x = 1;
    plight.position.y = 1;
    plight.position.z = 0.2;
    plight.position.normalize();
    scene.addLight(plight);
    renderer = new THREE.WebGLRenderer({
        clearColor: 0,
        clearAlpha: 1,
        antialias: true
    });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.domElement.style.position = "relative";
    container.appendChild(renderer.domElement);
	renderer.setClearColorHex( 0x000000, 0 );
    //renderer.setClearColor(scene.fog.color, 1);
    renderer.autoClear = false;
    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = camera.far;
    renderer.shadowCameraFov = 60;
    renderer.shadowMapBias = 0.003866;
    renderer.shadowMapDarkness = 0.2;
    renderer.shadowMapWidth = SHADOW_MAP_WIDTH;
    renderer.shadowMapHeight = SHADOW_MAP_HEIGHT;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    container.appendChild(renderer.domElement);
    groupHead = new THREE.Object3D();
    loader.load({
        model: "model/gingerhead.js",
        callback: function (geometry) {
            geometry.materials[0][0].shading = THREE.SmoothShading;
            geometry.materials[0][0].morphTargets = true;
            mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
            mesh.position.set(0, 0, 0);
            mesh.scale.set(50, 50, 50);
            mesh.matrixAutoUpdate = true;
            mesh.updateMatrix();
            mesh.doubleSided = true;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            geometry.computeTangents();
            groupHead.addChild(mesh);
            headload = document.createElement("div");
            headload.textContent = " head...loaded!";
            loadingmodal.appendChild(headload);
            renderReady++
        }
    });
    groupLeye = new THREE.Object3D();
    loader.load({
        model: "model/gingerLeye.js",
        callback: function (geometry, meshLeye) {
            meshLeye = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial({
                color: 6316128
            }));
            meshLeye.position.set(-48, -308.45, -65.25);
            meshLeye.scale.set(50, 50, 50);
            meshLeye.doubleSided = true;
            meshLeye.castShadow = true;
            meshLeye.receiveShadow = true;
            meshLeye.updateMatrix();
            groupLeye.position.set(48, 308.45, 65.25);
            groupLeye.addChild(meshLeye);
            groupHead.addChild(groupLeye);
            leyeload = document.createElement("div");
            leyeload.textContent = " left eye...loaded!";
            loadingmodal.appendChild(leyeload);
            renderReady++
        }
    });
    groupReye = new THREE.Object3D();
    loader.load({
        model: "model/gingerReye.js",
        callback: function (geometry, meshReye) {
            meshReye = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial({
                color: 6316128
            }));
            meshReye.position.set(48, -308.45, -65.25);
            meshReye.scale.set(50, 50, 50);
            meshReye.doubleSided = true;
            meshReye.castShadow = true;
            meshReye.receiveShadow = true;
            meshReye.updateMatrix();
            groupReye.position.set(-48, 308.45, 65.25);
            groupReye.addChild(meshReye);
            groupHead.addChild(groupReye);
            reyeload = document.createElement("div");
            reyeload.textContent = " right eye...loaded!";
            loadingmodal.appendChild(reyeload);
            renderReady++
        }
    });
    loader.load({
        model: "model/gingerteethbot.js",
        callback: function (geometry) {
            geometry.materials[0][0].shading = THREE.SmoothShading;
            geometry.materials[0][0].morphTargets = true;
            meshBotTeeth = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
            meshBotTeeth.scale.set(50, 50, 50);
            meshBotTeeth.position.z = -0.1;
            meshBotTeeth.doubleSided = true;
            meshBotTeeth.castShadow = true;
            meshBotTeeth.receiveShadow = true;
            groupHead.addChild(meshBotTeeth);
            teethbload = document.createElement("div");
            teethbload.textContent = " teeth bottom...loaded!";
            loadingmodal.appendChild(teethbload);
            renderReady++
        }
    });
    loader.load({
        model: "model/gingerteethtop.js",
        callback: function (geometry) {
            geometry.materials[0][0].shading = THREE.SmoothShading;
            geometry.materials[0][0].morphTargets = true;
            meshTopTeeth = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
            meshTopTeeth.scale.set(50, 50, 50);
            meshTopTeeth.doubleSided = true;
            meshTopTeeth.castShadow = true;
            meshTopTeeth.receiveShadow = true;
            groupHead.addChild(meshTopTeeth);
            teethtload = document.createElement("div");
            teethtload.textContent = " teeth top...loaded!";
            loadingmodal.appendChild(teethtload);
            renderReady++
        }
    });
    loader.load({
        model: "model/gingertongue.js",
        callback: function (geometry) {
            geometry.materials[0][0].shading = THREE.SmoothShading;
            geometry.materials[0][0].morphTargets = true;
            meshTongue = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
            meshTongue.scale.set(50, 50, 50);
            meshTongue.doubleSided = true;
            meshTongue.castShadow = true;
            meshTongue.receiveShadow = true;
            groupHead.addChild(meshTongue);
            tougeload = document.createElement("div");
            tougeload.textContent = " tongue...loaded!";
            loadingmodal.appendChild(tougeload);
            renderReady++
        }
    });
    loader.load({
        model: "model/empty.js",
        callback: function (geometry) {
            meshHP = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                color: 4605510
            }));
            meshHP.scale.set(50, 50, 50);
            meshHP.position.z = -0.1;
            meshHP.doubleSided = true;
            meshHP.castShadow = true;
            meshHP.receiveShadow = true;
            groupHead.addChild(meshHP);
            headphonesload = document.createElement("div");
            headphonesload.textContent = "";
            loadingmodal.appendChild(headphonesload);
            renderReady++
        }
    });
    loader.load({
        model: "model/empty.js",
        callback: function (geometry) {
            meshHB = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial({
                color: 4605510
            }));
            meshHB.scale.set(50, 50, 50);
            meshHB.position.z = -0.1;
            meshHB.doubleSided = true;
            meshHB.castShadow = true;
            meshHB.receiveShadow = true;
            groupHead.addChild(meshHB);
            headbandload = document.createElement("div");
            headbandload.textContent = "";
            loadingmodal.appendChild(headbandload);
            renderReady++
        }
    });
    scene.addObject(groupHead);
    addobjtoscene = document.createElement("div");
    addobjtoscene.textContent = " adding objects to scene...";
    loadingmodal.appendChild(addobjtoscene);
    document.addEventListener("keyup", onDocumentKeyUp, false);
    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false)
}

function blendSync(value, expressvalue) {
    mesh.morphTargetInfluences[12] = (value - 50) * 0.04;
    mesh.morphTargetInfluences[13] = 0;
    mesh.morphTargetInfluences[11] = 0;
    if (value >= 75) {
        mesh.morphTargetInfluences[12] = (100 - value) * 0.04;
        mesh.morphTargetInfluences[13] = (value - 75) * 0.04
    }
    if (value <= 50) {
        mesh.morphTargetInfluences[11] = (50 - value) * 0.025
    }
    if (expressvalue >= 75) {
        mesh.morphTargetInfluences[18] = 0.5
    }
    if (expressvalue <= 25) {
        mesh.morphTargetInfluences[19] = 0.5
    }
}

function blendTongue(value) {
    meshTongue.morphTargetInfluences[4] = (value - 50) * 0.02;
    meshTongue.morphTargetInfluences[5] = 0;
    if (value <= 50) {
        meshTongue.morphTargetInfluences[4] = 0;
        meshTongue.morphTargetInfluences[5] = (50 - value) * 0.02
    }
}

function blendExpress(value) {
    mesh.morphTargetInfluences[18] = (value - 50) * 0.02;
    mesh.morphTargetInfluences[19] = 0;
    if (value <= 50) {
        mesh.morphTargetInfluences[19] = (50 - value) * 0.02;
        mesh.morphTargetInfluences[18] = 0
    }
}

function blendLip(value) {
    mesh.morphTargetInfluences[14] = (value - 50) * 0.02;
    mesh.morphTargetInfluences[15] = 0;
    if (value <= 50) {
        mesh.morphTargetInfluences[15] = (50 - value) * 0.02;
        mesh.morphTargetInfluences[14] = 0
    }
}

function blendWidth(value) {
    mesh.morphTargetInfluences[16] = (value - 50) * 0.02;
    mesh.morphTargetInfluences[17] = 0;
    meshTopTeeth.scale.x = 50 + (value - 50) * 0.05;
    meshBotTeeth.scale.x = 50 + (value - 50) * 0.05;
    meshTongue.scale.x = 50 + (value - 50) * 0.05;
    if (value <= 50) {
        mesh.morphTargetInfluences[17] = (50 - value) * 0.02;
        mesh.morphTargetInfluences[16] = 0
    }
}

function blendBlink(value) {
    mesh.morphTargetInfluences[22] = (value - 50) * 0.04;
    mesh.morphTargetInfluences[9] = 0;
    mesh.morphTargetInfluences[8] = 0;
    eyelock = 1;
    if (value >= 75) {
        mesh.morphTargetInfluences[8] = 0;
        mesh.morphTargetInfluences[9] = (value - 75) * 0.04;
        mesh.morphTargetInfluences[22] = (100 - value) * 0.04;
        eyelock = 0
    }
    if (value <= 50) {
        mesh.morphTargetInfluences[8] = (50 - value) * 0.02;
        mesh.morphTargetInfluences[22] = 0
    }
}

function blendSym(value) {
    mesh.morphTargetInfluences[20] = value * 0.01
}

function blendMale(value) {
    mesh.morphTargetInfluences[21] = value * 0.01;
    groupLeye.scale.set(1 + (-value * 0.002), 1 + (-value * 0.002), 1 + (-value * 0.0025));
    groupReye.scale.set(1 + (-value * 0.002), 1 + (-value * 0.002), 1 + (-value * 0.0025))
}

function blendReye(value) {
    mesh.morphTargetInfluences[3] = value * 0.02;
    mesh.morphTargetInfluences[4] = 0;
    meshRlashes.morphTargetInfluences[1] = value * 0.02;
    meshRlashes.morphTargetInfluences[2] = 0;
    if (value >= 50) {
        mesh.morphTargetInfluences[3] = (100 - value) * 0.02;
        mesh.morphTargetInfluences[4] = (value - 50) * 0.02;
        meshRlashes.morphTargetInfluences[1] = (100 - value) * 0.02;
        meshRlashes.morphTargetInfluences[2] = (value - 50) * 0.02
    }
}

function blendLeye(value) {
    mesh.morphTargetInfluences[1] = value * 0.02;
    mesh.morphTargetInfluences[2] = 0;
    meshLlashes.morphTargetInfluences[1] = value * 0.02;
    meshLlashes.morphTargetInfluences[2] = 0;
    if (value >= 50) {
        mesh.morphTargetInfluences[1] = (100 - value) * 0.02;
        mesh.morphTargetInfluences[2] = (value - 50) * 0.02;
        meshLlashes.morphTargetInfluences[1] = (100 - value) * 0.02;
        meshLlashes.morphTargetInfluences[2] = (value - 50) * 0.02
    }
}

function blendJaw(value) {
    mesh.morphTargetInfluences[0] = value * 0.02;
    mesh.morphTargetInfluences[1] = 0;
    meshBotTeeth.morphTargetInfluences[0] = value * 0.01;
    meshTongue.morphTargetInfluences[0] = value * 0.02;
    meshTongue.morphTargetInfluences[1] = 0;
    if (value >= 50) {
        mesh.morphTargetInfluences[0] = (100 - value) * 0.02;
        mesh.morphTargetInfluences[1] = (value - 50) * 0.02;
        meshTongue.morphTargetInfluences[0] = (100 - value) * 0.02;
        meshTongue.morphTargetInfluences[1] = (value - 50) * 0.02
    }
}

function blendTwist(value) {
    mesh.morphTargetInfluences[3] = (value - 50) * 0.02;
    mesh.morphTargetInfluences[2] = 0;
    meshBotTeeth.morphTargetInfluences[2] = (value - 50) * 0.02;
    meshBotTeeth.morphTargetInfluences[1] = 0;
    meshTopTeeth.morphTargetInfluences[2] = (value - 50) * 0.03;
    meshTopTeeth.morphTargetInfluences[1] = 0;
    meshTongue.morphTargetInfluences[3] = (value - 50) * 0.02;
    meshTongue.morphTargetInfluences[2] = 0;
    if (value <= 50) {
        mesh.morphTargetInfluences[2] = (50 - value) * 0.02;
        mesh.morphTargetInfluences[3] = 0;
        meshBotTeeth.morphTargetInfluences[1] = (50 - value) * 0.02;
        meshBotTeeth.morphTargetInfluences[2] = 0;
        meshTopTeeth.morphTargetInfluences[1] = (50 - value) * 0.02;
        meshTopTeeth.morphTargetInfluences[2] = 0;
        meshTongue.morphTargetInfluences[2] = (50 - value) * 0.02;
        meshTongue.morphTargetInfluences[3] = 0
    }
}

function createHUD() {
    cameraOrtho = new THREE.Camera(45, SHADOW_MAP_WIDTH / SHADOW_MAP_HEIGHT, NEAR, FAR);
    cameraOrtho.projectionMatrix = THREE.Matrix4.makeOrtho(SCREEN_WIDTH / -2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / -2, -10, 1000);
    cameraOrtho.position.z = 10;
    var shader = THREE.ShaderUtils.lib.screen;
    var uniforms = new THREE.UniformsUtils.clone(shader.uniforms);
    hudMaterial = new THREE.MeshShaderMaterial({
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        uniforms: uniforms
    });
    var hudGeo = new THREE.PlaneGeometry(SHADOW_MAP_WIDTH / 2, SHADOW_MAP_HEIGHT / 2);
    var hudMesh = new THREE.Mesh(hudGeo, hudMaterial);
    hudMesh.position.x = (SCREEN_WIDTH - SHADOW_MAP_WIDTH / 2) * -0.5;
    hudMesh.position.y = (SCREEN_HEIGHT - SHADOW_MAP_HEIGHT / 2) * -0.5;
    sceneHUD = new THREE.Scene();
    sceneHUD.addObject(hudMesh)
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
    case 37:
        camera.position.x += 8;
        break;
    case 38:
        camera.position.z += 8;
        break;
    case 39:
        camera.position.x -= 8;
        break;
    case 40:
        camera.position.z -= 8;
        break
    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
    case 37:
        camera.position.x += 0;
        break;
    case 38:
        camera.position.z += 0;
        break;
    case 39:
        camera.position.x -= 0;
        break;
    case 40:
        camera.position.z -= 0;
        break
    }
}
var eyelock = 0;

function onDocumentMouseMove(event) {
    if (typeof mesh != "undefined") {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mesh.morphTargetInfluences[4] = -mouse.x * 2.5;
        mesh.morphTargetInfluences[5] = mouse.x * 2.5;
        mesh.morphTargetInfluences[6] = (mouse.y * 2.5) * eyelock;
        mesh.morphTargetInfluences[7] = -(mouse.y * 2.5) * eyelock;
        groupLeye.rotation.y = (mouse.x * 1) / 2;
        groupReye.rotation.y = (mouse.x * 1) / 2;
        groupLeye.rotation.x = -mouse.y / 2;
        groupReye.rotation.x = -mouse.y / 2;
        groupHead.rotation.y = mouse.x / 8;
        groupHead.rotation.x = -mouse.y / 8
    }
}
var happytimefun;

function resettoCenter(event) {
    if (mouse.x <= 0) {
        mouse.x = (toggleCoords.clientX + 0.01) / 2;
        mesh.morphTargetInfluences[4] = -mouse.x * 2.5;
        mesh.morphTargetInfluences[5] = mouse.x * 2.5;
        groupLeye.rotation.y = (mouse.x * 1) / 2;
        groupReye.rotation.y = (mouse.x * 1) / 2;
        groupHead.rotation.y = mouse.x / 8;
        toggleCoords.clientX = mouse.x
    } else {
        happytimefun++
    } if (mouse.y >= 0) {
        mouse.y = (toggleCoords.clientY - 0.01) / 2;
        mesh.morphTargetInfluences[6] = (mouse.y * 2.5) * eyelock;
        mesh.morphTargetInfluences[7] = -(mouse.y * 2.5) * eyelock;
        groupHead.rotation.x = -mouse.y / 8;
        groupLeye.rotation.x = -mouse.y / 2;
        groupReye.rotation.x = -mouse.y / 2;
        toggleCoords.clientY = mouse.y
    } else {
        happytimefun++
    } if (happytimefun == 2) {
        resettoCenterCheck = false
    }
}

function loop() {
    render()
}

function render() {
    if (resettoCenterCheck == true) {
        resettoCenter()
    }
    if (renderReady == 8) {
        var d = document.getElementById("loading");
        d.style.display = "none";
        renderReady = 0
    }
    renderer.clear();
    renderer.render(scene, camera)
};
