import * as THREE from 'three';
import { TrackballControls } from 'three-trackballcontrols-ts';
const OrbitControls = require('three-orbit-controls')(THREE);

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
        this.scene = new THREE.Scene();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.ele = document.body;

        // this.addAmbientLignt();
        // this.addPointLignt();

        //1-3
        // this.addBoxGeometry();
        // this.addCylinderGeometry();
        // this.addBufferGeometry();
        // this.addBasicGeometry();

        //4
        // this.add4BoxGeometry();
        // this.add5SoptLight();

        //5
        this.add5shadow();

        this.addCamera();
        this.addRender();
        this.addControls();
        this.addAxisHelper();

        this.animate();
    }

    addAmbientLignt() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambient);
    };

    addPointLignt() {
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        this.scene.add(point); //点光源添加到场景中
    };

    //#region 1-3章
    addBoxGeometry() {
        /**
         * 创建网格模型
         */
        // const geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        const geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        geometry.faces.forEach(s => {
            s.vertexColors = [
                new THREE.Color(0xffff00),
                new THREE.Color(0xff00ff),
                new THREE.Color(0x00ffff),
            ];
        });

        geometry.faces.pop();
        geometry.faces.pop();
        geometry.faces.shift();
        geometry.faces.shift();

        console.log(geometry);
        const material = new THREE.MeshLambertMaterial({
            // color: 0x0000ff
            vertexColors: THREE.VertexColors,
            side: THREE.DoubleSide
        }); //材质对象Material
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        this.scene.add(mesh); //网格模型添加到场景中
        this.mesh = mesh;
    }
    addCylinderGeometry() {
        const geometry = new THREE.CylinderGeometry(50, 50, 100, 25);
        // const meterial = new THREE.MeshLambertMaterial({
        //     color: 0xff0000,
        //     opacity: 0.7,
        //     transparent: true,
        //     // wireframe: true
        // });
        const meterialPhong = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            specular: 0x4488ee,
            shininess: true
        });
        const mesh = new THREE.Mesh(geometry, meterialPhong);
        mesh.position.x += 200;
        this.scene.add(mesh);
    }

    addBasicGeometry() {
        let geometry = new THREE.Geometry();

        let p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
        let p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
        let p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
        let p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标
        geometry.vertices.push(p1, p2, p3, p4);

        let face1 = new THREE.Face3(0, 1, 2);
        let n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
        let n2 = new THREE.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
        let n3 = new THREE.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量
        face1.color = new THREE.Color(0xffff00);
        face1.vertexNormals.push(n1, n2, n3);

        let face2 = new THREE.Face3(0, 2, 3);
        face2.normal = new THREE.Vector3(0, -1, 0);
        face2.vertexColors = [
            new THREE.Color(0xffff00),
            new THREE.Color(0xff00ff),
            new THREE.Color(0x00ffff),
        ]
        geometry.faces.push(face1, face2);

        let meterial = new THREE.MeshLambertMaterial({
            // color: 0x0000ff,
            vertexColors: THREE.VertexColors,
            side: THREE.DoubleSide,
            // transparent: true,
            // opacity: 0.5
        });

        let mesh = new THREE.Mesh(geometry, meterial);
        this.scene.add(mesh);

    }

    addBufferGeometry() {
        let geometry = new THREE.BufferGeometry();
        let vertices = new Float32Array([
            0, 0, 0, //顶点1坐标
            50, 0, 0, //顶点2坐标
            0, 100, 0, //顶点3坐标

            0, 0, 0, //顶点4坐标
            0, 0, 100, //顶点5坐标
            50, 0, 0, //顶点6坐标
        ]);
        geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

        let normals = new Float32Array([
            0, 0, 1, //顶点1法向量
            0, 0, 1, //顶点2法向量
            0, 0, 1, //顶点3法向量

            1, 1, 0, //顶点4法向量
            1, 1, 0, //顶点5法向量
            1, 1, 0, //顶点6法向量
        ]);
        geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

        let meterial = new THREE.MeshLambertMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide,
        });

        let mesh = new THREE.Mesh(geometry, meterial);
        this.scene.add(mesh);

        /**
         * 点模型
         */
        let pointMeterial = new THREE.PointsMaterial({
            // color: 0xff0000,
            vertexColors: THREE.VertexColors,
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
        geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
        let pointsMesh = new THREE.Points(geometry, pointMeterial);
        // this.scene.add(pointsMesh);
        /**
         * 线模型 
        */
        let lineMaterial = new THREE.LineBasicMaterial({
            // color: 0xff0000,
            vertexColors: THREE.VertexColors,
        });
        let lineMesh = new THREE.Line(geometry, lineMaterial);
        let lineDashedMaterial = new THREE.LineDashedMaterial({
            // color: 0xff0000,
            vertexColors: THREE.VertexColors,
            dashSize: 10,
            gapSize: 5
        });
        let lineDashedMesh = new THREE.Line(geometry, lineDashedMaterial);
        lineDashedMesh.computeLineDistances();
        // this.scene.add(lineMesh);
        // this.scene.add(lineDashedMesh);
    }
    //#endregion

    add4BoxGeometry() {
        let geometry = new THREE.BoxGeometry(100, 100, 100);
        let meterial = new THREE.PointsMaterial({
            color: 0x00ff00,
            size: 5.0
        });
        let pointsMesh = new THREE.Points(geometry, meterial);

        let lineMaterial = new THREE.LineBasicMaterial({
            color: 0x0000ff,
        });
        // let lineMesh = new THREE.Line(geometry, lineMaterial);
        // let lineMesh = new THREE.LineLoop(geometry, lineMaterial);        
        let lineMesh = new THREE.LineSegments(geometry, lineMaterial);


        // this.scene.add(pointsMesh);
        // this.scene.add(lineMesh);
        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff,
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1, 1, 1);
        let aixs = new THREE.Vector3(1, 1, 1);
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
        var geometry = new THREE.BoxGeometry(40, 100, 40);
        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        var mesh = new THREE.Mesh(geometry, material);
        // mesh.position.set(0,0,0)
        this.scene.add(mesh);

        // 设置产生投影的网格模型
        mesh.castShadow = true;


        //创建一个平面几何体作为投影面
        var planeGeometry = new THREE.PlaneGeometry(300, 200);
        var planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x999999
        });
        // 平面网格模型作为投影面
        var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        this.scene.add(planeMesh); //网格模型添加到场景中
        planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
        planeMesh.position.y = -50; //设置网格模型y坐标
        // 设置接收阴影的投影面
        planeMesh.receiveShadow = true;

        // 方向光
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
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
        directionalLight.shadow.mapSize.set(1024, 1024)
        console.log(directionalLight.shadow.camera);
    }

    addAxisHelper() {
        const axisHelper = new THREE.AxisHelper(250);
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
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(10, 10, 25);
    }


    addRender() {
        /**
         * 创建渲染器对象
         */
        this.renderer = new THREE.WebGLRenderer();
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