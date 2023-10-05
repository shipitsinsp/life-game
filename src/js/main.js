// Import our custom CSS
import '../scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import * as THREE from 'three'
import * as life from "./world.js"


const width = 100
const height = 100
const world = new life.World(width, height)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)

const scene = new THREE.Scene()

fillRandom()
animate()

function drawGrid(cells) {
    const material = new THREE.MeshBasicMaterial({ color: 0xafafaf})
    const geometry = new THREE.PlaneGeometry(1, 1)

    for (let col = 0; col < width; col++) {
        for (let row = 0; row < height; row++) {
            if (cells[col][row] === life.CellState.Alive) {
                const rect = new THREE.Mesh(geometry, material)
                rect.position.x += col * 1.1
                rect.position.y += row * 1.1

                scene.add(rect)
            }
        }
    }
}

function animate() {
    //requestAnimationFrame( animate )

    setInterval(() => {
        scene.clear()
        world.computeNext()
        render()
    }, 100)
}

function render() {
    drawGrid(world.getCells())
    renderer.render(scene, camera)
}

function fillRandom() {
    for (let col = 0; col < width; col++) {
        for (let row = 0; row < height; row++) {
            if (Math.random() >= 0.5) {
                world.setCellAlive(col, row)
            }
        }
    }
}