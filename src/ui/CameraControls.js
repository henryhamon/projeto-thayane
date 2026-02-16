export class CameraControls {
  constructor(camera, rover) {
    this.camera = camera;
    this.rover = rover; // Target
    this.zoomLevel = 15;
    this.minZoom = 5;
    this.maxZoom = 40;
    this.panSpeed = 2;

    // Orbit Logic
    this.orbitAngle = Math.PI / 4; // Start at 45 degrees
    this.radius = 20; // Default distance

    this.bindEvents();
  }

  bindEvents() {
    console.log("Binding Camera Controls...");

    const bind = (id, action) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = (e) => {
          e.stopPropagation();
          action();
        };
      } else {
        console.warn(`Camera Control Button not found: ${id}`);
      }
    };

    bind('btn-pan-n', () => this.pan(0, 1));
    bind('btn-pan-s', () => this.pan(0, -1));
    bind('btn-pan-w', () => this.pan(1, 0));
    bind('btn-pan-e', () => this.pan(-1, 0));

    bind('btn-zoom-in', () => this.zoom(1));
    bind('btn-zoom-out', () => this.zoom(-1));

    bind('btn-focus', () => this.focusTarget());

    // Rotation bindings
    bind('btn-rotate-cw', () => this.rotate(1));
    bind('btn-rotate-ccw', () => this.rotate(-1));
  }

  rotate(direction) {
    // 1 = CW, -1 = CCW
    // Increment 45 degrees (PI/4)
    const step = Math.PI / 4;
    this.orbitAngle += direction * step;

    this.focusTarget(); // Re-center with new angle
  }

  pan(dx, dz) {
    // Ideally pan should be relative to camera view
    // For now keeping it world-aligned for simplicity as requested, 
    // or we can rotate the vector by orbitAngle if we want view-relative panning.

    // Simple World-aligned Pan:
    this.camera.position.x += dx * this.panSpeed;
    this.camera.position.z += dz * this.panSpeed;
  }

  zoom(delta) {
    this.camera.zoom += delta * 0.1;
    if (this.camera.zoom < 0.5) this.camera.zoom = 0.5;
    if (this.camera.zoom > 2.0) this.camera.zoom = 2.0;

    this.camera.updateProjectionMatrix();
  }

  focusTarget() {
    if (!this.rover || !this.rover.mesh) return;

    const targetPos = this.rover.mesh.position;

    // Calculate offset based on orbitAngle
    // x = cos(angle) * dist, z = sin(angle) * dist
    // y is constant offset
    const height = 20;

    const offsetX = Math.cos(this.orbitAngle) * this.radius;
    const offsetZ = Math.sin(this.orbitAngle) * this.radius;

    this.camera.position.set(targetPos.x + offsetX, height, targetPos.z + offsetZ);
    this.camera.lookAt(targetPos.x, targetPos.y, targetPos.z);

    // Reset Zoom default if we want, or keep it. Often nice to keep zoom.
    this.camera.updateProjectionMatrix();
  }
}
