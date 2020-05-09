import * as THREE from 'three';

class ThreeHelper {
    constructor() {
        this.scene = new THREE.Scene();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.ele = document.body;

        this.addAmbientLignt();
        this.addPointLignt();

        this.addMesh();
        this.setCamera();
        this.addRender();

        this.render();


    }

    addAmbientLignt() {
        const ambient = new THREE.AmbientLight(0x444444);
        this.scene.add(ambient);
    };

    addPointLignt() {
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        this.scene.add(point); //点光源添加到场景中
    };

    addMesh() {
        /**
         * 创建网格模型
         */
        // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        const geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        const material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        }); //材质对象Material
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        this.scene.add(mesh); //网格模型添加到场景中
        this.mesh = mesh;
    }

    setCamera() {
        /**
         * 相机设置
         */

        let k = this.width / this.height; //窗口宽高比
        let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        this.camera.position.set(200, 500, 200); //设置相机位置
        this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
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



    // 渲染函数
    render() {
        console.log(this.renderer);
        this.renderer.render(this.scene, this.camera);//执行渲染操作
        // console.log(getInterval()());
        this.mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
        requestAnimationFrame(() => this.render());//请求再次执行渲染函数render
    }

}


export default ThreeHelper;