import * as Three from 'three';
import { TrackballControls } from 'three-trackballcontrols-ts';
import { Object3D, Mesh, Group, Line, Geometry, Vector3, LineCurve, Vector2, CatmullRomCurve3, Points, CurvePath, LineBasicMaterial, TubeGeometry, LineCurve3, LatheGeometry, Shape } from 'three';
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
        this.addLatheGeometry();

        this.addCamera();
        this.addRender();
        this.addControls();
        this.addAxisHelper();

        this.animate();
    }

    //7.
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
        const axisHelper = new Three.AxisHelper(250);
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
        this.camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.lookAt(new Three.Vector3(0, 0, 0));
        this.camera.position.set(10, 10, 25);
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
        this.controls.minDistance = 210;
        this.controls.maxDistance = 1000;
    }



    interval = new GetInterval();
    // 渲染函数
    animate() {
        this.controls.update();
        requestAnimationFrame(() => this.animate());//请求再次执行渲染函数render
        this.renderer.render(this.scene, this.camera);//执行渲染操作
        // this.mesh.rotateY(0.001 * this.interval.get());//每次绕y轴旋转0.01弧度
        // this.mesh.rotation.x += 0.01;
    }

}


export default ThreeHelper;