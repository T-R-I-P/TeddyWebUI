$(function(){
    var marginTop = 0;
    var TOP = -800;
    var DOWN = -2400;
    $('#main .rollDown').on('click', function(){
        marginTop -= 800;
        $('#firstDiv').animate({ marginTop: marginTop + 'px'}, 1000);
        
        BorN(marginTop);
    });
    $('#main .rollUp').on('click', function(){
        marginTop += 800;
        BorN(marginTop);
        $('#firstDiv').animate({ marginTop: marginTop + 'px'}, 1000);
    });
	
	$('#main #startBtn').on('click', function(){
		$('#main #three-container').fadeOut();
		$('#rollDiv .btn-large').css('color', 'white');
	});
    
    function BorN(marginTop) {
        
        var showCss = {'background': '#26a69a', 'box-shadow': '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)'};
        var hideCss = {'background': 'none', 'box-shadow': 'none'}; 
        //if(marginTop > TOP || marginTop <= DOWN) $('#rollDiv .rollDown').css(hideCss);
		//else if(DOWN < marginTop && marginTop <= TOP)  $('#rollDiv .rollDown').css(showCss);
		
		if(marginTop > TOP || marginTop <= DOWN) $('#rollDiv .rollDown').fadeOut();
		else if(DOWN < marginTop && marginTop <= TOP)  $('#rollDiv .rollDown').fadeIn();
        
        
        //if(marginTop < TOP)  $('#rollDiv .rollUp').css(showCss);
        //else $('#rollDiv .rollUp').css(hideCss);
		if(marginTop < TOP)  $('#rollDiv .rollUp').fadeIn();
        else $('#rollDiv .rollUp').fadeOut();
    }
        
    
    $("#main .wrap .drawButton").on("click", function () {
        var timer = null;
        var ele = $(this);
        $.ajax({
            url: "./openTeddy.php",
            type: "GET",
            data: {option: 'teddy'},
            error: function(error) {
                alert("fault");
            },
            success: function(data) {
                console.log(data);
            }
        }).done(function(){
        $('#teddyCenter button').css("display","block");
        $('#teddyCenter img').attr('src',"Img/check_arrow_2.svg");
        ele.parent().find('.loader').css('display', 'none');
        renameObj();
		});
        
        $(this).removeClass("filled");
        $(this).addClass("circle");
        $(this).html("");
        $(this).parent().find("svg").css("display", "block");
        $(this).parent().find(".circle_2").attr("class", "circle_2 fill_circle");
        $('#teddyCenter button').css("display","none");
        ele.parent().find('.loader').css('display', 'block');

        timer = setInterval(
            function tick() {
                ele.addClass("filled");
                // self.html("b");
                ele.parent().find("img").css("display", "block");
                ele.parent().find("svg").css("display", "none");
                clearInterval(timer);
            }
        , 100);
    });

    function renameObj() {
        console.log('here!');      
        $.ajax({
            url: "./openTeddy.php",
            type: "GET",
            data: {option: 'renameObj'},
            error: function(error) {
                alert("fault");
            },
            success: function(data) {
                console.log('rename obj:');
            }
        });
    }
    
    $("#main .wrap .compButton").on("click", function () {
      var timer = null;
      var ele = $(this);
      $.ajax({
          url: "./openTeddy.php",
          type: "GET",
          data: {option: 'unity'},
          error: function(error) {
            alert("fault");
          },
          success: function(data) {
            console.log(data);
          }
        }).done(function(){

        $('#teddyCompile button').css("display","block");
        $('#teddyCompile img').attr('src',"Img/check_arrow_2.svg");
        ele.parent().find('.loader').css('display', 'none');
        $('#LastDiv #runUnityBtn').css("visibility","visible");
      });

      $(this).removeClass("filled");
      $(this).addClass("circle");
      $(this).html("");
      $('#teddyCompile button').css("display","none");
      $(this).parent().find("svg").css("display", "block");
      $(this).parent().find(".circle_2").attr("class", "circle_2 fill_circle");
      $(this).parent().find('.loader').css('display', 'block');

      timer = setInterval(
        function tick() {
            ele.addClass("filled");
            // self.html("b");
            ele.parent().find("img").css("display", "block");
            ele.parent().find("svg").css("display", "none");
            clearInterval(timer);
        }
      , 100);
    //});    
    });
        
    $('#LastDiv #runUnityBtn').on("click", function () {
        $.ajax({
            url: "./openTeddy.php",
            type: "GET",
            data: {option: 'run'},
            error: function(error) {
                alert("fault");
            },
            success: function(data) {
                console.log(data);
            }
        });
    }).hover(function(){
        var yes = $('#Yes');
        if(yes.css("opacity") == "1")
          yes.css("opacity", "0").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', HideTheElementAfterAnimation);
        else
         yes.css("display", "block").css("opacity", "1").unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend");


    });
    
   
   //three
    
  var root = new THREERoot({
    createCameraControls:!true,
    antialias:true,
    fov:90
  });
  root.renderer.setClearColor(0x000000);
  root.renderer.setPixelRatio(window.devicePixelRatio || 1);
  root.camera.position.set(0, 0, 250);

  var textAnimation = createTextAnimation();
  root.scene.add(textAnimation);

  var light = new THREE.DirectionalLight();
  light.position.set(0, 0, 1);
  root.scene.add(light);

  var tl = new TimelineMax({
    repeat:-1,
    repeatDelay:0.25,
    yoyo:true
  });
  tl.fromTo(textAnimation, 8,
    {animationProgress:0.0},
    {animationProgress:0.9, ease:Power1.easeInOut},
    0
  );
  // tl.to(root.camera.position, 8, {z:-350, ease:Power1.easeInOut}, 0);

  createTweenScrubber(tl);
});


function createTextAnimation() {
  var geometry = generateTextGeometry('Teddying', {
    size:14,
    height:4,
    font:'droid sans',
    weight:'bold',
    style:'normal',
    curveSegments:24,
    bevelSize:1,
    bevelThickness:1,
    bevelEnabled:true,
    anchor:{x:0.5, y:0.5, z:0.5}
  });

  THREE.BAS.Utils.separateFaces(geometry);

  return new TextAnimation(geometry);
}

function generateTextGeometry(text, params) {
  var geometry = new THREE.TextGeometry(text, params);

  geometry.computeBoundingBox();

  geometry.userData = {};
  geometry.userData.size = {
    width: geometry.boundingBox.max.x - geometry.boundingBox.min.x,
    height: geometry.boundingBox.max.y - geometry.boundingBox.min.y,
    depth: geometry.boundingBox.max.z - geometry.boundingBox.min.z
  };

  var anchorX = geometry.userData.size.width * -params.anchor.x;
  var anchorY = geometry.userData.size.height * -params.anchor.y;
  var anchorZ = geometry.userData.size.depth * -params.anchor.z;
  var matrix = new THREE.Matrix4().makeTranslation(anchorX, anchorY, anchorZ);

  geometry.applyMatrix(matrix);

  return geometry;
}

////////////////////
// CLASSES
////////////////////

function TextAnimation(textGeometry) {
  var bufferGeometry = new THREE.BAS.ModelBufferGeometry(textGeometry);

  var aAnimation = bufferGeometry.createAttribute('aAnimation', 2);
  var aCentroid = bufferGeometry.createAttribute('aCentroid', 3);
  var aControl0 = bufferGeometry.createAttribute('aControl0', 3);
  var aControl1 = bufferGeometry.createAttribute('aControl1', 3);
  var aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);
  var aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4);

  var faceCount = bufferGeometry.faceCount;
  var i, i2, i3, i4, v;
  var keys = ['a', 'b', 'c'];
  var vDelay = new THREE.Vector3();

  var maxDelay = 0.0;
  var minDuration = 1.0;
  var maxDuration = 1.0;
  var stretch = 0.02;
  var lengthFactor = 0.02;
  var maxLength = textGeometry.boundingBox.max.length();

  this.animationDuration = maxDuration + maxDelay + stretch + lengthFactor * maxLength;
  this._animationProgress = 0;

  var distanceZ = -150;

  var axis = new THREE.Vector3();
  var angle;

  for (i = 0, i2 = 0, i3 = 0, i4 = 0; i < faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
    var face = textGeometry.faces[i];
    var centroid = THREE.BAS.Utils.computeCentroid(textGeometry, face);

    // animation
    var delay = centroid.length() * lengthFactor + Math.random() * maxDelay;
    var duration = THREE.Math.randFloat(minDuration, maxDuration);

    for (v = 0; v < 6; v += 2) {
      var vertex = textGeometry.vertices[face[keys[v * 0.5]]];
      var vertexDelay = vDelay.subVectors(centroid, vertex).length() * 0.005;

      aAnimation.array[i2 + v    ] = delay + vertexDelay + stretch * Math.random();
      aAnimation.array[i2 + v + 1] = duration;
    }

    // centroid
    for (v = 0; v < 9; v += 3) {
      aCentroid.array[i3 + v    ] = centroid.x;
      aCentroid.array[i3 + v + 1] = centroid.y;
      aCentroid.array[i3 + v + 2] = centroid.z;
    }

    // ctrl
    var c0x = centroid.x * THREE.Math.randFloat(0.0, 1.0);
    var c0y = centroid.y * THREE.Math.randFloat(0.0, 1.0);
    var c0z = distanceZ * THREE.Math.randFloat(0.5, 0.75);

    var c1x = centroid.x * THREE.Math.randFloat(0.0, 1.0);
    var c1y = centroid.y * THREE.Math.randFloat(0.0, 1.0);
    var c1z = distanceZ * THREE.Math.randFloat(0.75, 1.0);

    for (v = 0; v < 9; v += 3) {
      aControl0.array[i3 + v    ] = c0x;
      aControl0.array[i3 + v + 1] = c0y;
      aControl0.array[i3 + v + 2] = c0z;

      aControl1.array[i3 + v    ] = c1x;
      aControl1.array[i3 + v + 1] = c1y;
      aControl1.array[i3 + v + 2] = c1z;
    }

    // end position
    var x, y, z;

    x = 0;
    y = 0;
    z = distanceZ * THREE.Math.randFloat(0.0, 1.0);

    for (v = 0; v < 9; v += 3) {
      aEndPosition.array[i3 + v    ] = x;
      aEndPosition.array[i3 + v + 1] = y;
      aEndPosition.array[i3 + v + 2] = z;
    }

    // axis angle
    // axis.x = THREE.Math.randFloatSpread(0.25);
    // axis.y = THREE.Math.randFloatSpread(0.25);
    // axis.z = 1.0;
    axis.x = -centroid.x * 0.05;
    axis.y = centroid.y * 0.05;
    axis.z = 1;

    axis.normalize();

    angle = Math.PI * THREE.Math.randFloat(2, 4);
    // angle = Math.PI * 4;

    for (v = 0; v < 12; v += 4) {
      aAxisAngle.array[i4 + v    ] = axis.x;
      aAxisAngle.array[i4 + v + 1] = axis.y;
      aAxisAngle.array[i4 + v + 2] = axis.z;
      aAxisAngle.array[i4 + v + 3] = angle;
    }
  }

  var material = new THREE.BAS.PhongAnimationMaterial({
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: {type: 'f', value: 0}
      },
      shaderFunctions: [
        THREE.BAS.ShaderChunk['cubic_bezier'],
        THREE.BAS.ShaderChunk['ease_out_cubic'],
        THREE.BAS.ShaderChunk['quaternion_rotation']
      ],
      shaderParameters: [
        'uniform float uTime;',
        'uniform vec3 uAxis;',
        'uniform float uAngle;',
        'attribute vec2 aAnimation;',
        'attribute vec3 aCentroid;',
        'attribute vec3 aControl0;',
        'attribute vec3 aControl1;',
        'attribute vec3 aEndPosition;',
        'attribute vec4 aAxisAngle;'
      ],
      shaderVertexInit: [
        'float tDelay = aAnimation.x;',
        'float tDuration = aAnimation.y;',
        'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
        'float tProgress =  ease(tTime, 0.0, 1.0, tDuration);'
         //'float tProgress = tTime / tDuration;'
      ],
      shaderTransformPosition: [
        // 'transformed -= aCentroid;',
        'transformed *= 1.0 - tProgress;',
        // 'transformed += aCentroid;',

        'transformed += cubicBezier(transformed, aControl0, aControl1, aEndPosition, tProgress);',
        // 'transformed += aEndPosition * tProgress;'

        'float angle = aAxisAngle.w * tProgress;',
        'vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);',
        'transformed = rotateVector(tQuat, transformed);'
      ]
    },
    {
      diffuse: 0xffffff
    }
  );

  THREE.Mesh.call(this, bufferGeometry, material);

  this.frustumCulled = false;
}
TextAnimation.prototype = Object.create(THREE.Mesh.prototype);
TextAnimation.prototype.constructor = TextAnimation;

Object.defineProperty(TextAnimation.prototype, 'animationProgress', {
  get: function() {
    return this._animationProgress;
  },
  set: function(v) {
    this._animationProgress = v;
    this.material.uniforms['uTime'].value = this.animationDuration * v;
  }
});

function THREERoot(params) {
  params = utils.extend({
    fov:60,
    zNear:1,
    zFar:10000,

    createCameraControls:true
  }, params);

  this.renderer = new THREE.WebGLRenderer({
    antialias:params.antialias
  });
  this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  document.getElementById('three-container').appendChild(this.renderer.domElement);

  this.camera = new THREE.PerspectiveCamera(
    params.fov,
    window.innerWidth / window.innerHeight,
    params.zNear,
    params.zfar
  );

  this.scene = new THREE.Scene();

  if (params.createCameraControls) {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  this.resize = this.resize.bind(this);
  this.tick = this.tick.bind(this);

  this.resize();
  this.tick();

  window.addEventListener('resize', this.resize, false);
}
THREERoot.prototype = {
  tick: function() {
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  },
  update: function() {
    this.controls && this.controls.update();
  },
  render: function() {
    this.renderer.render(this.scene, this.camera);
  },
  resize: function() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

////////////////////
// UTILS
////////////////////

var utils = {
  extend:function(dst, src) {
    for (var key in src) {
      dst[key] = src[key];
    }

    return dst;
  },
  randSign: function() {
    return Math.random() > 0.5 ? 1 : -1;
  }
};

function createTweenScrubber(tween, seekSpeed) {
  seekSpeed = seekSpeed || 0.001;

  function stop() {
    TweenMax.to(tween, 2, {timeScale:0});
  }

  function resume() {
    TweenMax.to(tween, 2, {timeScale:1});
  }

  function seek(dx) {
    var progress = tween.progress();
    var p = THREE.Math.clamp((progress + (dx * seekSpeed)), 0, 1);

    tween.progress(p);
  }

  var _cx = 0;

  // desktop
  var mouseDown = false;
  document.body.style.cursor = 'pointer';

  window.addEventListener('mousedown', function(e) {
    mouseDown = true;
    document.body.style.cursor = 'ew-resize';
    _cx = e.clientX;
    stop();
  });
  window.addEventListener('mouseup', function(e) {
    mouseDown = false;
    document.body.style.cursor = 'pointer';
    resume();
  });
  window.addEventListener('mousemove', function(e) {
    if (mouseDown === true) {
      var cx = e.clientX;
      var dx = cx - _cx;
      _cx = cx;

      seek(dx);
    }
  });
  // mobile
  window.addEventListener('touchstart', function(e) {
    _cx = e.touches[0].clientX;
    stop();
    e.preventDefault();
  });
  window.addEventListener('touchend', function(e) {
    resume();
    e.preventDefault();
  });
  window.addEventListener('touchmove', function(e) {
    var cx = e.touches[0].clientX;
    var dx = cx - _cx;
    _cx = cx;

    seek(dx);
    e.preventDefault();
  });
}