import * as THREE from 'three';
// import { OrbitControls } from 'three-orbitcontrols-ts';
const OrbitControls = require('three-orbit-controls')(THREE);

const threeHelper = () => {
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    // var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    });
    //材质对象Material
    //半透明效果
    // var sphereMaterial = new THREE.MeshLambertMaterial({
    //     color: 0xff0000,
    //     opacity: 0.7,
    //     transparent: true
    // });
    //高光效果
    var sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        specular: 0x4488ee,
        shininess: 12
    });
    var mesh = new THREE.Mesh(geometry, sphereMaterial); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中

    /**
     * 创建2
     */
    var geometry2 = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    var mesh2 = new THREE.Mesh(geometry2, material);
    mesh2.position.set(500, 0, 0)
    scene.add(mesh2);

    /**
     * 创建3
     */
    var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25); //创建一个立方体几何对象Geometry
    var mesh3 = new THREE.Mesh(geometry3, material);
    mesh3.position.set(200, 0, 0)
    scene.add(mesh3);

    // //长方体 参数：长，宽，高
    // var geometry = new THREE.BoxGeometry(100, 100, 100);
    // // 球体 参数：半径60  经纬度细分数40,40
    // var geometry = new THREE.SphereGeometry(60, 40, 40);
    // // 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
    // var geometry = new THREE.CylinderGeometry(50, 50, 100, 25);
    // // 正八面体
    // var geometry = new THREE.OctahedronGeometry(50);
    // // 正十二面体
    // var geometry = new THREE.DodecahedronGeometry(50);
    // // 正二十面体
    // var geometry = new THREE.IcosahedronGeometry(50);
    // 辅助坐标系  参数2500表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxesHelper(2500);
    scene.add(axisHelper);


    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 500, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);

    // let T0 = new Date();
    // const getInterval = () => {
    //     let T1 = new Date();//本次时间
    //     let t = T1 - T0;//时间差
    //     T0 = T1;//把本次时间赋值给上次时间
    //     return t;
    // }


    // 渲染函数
    function render() {
        renderer.render(scene, camera);//执行渲染操作
        // mesh.rotateY(0.001 * getInterval());//每次绕y轴旋转0.01弧度
        requestAnimationFrame(render);//请求再次执行渲染函数render
    }
    render();

    new OrbitControls(camera, renderer.domElement);//创建控件对象 var controls =
    // controls.addEventListener('change', render);//监听鼠标、键盘事件
};

export default threeHelper;