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

        this.addAmbientLignt();
        this.addPointLignt();

        this.addBoxGeometry();
        this.addCylinderGeometry();
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

    addBoxGeometry() {
        /**
         * 创建网格模型
         */
        // const geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        const geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        const material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        }); //材质对象Material
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        this.scene.add(mesh); //网格模型添加到场景中
        this.mesh = mesh;
    }
    addCylinderGeometry() {
        const geometry = new THREE.CylinderGeometry(50, 50, 100, 25);
        const meterial = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            opacity: 0.7,
            transparent: true,
            // wireframe: true
        });
        const meterialPhong = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            specular: 0x4488ee,
            shininess: true
        });
        const mesh = new THREE.Mesh(geometry, meterialPhong);
        mesh.position.x += 200;
        this.scene.add(mesh);
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