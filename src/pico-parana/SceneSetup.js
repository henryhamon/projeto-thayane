import * as THREE from 'three';

export function setupScene() {
  const scene = new THREE.Scene();

  // Mountain vibe fog (greenish-grey)
  const fogColor = 0x2f4f4f; // Dark Slate Gray
  scene.fog = new THREE.Fog(fogColor, 20, 80);
  scene.background = new THREE.Color(fogColor);

  // Isometric Camera Setup
  const aspect = window.innerWidth / window.innerHeight;
  const d = 15; // View size
  const camera = new THREE.OrthographicCamera(
    -d * aspect, d * aspect, d, -d, 1, 1000
  );

  // Isometric position
  camera.position.set(20, 20, 20);
  camera.lookAt(scene.position);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(10, 20, 10);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  // Handle window resize
  window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = -d * aspect;
    camera.right = d * aspect;
    camera.top = d;
    camera.bottom = -d;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer };
}
