// main.js
import "./global.scss";
import quickSetup from "./utils/quickSetup";
import AssetsLoader from "assets-loader";
import alfrid, { TouchDetector } from "src/alfrid";
import { vec3 } from "gl-matrix";

let mesh,
  drawPlane,
  detector,
  bBall,
  camera,
  hit = vec3.create();

function render() {
  if (!drawPlane) {
    return;
  }
  drawPlane.draw();

  const s = 0.1;
  bBall.draw(hit, [s, s, s], [1, 0, 0]);
}

quickSetup(render).then((o) => {
  alfrid.log();
  camera = o.camera;
  console.log("Camera", camera);
  const assets = [
    { id: "image", url: "assets/img/test.jpg" },
    { id: "image1", url: "assets/img/test1.jpg" },
    { id: "image2", url: "assets/img/test2.jpg" },
    { id: "hdr", url: "assets/img/singleLight.hdr", type: "binary" },
  ];

  new AssetsLoader({
    assets,
  })
    .on("error", (err) => {
      console.log("Error loading :", err);
    })
    .on("complete", (o) => {
      _onAssetsLoaded(o);
    })
    .start();
});

function _onAssetsLoaded(o) {
  console.table(o);
  window.assets = o;

  bBall = new alfrid.BatchBall();

  const s = 2;
  mesh = alfrid.Geom.plane(s, s, 1, "xz");
  drawPlane = new alfrid.Draw()
    .setMesh(mesh)
    .useProgram(null, alfrid.ShaderLibs.simpleColorFrag)
    .uniform("color", "vec3", [1, 1, 1])
    .uniform("opacity", "float", 1);

  detector = new TouchDetector(mesh, camera);
  detector.on("onHit", (e) => {
    console.log("on hit", e);
    vec3.copy(hit, e.hit);
  });
}

function getAsset(id) {
  const o = assets.find((a) => {
    return a.id === id;
  });

  if (!o) {
    return null;
  }
  return o.file;
}
