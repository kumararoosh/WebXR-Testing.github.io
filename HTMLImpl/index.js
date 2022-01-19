const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {
    const scene = new BABYLON.Scene(engine);  

    BABYLON.MeshBuilder.CreateBox("box", {})
    BABYLON.MeshBuilder.CreateSphere("ball", {diameter:1.25})

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    return scene;
};

var createXRScene = async function () {

    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 1;

    const env = scene.createDefaultEnvironment();


    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [env.ground]
    });

    return scene;
};

createXRScene().then(sceneToRender => {
    engine.runRenderLoop(() => sceneToRender.render());
});

// const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
// engine.runRenderLoop(function () {
//         scene.render();
// });

// // Watch for browser/canvas resize events
// window.addEventListener("resize", function () {
//         engine.resize();
// });