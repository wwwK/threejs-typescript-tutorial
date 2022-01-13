// import * as THREE from 'three'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// const scene = new THREE.Scene();
// const scene2 = new THREE.Scene();

// scene.background = new THREE.Color(0x4488ff);

// const camera1 = new THREE.PerspectiveCamera(
//     75,
//     // window.innerWidth / window.innerHeight,
//     1, // 200/200 == 1
//     .1,
//     10
// )
// const camera2 = new THREE.OrthographicCamera(-1,1,1,-1, .1, 10)
// const camera3 = new THREE.OrthographicCamera(-1,1,1,-1, .1, 10)
// const camera4 = new THREE.OrthographicCamera(-1,1,1,-1, .1, 10)

// camera1.position.z = 2
// camera2.position.y = 1
// camera2.lookAt(new THREE.Vector3()) //위에서 아래로. 디폴트는 0 0 0
// camera3.position.z = 1
// camera3.lookAt(new THREE.Vector3(0,0,0)) //오른쪽부터
// camera4.position.x = 1
// camera4.lookAt(new THREE.Vector3(0,0,0)) //앞부터

// const canvas1 = document.getElementById('c1') as HTMLCanvasElement
// const canvas2 = document.getElementById('c2') as HTMLCanvasElement
// const canvas3 = document.getElementById('c3') as HTMLCanvasElement
// const canvas4 = document.getElementById('c4') as HTMLCanvasElement

// const renderer1 = new THREE.WebGLRenderer({canvas:canvas1})
// renderer1.setSize(200,200)
// const renderer2 = new THREE.WebGLRenderer({canvas:canvas2})
// renderer2.setSize(200,200)
// const renderer3 = new THREE.WebGLRenderer({canvas:canvas3})
// renderer3.setSize(200,200)
// const renderer4 = new THREE.WebGLRenderer({canvas:canvas4})
// renderer4.setSize(200,200)

// // const renderer = new THREE.WebGLRenderer() //다양한 renderer가 존재하지만 webgl이 가장 빠르며 대부분 서포트 해준다 (가장 기본)
// // renderer.setSize(window.innerWidth, window.innerHeight) // innerWidth대신 200으로 바꾼다면? camera와 밑의 resize에서도 변경해줘야 200의 크기가 제대로 유지된다
// // document.body.appendChild(renderer.domElement) //html에 다이나믹하게 캔버스를 자동으로 그려준다

// new OrbitControls(camera1, renderer1.domElement)

// const geometry = new THREE.TorusKnotGeometry() //THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })

// const cube = new THREE.Mesh(geometry, material)
// cube.scale.x = .5
// cube.scale.y = .5
// cube.scale.z = .5
// scene.add(cube)

// const cube2 = new THREE.Mesh(geometry, material)
// scene2.add(cube2)

// // window.addEventListener('resize', onWindowResize, false)
// // function onWindowResize() {
// //     camera.aspect = window.innerWidth / window.innerHeight
// //     camera.updateProjectionMatrix()
// //     renderer.setSize(window.innerWidth, window.innerHeight)
// //     render()
// // }

// function animate() {
//     requestAnimationFrame(animate)

//     cube.rotation.x += 0.01
//     cube.rotation.y += 0.01
    
//     cube2.rotation.y += 0.01
//     render()
// }

// function render() {
//     renderer1.render(scene, camera1)
//     renderer2.render(scene, camera2)
//     renderer3.render(scene, camera3)
//     renderer4.render(scene, camera4)
// }

// animate()


import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', render);

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    // render()
}

const stats = Stats();
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube")
const cubeRotationFolder = cubeFolder.addFolder("Rotation")
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2)
cubeRotationFolder.open() // default는 열린상태
const cubePositionFolder = cubeFolder.addFolder("Position")
cubePositionFolder.add(cube.position, "x", -10, 10, 2)
cubePositionFolder.add(cube.position, "y", -10, 10, 2)
cubePositionFolder.add(cube.position, "z", -10, 10, 2) //2는 step
cubePositionFolder.open() // default는 열린상태
const cubeScaleFolder = cubeFolder.addFolder("Scale")
cubeScaleFolder.add(cube.scale, "x", -5, 5)
cubeScaleFolder.add(cube.scale, "y", -5, 5)
cubeScaleFolder.add(cube.scale, "z", -5, 5)
cubeScaleFolder.open() // default는 열린상태
cubeFolder.open()
cubeFolder.add(cube, "visible")
// const cameraFolder = gui.addFolder("Camera")
// cameraFolder.add(camera.position, "z", 0 ,20)
// cameraFolder.open() // default는 열린상태


function animate() {
    requestAnimationFrame(animate)

    // stats.begin()
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    // stats.end()

    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
// render()