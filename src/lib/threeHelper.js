import * as Three from 'three';
import { Tween, autoPlay, Easing } from 'es6-tween'
import { TrackballControls } from 'three-trackballcontrols-ts';
import { Object3D, Mesh, Group, Line, Geometry, Vector3, LineCurve, Vector2, CatmullRomCurve3, Points, CurvePath, LineBasicMaterial, TubeGeometry, LineCurve3, LatheGeometry, Shape, ShapeGeometry, Path, ExtrudeBufferGeometry, ImageLoader, MeshLambertMaterial, TextureLoader, Texture, DoubleSide, BoxGeometry, VideoTexture, MeshPhongMaterial, SphereGeometry, CubeTextureLoader, SpriteMaterial, Sprite, PlaneGeometry, AudioListener, Audio, AudioLoader, AudioAnalyser } from 'three';
const OrbitControls = require('three-orbit-controls')(Three);


class GetInterval {
    T0 = new Date();

    get() {
        let T1 = new Date();//本次时间
        let t = T1 - this.T0;//时间差
        this.T0 = T1;//把本次时间赋值给上次时间
        return t;
    }
}

class ThreeHelper {
    constructor() {
        this.scene = new Three.Scene();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.ele = document.body;

        this.addAmbientLignt();
        this.addPointLignt();

        //1-3
        // this.addBoxGeometry();
        // this.addCylinderGeometry();
        // this.addBufferGeometry();
        // this.addBasicGeometry();

        //4
        // this.add4BoxGeometry();
        // this.add5SoptLight();

        //5
        // this.add5shadow();

        //6
        // this.addGroupModels();
        // console.log(this.scene.getObjectByName('头部'), this.scene.getObjectById(19));

        //7几何体，曲线
        //this.addArcCurve();
        // this.addLineCurve3();
        // this.addCatmullRomCurve();
        // this.addQuadraticBezierCurve();
        // this.addCubicBezierCurve();
        // this.addCurvePath();
        // this.addTubeGeometry();
        // this.addTubeGeometryFromCurvePath();
        // this.addLatheGeometry();
        // this.addShape();
        // this.addShape2();
        // this.addShape3();
        // this.addExtrudeGeometry();

        //8.texture
        //this.addTextureGeo();
        // this.addImageLoader();
        // this.addGeometryForMaterialIndex();
        // this.addVideoTexture();
        // this.addNormalTexture();
        // this.addGlobalNormalTexture();
        // this.addWallNormalTexture();
        // this.addEnvMap();

        //10.sprite
        this.addTrees();
        this.addRains();

        //13.audio
        this.addBgMusic();

        this.addCamera();
        this.addRender();
        this.addControls();
        this.addAxisHelper();

        this.animate();
    }
    13.
    addBgMusic() {
        let listener = new AudioListener();
        let audio = new Audio(listener);

        new AudioLoader().load('1.mp3', (audioBuffer) => {
            audio.setBuffer(audioBuffer);
            audio.setLoop(true);
            audio.setVolume(1);
            audio.play();
            this.analyser = new AudioAnalyser(audio, 256);
        });
        this.scene.add(audio);

        this.group = new Group();
        let N = 128; //控制音频分析器返回频率数据数量
        for (let i = 0; i < N / 2; i++) {
            var box = new BoxGeometry(10, 100, 10); //创建一个立方体几何对象
            var material = new MeshPhongMaterial({
                color: 0x0000ff
            }); //材质对象
            var mesh = new Mesh(box, material); //网格模型对象
            // 长方体间隔20，整体居中
            mesh.position.set(20 * i - N / 2 * 10, 200, 0)
            this.group.add(mesh)
        }
        this.scene.add(this.group)
    }



    //10.
    addTrees() {
        let texture = new TextureLoader().load('tree.png');
        let material = new SpriteMaterial({
            map: texture
        });

        for (let index = 0; index < 100; index++) {
            let mesh = new Sprite(material);
            this.scene.add(mesh);
            let x = Math.random() - 0.5;
            let z = Math.random() - 0.5;
            mesh.scale.set(100, 100, 1);
            mesh.position.set(x * 1000, 50, z * 1000);

        }

        //addGround
        let materialG = new MeshLambertMaterial({
            color: 0x777700,
            side: DoubleSide
        });

        let geometry = new PlaneGeometry(1000, 1000);
        this.scene.add(new Mesh(geometry, materialG));
        geometry.rotateX(-Math.PI / 2);

    }

    addRains() {
        let texture = new TextureLoader().load('rain.png');
        let material = new SpriteMaterial({
            map: texture
        });
        this.rainGroup = new Group();
        for (let index = 0; index < 14000; index++) {
            let mesh = new Sprite(material);
            this.rainGroup.add(mesh);
            let x = Math.random() - 0.5;
            let y = Math.random();
            let z = Math.random() - 0.5;
            mesh.scale.set(3, 3, 1);
            mesh.position.set(x * 1000, 1000 * y, z * 1000);

        }

        this.scene.add(this.rainGroup);

    }

    //8.
    addEnvMap() {
        let geometry = new BoxGeometry(100, 140, 140);
        let cubeTexture = new CubeTextureLoader().load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
        let material = new MeshPhongMaterial({
            // envMap: cubeTexture
        });
        this.scene.add(new Mesh(geometry, material));
        this.scene.background = cubeTexture;
    }
    addWallNormalTexture() {
        let geometry = new BoxGeometry(100, 140, 140);
        let texture = new TextureLoader().load('brick_diffuse.jpg');
        let textureBump = new TextureLoader().load('brick_bump.jpg');
        let material = new MeshPhongMaterial({
            map: texture,
            bumpMap: textureBump
        });
        this.scene.add(new Mesh(geometry, material));
    }
    addGlobalNormalTexture() {
        let geometry = new SphereGeometry(100, 40, 40);
        let texture = new TextureLoader().load('earth_atmos.jpg');
        let textureNormal = new TextureLoader().load('earth_normal.jpg');
        let material = new MeshPhongMaterial({
            map: texture,
            normalMap: textureNormal
        });
        this.scene.add(new Mesh(geometry, material));
    }
    addNormalTexture() {
        let texture = new TextureLoader().load('3_256.jpg');
        let material = new MeshPhongMaterial({
            normalMap: texture,
            normalScale: new Vector2(3, 3),
            color: 0x0000ff,
        });

        let geometry = new BoxGeometry(100, 100, 100);
        this.scene.add(new Mesh(geometry, material));
    }
    addVideoTexture() {//视频贴图
        let video = document.createElement('video');
        video.src = 'movie.ogv';
        video.loop = true;
        video.autoplay = 'autoplay';
        let texture = new VideoTexture(video);
        texture.needsUpdate = true;
        var geometry = new Three.PlaneGeometry(108, 71); //矩形平面
        var material = new Three.MeshPhongMaterial({
            map: texture, // 设置纹理贴图
        }); //材质对象Material
        var mesh = new Three.Mesh(geometry, material); //网格模型对象Mesh
        this.scene.add(mesh); //网格模型添加到场景中
    }
    addGeometryForMaterialIndex() {
        let geometry = new BoxGeometry(100, 100, 100);
        let material1 = new MeshLambertMaterial({ color: 0x0000ff });
        let texture = new TextureLoader().load('earth.jpg');
        //阵列
        texture.wrapS = Three.RepeatWrapping;
        texture.wrapT = Three.RepeatWrapping;
        texture.repeat.set(2, 2);
        //旋转
        texture.rotation = Math.PI / 2;
        texture.center.set(0.5, 0.5);

        //偏移
        texture.offset = new Vector2(0.1, 0.2);
        // this.texture = texture;
        let material2 = new MeshLambertMaterial({
            map: texture,
            // transparent: true
        });

        let mesh = new Mesh(geometry, [material1, material2, material2, material2, material2, material2]);
        this.scene.add(mesh);
    }
    addTextureGeo() {
        let geometry = new Three.SphereGeometry(60, 25, 25);
        // let geometry = new Three.PlaneGeometry(204, 102, 4, 4);
        let texture = new TextureLoader().load('earth.jpg');
        texture.wrapS = Three.RepeatWrapping;
        texture.wrapT = Three.RepeatWrapping;
        // uv两个方向纹理重复数量
        texture.repeat.set(1, 1);
        this.texture = texture;
        let material = new MeshLambertMaterial({
            map: this.texture,
            side: DoubleSide
        });
        this.scene.add(new Mesh(geometry, material));

        //改变uv坐标
        // geometry.faceVertexUvs[0].forEach(ele => {
        //     ele.forEach(vector2 => vector2.set(0.3, 0.3))
        // })
        var t0 = new Vector2(0, 1); //图片左下角
        var t1 = new Vector2(0, 0); //图片右下角
        var t2 = new Vector2(1, 0); //图片右上角
        var t3 = new Vector2(1, 1); //图片左上角
        var uv1 = [t0, t1, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
        var uv2 = [t1, t2, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
        // 设置第五、第六个三角形面对应的纹理坐标
        geometry.faceVertexUvs[0][4] = uv1
        geometry.faceVertexUvs[0][5] = uv2
    }

    addImageLoader() {
        let geometry = new Three.SphereGeometry(60, 25, 25);
        let image = new ImageLoader().load('earth.jpg');
        let texture = new Texture(image);
        texture.needsUpdate = true;
        let material = new MeshLambertMaterial({
            map: texture
        });
        this.scene.add(new Mesh(geometry, material));
    }

    //7.
    addExtrudeGeometry() {
        var shape = new Shape();
        /**四条直线绘制一个矩形轮廓*/
        // shape.moveTo(0, 0);//起点
        // shape.lineTo(0, 100);//第2点
        // shape.lineTo(100, 100);//第3点
        // shape.lineTo(100, 0);//第4点
        // shape.lineTo(0, 0);//第5点

        shape.moveTo(0, 0);//起点
        shape.lineTo(0, 10);//第2点
        shape.lineTo(10, 10);//第3点
        shape.lineTo(10, 0);//第4点
        shape.lineTo(0, 0);//第5点

        var curve = new Three.CatmullRomCurve3([
            new Three.Vector3(-10, -50, -50),
            new Three.Vector3(10, 0, 0),
            new Three.Vector3(8, 50, 50),
            new Three.Vector3(-5, 0, 100)]);
        var geometry = new ExtrudeBufferGeometry(shape, {
            amount: 120,//拉伸长度
            extrudePath: curve,
            steps: 50//扫描方向细分数
            // bevelEnabled:false//无倒角
        });


        var material = new Three.PointsMaterial({
            color: 0x0000ff,
            // size: 5.0//点对象像素尺寸
        });//材质对象
        this.scene.add(new Mesh(geometry, material));
    }

    //shp中间挖空
    addShape3() {
        var shape = new Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, 100);
        shape.lineTo(100, 100);
        shape.lineTo(100, 0);
        shape.lineTo(0, 0);

        var hole = new Path();
        hole.arc(50, 50, 40, 0, 2 * Math.PI);//圆弧
        // hole.moveTo(20, 20);//起点
        // hole.lineTo(20, 80);//第2点
        // hole.lineTo(80, 80);//第3点
        // hole.lineTo(80, 20);//第4点
        // hole.lineTo(20, 20);//第5点

        shape.holes.push(hole);
        var geometry = new ShapeGeometry(shape, 30);
        let material = new Three.MeshBasicMaterial({
            color: 0xff0000,
            side: Three.DoubleSide,
            // wireframe: true
        });
        //线条模型对象
        var tube = new Mesh(geometry, material);
        this.scene.add(tube);
    }
    //添加shape2样式
    addShape2() {
        // 圆弧与直线连接
        var shape = new Shape(); //Shape对象
        var R = 50;
        // 绘制一个半径为R、圆心坐标(0, 0)的半圆弧
        shape.absarc(0, 0, R, 0, Math.PI);
        //从圆弧的一个端点(-R, 0)到(-R, -200)绘制一条直线
        shape.lineTo(-R, -200);
        // 绘制一个半径为R、圆心坐标(0, -200)的半圆弧
        shape.absarc(0, -200, R, Math.PI, 2 * Math.PI);
        //从圆弧的一个端点(R, -200)到(-R, -200)绘制一条直线
        shape.lineTo(R, 0);
        var geometry = new ShapeGeometry(shape, 30);
        let material = new Three.MeshBasicMaterial({
            color: 0xff0000,
            side: Three.DoubleSide,
            // wireframe: true
        });
        //线条模型对象
        var tube = new Mesh(geometry, material);
        this.scene.add(tube);
    }
    //添加shape样式
    addShape() {
        var points = [
            new Vector2(-50, -50),
            new Vector2(-60, 0),
            new Vector2(0, 50),
            new Vector2(60, 0),
            new Vector2(50, -50),
            new Vector2(-50, -50),
        ]

        var shp = new Shape(points);
        shp.absarc(0, 0, 100, 0, 2 * Math.PI);
        var geometry = new ShapeGeometry(shp, 25);
        let material = new Three.MeshBasicMaterial({
            color: 0xff0000,
            side: Three.DoubleSide,
            wireframe: true
        });
        //线条模型对象
        var tube = new Mesh(geometry, material);
        this.scene.add(tube);
    }
    //添加旋转模型
    addLatheGeometry() {
        var points = [
            new Vector2(50, 60),
            new Vector2(25, 0),
            new Vector2(50, -60)
        ];

        var shape = new Shape();
        //光滑的曲面
        shape.splineThru(points);
        var geometry = new LatheGeometry(shape.getPoints(30), 30);
        // var geometry = new LatheGeometry(points, 30);
        let material = new Three.MeshBasicMaterial({
            color: 0xff0000,
            side: Three.DoubleSide,
            // wireframe:true
        });
        //线条模型对象
        var tube = new Mesh(geometry, material);
        this.scene.add(tube);
    }

    addTubeGeometryFromCurvePath() {
        var R = 80;
        var line1 = new LineCurve3(new Vector3(R, 200, 0), new Vector3(R, 0, 0));
        var line2 = new LineCurve3(new Vector3(-R, 0, 0), new Vector3(-R, 200, 0));
        // var curve = new Three.ArcCurve3(0, 0, R, 0, Math.PI, true);
        var curve = new CatmullRomCurve3([new Vector3(R, 0, 0), new Vector3(-R, 0, 0)]);


        var curvePath = new CurvePath();
        curvePath.curves.push(line1, curve, line2);

        var geometry = new TubeGeometry(curvePath, 40, 2, 20, false);
        //材质对象
        let material = new Three.MeshBasicMaterial({
            color: 0xff0000
        });
        //线条模型对象
        var tube = new Mesh(geometry, material);
        this.scene.add(tube); //线条对象添加到场景中
    }

    addTubeGeometry() {
        var points = [
            new Vector3(-50, 20, 90),
            new Vector3(-10, 40, 40),
            new Vector3(0, 0, 0),
            new Vector3(60, -60, 0),
            new Vector3(70, 0, 80)
        ];
        let material = new Three.MeshBasicMaterial({
            color: 0xff0000
        });

        var curve = new CatmullRomCurve3(points);
        var geometry = new TubeGeometry(curve, 40, 2, 20);
        // geometry.setFromPoints(curve.getPoints(100));
        this.scene.add(new Mesh(geometry, material));
    }
    addCurvePath() {
        var R = 80;
        var line1 = new LineCurve(new Vector2(R, 200, 0), new Vector2(R, 0, 0));
        var line2 = new LineCurve(new Vector2(-R, 0, 0), new Vector2(-R, 200, 0));
        var curve = new Three.ArcCurve(0, 0, R, 0, Math.PI, true);

        var curves = new CurvePath();
        curves.curves.push(line1, curve, line2);

        var geometry = new Geometry();
        var points = curves.getPoints(200);
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        var material = new LineBasicMaterial({
            color: 0x000000
        });
        //线条模型对象
        var line = new Line(geometry, material);
        this.scene.add(line); //线条对象添加到场景中
    }

    addCubicBezierCurve() {
        var p1 = new Vector3(-80, 0, 0);
        var p2 = new Vector3(-40, 100, 0);
        var p3 = new Vector3(40, 100, 0);
        var p4 = new Vector3(80, 0, 0);
        var curve = new Three.CubicBezierCurve3(p1, p2, p3, p4);

        let material = new Three.LineBasicMaterial({
            color: 0x000000
        });
        var geometry = new Geometry();
        geometry.setFromPoints(curve.getPoints(100));
        this.scene.add(new Line(geometry, material));

        let pointsMaterial = new Three.PointsMaterial({
            color: 0xff0000,
            size: 5
        });
        var pointsGeo = new Three.Geometry();
        pointsGeo.vertices.push(p1, p2, p3, p4);
        this.scene.add(new Points(pointsGeo, pointsMaterial));

    }
    addQuadraticBezierCurve() {
        var p1 = new Vector3(-80, 0, 0);
        var p2 = new Vector3(20, 100, 0);
        var p3 = new Vector3(80, 0, 0);
        var curve = new Three.QuadraticBezierCurve3(p1, p2, p3);

        let material = new Three.LineBasicMaterial({
            color: 0x000000
        });
        var geometry = new Geometry();
        geometry.setFromPoints(curve.getPoints(100));
        this.scene.add(new Line(geometry, material));

        let pointsMaterial = new Three.PointsMaterial({
            color: 0xff0000,
            size: 5
        });
        var pointsGeo = new Three.Geometry();
        pointsGeo.vertices.push(p1, p2, p3);
        this.scene.add(new Points(pointsGeo, pointsMaterial));
    }

    addCatmullRomCurve() {
        var points = [
            new Vector3(-50, 20, 90),
            new Vector3(-10, 40, 40),
            new Vector3(0, 0, 0),
            new Vector3(60, -60, 0),
            new Vector3(70, 0, 80)
        ];
        let material = new Three.LineBasicMaterial({
            color: 0x000000
        });
        var geometry = new Geometry();
        var curve = new CatmullRomCurve3(points);
        geometry.setFromPoints(curve.getPoints(100));
        this.scene.add(new Line(geometry, material));

        let pointsMaterial = new Three.PointsMaterial({
            color: 0xff0000,
            size: 5
        });
        var pointsGeo = new Three.Geometry();
        pointsGeo.vertices.push(...points);
        this.scene.add(new Points(pointsGeo, pointsMaterial));

    }

    addArcCurve() {
        let arc = new Three.ArcCurve(0, 0, 50, 0, 2);
        let material = new Three.LineBasicMaterial({
            color: 0xffff00
        });
        let geometry = new Geometry();
        geometry.setFromPoints(arc.getPoints(50));
        let lineGeometry = new Line(geometry, material);
        this.scene.add(lineGeometry);
    }

    addLineCurve3() {
        var p1 = new Vector3(50, 0, 10); //顶点1坐标
        var p2 = new Vector3(0, 70, 30); //顶点2坐标
        var lineCurve3 = new Three.LineCurve3(p1, p2);
        let material = new Three.LineBasicMaterial({
            color: 0xffff00
        });
        var lineCurve = new LineCurve(new Three.Vector2(10, 0), new Three.Vector2(0, 70));

        let geometry = new Geometry();
        geometry.setFromPoints(lineCurve3.getPoints(2));
        let lineGeometry = new Line(geometry, material);
        this.scene.add(lineGeometry);
    }

    //6.group
    addGroupModels() {
        // 头部网格模型和组
        var headMesh = sphereMesh(10, 0, 0, 0);
        headMesh.name = "脑壳"
        var leftEyeMesh = sphereMesh(1, 8, 5, 4);
        leftEyeMesh.name = "左眼"
        var rightEyeMesh = sphereMesh(1, 8, 5, -4);
        rightEyeMesh.name = "右眼"
        var headGroup = new Group();
        headGroup.name = "头部"
        headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
        // 身体网格模型和组
        var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
        neckMesh.name = "脖子"
        var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
        bodyMesh.name = "腹部"
        var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
        leftLegMesh.name = "左腿"
        var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
        rightLegMesh.name = "右腿"
        var legGroup = new Group();
        legGroup.name = "腿"
        legGroup.add(leftLegMesh, rightLegMesh);
        var bodyGroup = new Group();
        bodyGroup.name = "身体"
        bodyGroup.add(neckMesh, bodyMesh, legGroup);
        // 人Group
        var personGroup = new Group();
        personGroup.name = "人"
        personGroup.add(headGroup, bodyGroup)
        personGroup.translateY(50)
        this.scene.add(personGroup);

        // 球体网格模型创建函数
        function sphereMesh(R, x, y, z) {
            var geometry = new Three.SphereGeometry(R, 25, 25); //球体几何体
            var material = new Three.MeshPhongMaterial({
                color: 0x0000ff
            }); //材质对象Material
            var mesh = new Three.Mesh(geometry, material); // 创建网格模型对象
            mesh.position.set(x, y, z);
            return mesh;
        }
        // 圆柱体网格模型创建函数
        function cylinderMesh(R, h, x, y, z) {
            var geometry = new Three.CylinderGeometry(R, R, h, 25, 25); //球体几何体
            var material = new Three.MeshPhongMaterial({
                color: 0x0000ff
            }); //材质对象Material
            var mesh = new Three.Mesh(geometry, material); // 创建网格模型对象
            mesh.position.set(x, y, z);
            return mesh;
        }
    }

    addAmbientLignt() {
        const ambient = new Three.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambient);
    };

    addPointLignt() {
        var point = new Three.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        this.scene.add(point); //点光源添加到场景中
    };

    //#region 1-3章
    addBoxGeometry() {
        /**
         * 创建网格模型
         */

        const geometry = new Three.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        geometry.faces.forEach(s => {
            s.vertexColors = [
                new Three.Color(0xffff00),
                new Three.Color(0xff00ff),
                new Three.Color(0x00ffff),
            ];
        });

        geometry.faces.pop();
        geometry.faces.pop();
        geometry.faces.shift();
        geometry.faces.shift();

        console.log(geometry);
        const material = new Three.MeshLambertMaterial({
            // color: 0x0000ff
            vertexColors: Three.VertexColors,
            side: Three.DoubleSide
        }); //材质对象Material
        const mesh = new Three.Mesh(geometry, material); //网格模型对象Mesh
        const sphereGeometry = new Three.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        const mesh2 = new Mesh(sphereGeometry, material);
        let group = new Group();
        group.add(mesh, mesh2);
        // group.remove(mesh2);
        this.scene.add(group); //网格模型添加到场景中

    }
    addCylinderGeometry() {
        const geometry = new Three.CylinderGeometry(50, 50, 100, 25);
        // const meterial = new THREE.MeshLambertMaterial({
        //     color: 0xff0000,
        //     opacity: 0.7,
        //     transparent: true,
        //     // wireframe: true
        // });
        const meterialPhong = new Three.MeshPhongMaterial({
            color: 0x0000ff,
            specular: 0x4488ee,
            shininess: true
        });
        const mesh = new Three.Mesh(geometry, meterialPhong);
        mesh.position.x += 200;
        this.scene.add(mesh);
    }

    addBasicGeometry() {
        let geometry = new Three.Geometry();

        let p1 = new Three.Vector3(0, 0, 0); //顶点1坐标
        let p2 = new Three.Vector3(0, 100, 0); //顶点2坐标
        let p3 = new Three.Vector3(50, 0, 0); //顶点3坐标
        let p4 = new Three.Vector3(0, 0, 100); //顶点4坐标
        geometry.vertices.push(p1, p2, p3, p4);

        let face1 = new Three.Face3(0, 1, 2);
        let n1 = new Three.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
        let n2 = new Three.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
        let n3 = new Three.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量
        face1.color = new Three.Color(0xffff00);
        face1.vertexNormals.push(n1, n2, n3);

        let face2 = new Three.Face3(0, 2, 3);
        face2.normal = new Three.Vector3(0, -1, 0);
        face2.vertexColors = [
            new Three.Color(0xffff00),
            new Three.Color(0xff00ff),
            new Three.Color(0x00ffff),
        ]
        geometry.faces.push(face1, face2);

        let meterial = new Three.MeshLambertMaterial({
            // color: 0x0000ff,
            vertexColors: Three.VertexColors,
            side: Three.DoubleSide,
            // transparent: true,
            // opacity: 0.5
        });

        let mesh = new Three.Mesh(geometry, meterial);
        this.scene.add(mesh);

    }

    addBufferGeometry() {
        let geometry = new Three.BufferGeometry();
        let vertices = new Float32Array([
            0, 0, 0, //顶点1坐标
            50, 0, 0, //顶点2坐标
            0, 100, 0, //顶点3坐标

            0, 0, 0, //顶点4坐标
            0, 0, 100, //顶点5坐标
            50, 0, 0, //顶点6坐标
        ]);
        geometry.attributes.position = new Three.BufferAttribute(vertices, 3);

        let normals = new Float32Array([
            0, 0, 1, //顶点1法向量
            0, 0, 1, //顶点2法向量
            0, 0, 1, //顶点3法向量

            1, 1, 0, //顶点4法向量
            1, 1, 0, //顶点5法向量
            1, 1, 0, //顶点6法向量
        ]);
        geometry.attributes.normal = new Three.BufferAttribute(normals, 3);

        let meterial = new Three.MeshLambertMaterial({
            color: 0x0000ff,
            side: Three.DoubleSide,
        });

        let mesh = new Three.Mesh(geometry, meterial);
        this.scene.add(mesh);

        /**
         * 点模型
         */
        let pointMeterial = new Three.PointsMaterial({
            // color: 0xff0000,
            vertexColors: Three.VertexColors,
            size: 10
        });
        let colors = new Float32Array([
            1, 0, 0, //顶点1颜色
            0, 1, 0, //顶点2颜色
            0, 0, 1, //顶点3颜色

            1, 1, 0, //顶点4颜色
            0, 1, 1, //顶点5颜色
            1, 0, 1, //顶点6颜色
        ]);
        geometry.attributes.color = new Three.BufferAttribute(colors, 3);
        let pointsMesh = new Three.Points(geometry, pointMeterial);
        // this.scene.add(pointsMesh);
        /**
         * 线模型 
        */
        let lineMaterial = new Three.LineBasicMaterial({
            // color: 0xff0000,
            vertexColors: Three.VertexColors,
        });
        let lineMesh = new Three.Line(geometry, lineMaterial);
        let lineDashedMaterial = new Three.LineDashedMaterial({
            // color: 0xff0000,
            vertexColors: Three.VertexColors,
            dashSize: 10,
            gapSize: 5
        });
        let lineDashedMesh = new Three.Line(geometry, lineDashedMaterial);
        lineDashedMesh.computeLineDistances();
        // this.scene.add(lineMesh);
        // this.scene.add(lineDashedMesh);
    }
    //#endregion

    add4BoxGeometry() {
        let geometry = new Three.BoxGeometry(100, 100, 100);
        let meterial = new Three.PointsMaterial({
            color: 0x00ff00,
            size: 5.0
        });
        let pointsMesh = new Three.Points(geometry, meterial);

        let lineMaterial = new Three.LineBasicMaterial({
            color: 0x0000ff,
        });
        // let lineMesh = new THREE.Line(geometry, lineMaterial);
        // let lineMesh = new THREE.LineLoop(geometry, lineMaterial);        
        let lineMesh = new Three.LineSegments(geometry, lineMaterial);


        // this.scene.add(pointsMesh);
        // this.scene.add(lineMesh);
        let material = new Three.MeshLambertMaterial({
            color: 0x0000ff,
        });
        let mesh = new Three.Mesh(geometry, material);
        mesh.scale.set(1, 1, 1);
        let aixs = new Three.Vector3(1, 1, 1);
        aixs.normalize();
        // mesh.rotateOnAxis(aixs, Math.PI / 4);

        let mesh2 = mesh.clone();
        // geometry.scale(1.5, 1.5, 1.5);
        mesh2.translateX(200);

        this.scene.add(mesh, mesh2);
    }

    // add5SoptLight() {
    //     let spotlight = new THREE.SpotLight(0xffffff);
    //     spotlight.position.set(-200, 0, 0);
    //     spotlight.target = this.mesh2;
    //     spotlight.angle = Math.PI / 5;
    //     this.scene.add(spotlight);
    // }

    add5shadow() {
        var geometry = new Three.BoxGeometry(40, 100, 40);
        var material = new Three.MeshLambertMaterial({
            color: 0x0000ff
        });
        var mesh = new Three.Mesh(geometry, material);
        // mesh.position.set(0,0,0)
        this.scene.add(mesh);

        // 设置产生投影的网格模型
        mesh.castShadow = true;


        //创建一个平面几何体作为投影面
        var planeGeometry = new Three.PlaneGeometry(300, 200);
        var planeMaterial = new Three.MeshLambertMaterial({
            color: 0x999999
        });
        // 平面网格模型作为投影面
        var planeMesh = new Three.Mesh(planeGeometry, planeMaterial);
        this.scene.add(planeMesh); //网格模型添加到场景中
        planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
        planeMesh.position.y = -50; //设置网格模型y坐标
        // 设置接收阴影的投影面
        planeMesh.receiveShadow = true;

        // 方向光
        var directionalLight = new Three.DirectionalLight(0xffffff, 1);
        // 设置光源位置
        directionalLight.position.set(60, 100, 40);
        this.scene.add(directionalLight);
        // 设置用于计算阴影的光源对象
        directionalLight.castShadow = true;
        // 设置计算阴影的区域，最好刚好紧密包围在对象周围
        // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 300;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 200;
        directionalLight.shadow.camera.bottom = -100;
        // 设置mapSize属性可以使阴影更清晰，不那么模糊
        // directionalLight.shadow.mapSize.set(1024, 1024)
        console.log(directionalLight.shadow.camera);
    }

    addAxisHelper() {
        const axisHelper = new Three.AxesHelper(250);
        this.scene.add(axisHelper);
    }

    addCamera() {
        // /**
        //  * 投影相机设置
        //  */
        // let k = this.width / this.height; //窗口宽高比
        // let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        // //创建相机对象
        // this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // this.camera.position.set(200, 500, 200); //设置相机位置
        // this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
        /**
         * 透视相机设置
         */
        this.camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.lookAt(new Three.Vector3(0, 0, 0));
        this.camera.position.set(100, 100, 250);


        //fly
        // setTimeout(() => {
        //     this.cameraCon({ x: 200, y: 300, z: 100 }, 3000).start();
        // }, 0)



        window.onresize = () => {
            // 重置渲染器输出画布canvas尺寸
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
            this.camera.aspect = window.innerWidth / window.innerHeight;
            // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
            // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
            // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
            this.camera.updateProjectionMatrix();
        }
    }


    addRender() {
        /**
         * 创建渲染器对象
         */
        this.renderer = new Three.WebGLRenderer();
        //开启后才能看到阴影
        this.renderer.shadowMapEnabled = true;
        this.renderer.setSize(this.width, this.height);//设置渲染区域尺寸
        this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        this.ele.appendChild(this.renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        this.renderer.render(this.scene, this.camera);

    }
    addControls() {
        this.controls = new OrbitControls(this.camera);
        // this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        // this.controls.minDistance = 10;
        this.controls.maxDistance = 5000;
        this.controls.update();
    }

    cameraCon(p, time = 6000) {
        autoPlay(true);
        var tween1 = new Tween(this.camera.position)
            .to(p, time || 200000)
            .easing(Easing.Quadratic.InOut);
        var update = ({ x, y, z }) => {
            this.camera.position.set(x, y, z);
        };
        console.log(tween1);
        tween1.on('update', update)
            .on('start', () => { this.controls.enabled = false })
            .on('complete', () => { this.controls.enabled = true });//COMPLETE
        return tween1;
    }

    interval = new GetInterval();
    // 渲染函数
    animate() {
        this.controls.update();
        requestAnimationFrame(() => this.animate());//请求再次执行渲染函数render
        this.renderer.render(this.scene, this.camera);//执行渲染操作
        // Tween.update();
        // this.mesh.rotateY(0.001 * this.interval.get());//每次绕y轴旋转0.01弧度
        // this.mesh.rotation.x += 0.01;
        // this.texture.offset.x -= 0.002

        this.rainGroup.children.forEach(rain => {
            rain.position.y -= 1;
            if (rain.position.y < 0) {
                rain.position.setY(1000);
            }
        });

        if (this.analyser) {
            // 获得频率数据N个
            var arr = this.analyser.getFrequencyData();
            // console.log(arr);
            // 遍历组对象，每个网格子对象设置一个对应的频率数据
            this.group.children.forEach((elem, index) => {
                elem.scale.y = arr[index] / 80
                elem.material.color.r = arr[index] / 200;
            });
        }
    }

}


export default ThreeHelper;