// WebGL - load obj - cube
// from https://webglfundamentals.org/webgl/webgl-load-obj-cube.html

// This is not a full .obj parser.
// see http://paulbourke.net/dataformats/obj/

function parseOBJ(text) {
  // initialize data
  const objPositions = [[0, 0, 0]];
  const objTexcoords = [[0, 0]];
  const objNormals = [[0, 0, 0]];
  const objColors = [[0, 0, 0]];

  const objVertexData = [objPositions, objTexcoords, objNormals, objColors];

  let webglVertexData = [
    [], // positions
    [], // texcoords
    [], // normals
    [], // colors
  ];

  function newGeometry() {
    // If there is an existing geometry and it's
    // not empty then start a new one.
    if (geometry && geometry.data.position.length) {
      geometry = undefined;
    }
    setGeometry();
  }

  function addVertex(vert) {
    const ptn = vert.split("/");
    //console.log(ptn);
    ptn.forEach((objIndexStr, i) => {
      if (!objIndexStr) {
        return;
      }
      const objIndex = parseInt(objIndexStr);
      const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
      if (i === 0) {
        webglVertexData[i].push(...objVertexData[i][index]);
        webglVertexData[3].push(...objVertexData[3][index]);
      }
    });
  }

  const keywords = {
    v(parts) {
      if (parts.length > 3) {
        objPositions.push(parts.slice(0, 3).map(parseFloat));
        objColors.push(parts.slice(3).map(parseFloat));
      } else {
        objPositions.push(parts.map(parseFloat));
      }
    },
    f(parts) {
      const numTriangles = parts.length - 2;
      for (let tri = 0; tri < numTriangles; ++tri) {
        addVertex(parts[0]);
        addVertex(parts[tri + 1]);
        addVertex(parts[tri + 2]);
      }
    },
  };

  const keywordRE = /(\w*)(?: )*(.*)/;
  const lines = text.split("\n");
  for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
    const line = lines[lineNo].trim();
    if (line === "" || line.startsWith("#")) {
      continue;
    }
    const m = keywordRE.exec(line);
    if (!m) {
      continue;
    }
    const [, keyword, unparsedArgs] = m;
    const parts = line.split(/\s+/).slice(1);
    const handler = keywords[keyword];
    if (!handler) {
      console.warn("unhandled keyword:", keyword); // eslint-disable-line no-console
      continue;
    }
    handler(parts, unparsedArgs);
  }

  return {
    position: webglVertexData[0],
    color: webglVertexData[3],
  };
}

var textCtx = document.createElement("canvas").getContext("2d");

// Puts text in center of canvas.
function makeTextCanvas(text, width, height) {
  textCtx.canvas.width = width;
  textCtx.canvas.height = height;
  textCtx.font = "50px monospace";
  textCtx.textAlign = "center";
  textCtx.textBaseline = "middle";
  textCtx.fillStyle = "blue";
  textCtx.clearRect(0, 0, textCtx.canvas.width, textCtx.canvas.height);
  textCtx.fillText(text, width / 2, height / 2);
  return textCtx.canvas;
}

function loadImageTexture(url) {
  // Create a texture.
  const gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    0,
    0,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );
  // Asynchronously load an image
  const image = new Image();
  image.src = url;
  image.addEventListener("load", function () {
    // Now that the image has loaded make copy it to the texture.
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    // assumes this texture is a power of 2
    gl.generateMipmap(gl.TEXTURE_2D);
  });

  return texture;
}

async function main(num_of_files, rotationspeed) {
  console.log("main", num_of_files);
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  const canvas = document.querySelector("#canvas");
  const gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  const vs = `
    attribute vec4 a_position;
    
    attribute vec4 a_color;
  
    uniform mat4 u_projection;
    uniform mat4 u_view;
    uniform mat4 u_world;
    
    varying vec4 v_color;
    uniform mat4 u_textureMatrix;
    varying vec4 v_projectedTexcoord;
    void main() {
      vec4 worldPosition = u_world * a_position;
      gl_Position = u_projection * u_view * worldPosition;
      
      v_color = a_color;
      v_projectedTexcoord = u_textureMatrix * worldPosition;
    }
    `;

  const fs = `
    precision mediump float;
    
    varying vec4 v_color;
    varying vec4 v_projectedTexcoord;
    uniform vec4 u_diffuse;
    uniform vec3 u_lightDirection;
    uniform sampler2D u_projectedTexture;
    void main () {
      vec3 projectedTexcoord = v_projectedTexcoord.xyz / v_projectedTexcoord.w;
      bool inRange =
              projectedTexcoord.x >= 0.0 &&
              projectedTexcoord.x <= 0.1 &&
              projectedTexcoord.y >= 0.0 &&
              projectedTexcoord.y <= 0.1;
  
      vec4 projectedTexColor = texture2D(u_projectedTexture, projectedTexcoord.xy);
      float projectedAmount = inRange ? 1.0 : 0.0;
      
      gl_FragColor = v_color;
    }
    `;
  // compiles and links the shaders, looks up attribute and uniform locations
  const meshProgramInfo = webglUtils.createProgramInfo(gl, [vs, fs]);

  const imageTexture = loadImageTexture("/static/images/obj/test.png");

  //make elements
  //credits to https://webglfundamentals.org/webgl/lessons/webgl-multiple-views.html for guidance on making multiple canvas views
  function createElem(type, parent, className) {
    const elem = document.createElement(type);
    parent.appendChild(elem);
    if (className) {
      elem.className = className;
    }
    return elem;
  }
  const contentElem = document.querySelector("#content");
  const items = [];

  for (let i = 0; i < num_of_files; i++) {
    let url = "/static/images/obj/" + i + ".obj";
    console.log(url);
    const response = await fetch(url);
    const text = await response.text();
    console.log("text", text);
    const data = parseOBJ(text);
    const outerElem = createElem("div", contentElem, "item");
    const viewElem = createElem("div", outerElem, "view");
    const bufferInfo = webglUtils.createBufferInfoFromArrays(gl, data);
    items.push({
      bufferInfo: bufferInfo,
      element: viewElem,
    });
  }

  // create a buffer for each array by calling
  // gl.createBuffer, gl.bindBuffer, gl.bufferData

  const cameraTarget = [190, 190, 0];
  const cameraPosition = [190, 190, 500];
  const zNear = 0.1;
  const zFar = 600;

  function degToRad(deg) {
    return (deg * Math.PI) / 180;
  }

  function render(time) {
    console.log("in render");
    time *= rotationspeed; // convert to seconds

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.SCISSOR_TEST);

    for (const { bufferInfo, element } of items) {
      const rect = element.getBoundingClientRect();
      if (
        rect.bottom < 0 ||
        rect.top > gl.canvas.clientHeight ||
        rect.right < 0 ||
        rect.left > gl.canvas.clientWidth
      ) {
        continue; // it's off screen
      }

      const width = rect.right - rect.left;
      const height = rect.bottom - rect.top;
      const left = rect.left;
      const bottom = gl.canvas.clientHeight - rect.bottom;

      gl.viewport(left, bottom, width, height);
      gl.scissor(left, bottom, width, height);

      const fieldOfViewRadians = degToRad(60);
      const aspect = width / height;
      const projection = m4.perspective(
        fieldOfViewRadians,
        aspect,
        zNear,
        zFar
      );

      const up = [0, 1, 0];
      // Compute the camera's matrix using look at.
      const camera = m4.lookAt(cameraPosition, cameraTarget, up);

      // Make a view matrix from the camera matrix.
      const view = m4.inverse(camera);

      let textureMatrix = m4.identity();
      textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
      textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
      textureMatrix = m4.multiply(textureMatrix, projection);
      textureMatrix = m4.multiply(textureMatrix, m4.inverse(camera));

      const sharedUniforms = {
        u_lightDirection: m4.normalize([-1, 3, 5]),
        u_view: view,
        u_projection: projection,
        u_textureMatrix: textureMatrix,
        u_projectedTexture: imageTexture,
      };

      gl.useProgram(meshProgramInfo.program);

      // calls gl.uniform
      webglUtils.setUniforms(meshProgramInfo, sharedUniforms);

      // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer
      webglUtils.setBuffersAndAttributes(gl, meshProgramInfo, bufferInfo);

      // calls gl.uniform
      //console.log(m4.yRotation(time));
      //u_world: m4.translation(0, 0, 0),
      //m4.yRotation(0.7)
      const mat = m4.multiply(camera, m4.inverse(projection));
      webglUtils.setUniforms(meshProgramInfo, {
        u_world: m4.yRotation(time),
        u_diffuse: [1, 0.7, 0.5, 1],
      });

      // calls gl.drawArrays or gl.drawElements
      webglUtils.drawBufferInfo(gl, bufferInfo);
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//handle image form
function checkImg() {
  console.log("check image is run");
  let imgFile;
  let one;
  let two;
  let three;

  document.getElementById("input-img").addEventListener("input", (event) => {
    const imgElement = document.getElementById("input-img");
    const form = document.getElementById("img-form");
    console.log("muliple files", imgElement.files);
    let keys = Object.keys(imgElement.files);
    for (let i = 0; i < keys.length; i++) {
      let input = document.createElement("input");
      input.setAttribute("id", `${i}`);
      form.insertAdjacentElement("beforeend", input);
    }
  });

  document
    .getElementById("submit-img")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      const imgElement = document.getElementById("input-img");
      console.log("muliple files", imgElement.files);

      let promises = [];
      for (let file of imgElement.files) {
        let filePromise = new Promise((resolve) => {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
        promises.push(filePromise);
      }

      const allFileContents = await Promise.all(promises);
      console.log("all file content", allFileContents);

      let objPromises = [];
      for (let i = 0; i < allFileContents.length; i++) {
        let imageText = document.getElementById(`${i}`).value;
        let res = fetch("/create-obj-file", {
          method: "POST",
          // keepalive: true,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            img: allFileContents[i],
            text: imageText,
            name: `${i}`,
          }),
        });
        objPromises.push(res);
      }
      console.log(objPromises);
      let done = await Promise.all(objPromises);
      console.log("done", done);
      console.log("calling main");

      let rotationspeed = document.getElementById("rotation-speed").value;
      if (rotationspeed == "") {
        rotationspeed = 0.001;
      }

      main(imgElement.files.length, rotationspeed);
    });
}

checkImg();
