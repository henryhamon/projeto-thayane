export class CameraControls {
  constructor(camera, rover) {
    this.camera = camera;
    this.rover = rover; // Target
    this.zoomLevel = 15;
    this.minZoom = 5;
    this.maxZoom = 40;
    this.panSpeed = 2;

    this.bindEvents();
  }

  bindEvents() {
    console.log("Binding Camera Controls...");

    const bind = (id, action) => {
      const btn = document.getElementById(id);
      if (btn) {
        // Remove old listeners to be safe (cloning node is a quick way, or just add logic)
        // For now, simpler is better. Just addListener.
        btn.onclick = (e) => { // Use onclick property to override previous bindings easily
          e.stopPropagation();
          action();
        };
      } else {
        console.warn(`Camera Control Button not found: ${id}`);
      }
    };

    bind('btn-pan-n', () => this.pan(0, -1)); // Up (North)
    bind('btn-pan-s', () => this.pan(0, 1));  // Down (South)
    bind('btn-pan-w', () => this.pan(-1, 0)); // Left (West)
    bind('btn-pan-e', () => this.pan(1, 0));  // Right (East)

    bind('btn-zoom-in', () => this.zoom(1));
    bind('btn-zoom-out', () => this.zoom(-1));

    bind('btn-focus', () => this.focusTarget());
  }

  pan(dx, dz) {
    // Move both camera and its lookAt target (conceptually)
    // For now, we just move the camera position, which changes the view relative to the current focus
    this.camera.position.x += dx * this.panSpeed;
    this.camera.position.z += dz * this.panSpeed;
  }

  zoom(delta) {
    this.camera.zoom += delta * 0.1; // Adjust sensitivity
    // Clamp zoom
    if (this.camera.zoom < 0.5) this.camera.zoom = 0.5;
    if (this.camera.zoom > 2.0) this.camera.zoom = 2.0;

    this.camera.updateProjectionMatrix();
  }

  focusTarget() {
    if (!this.rover || !this.rover.mesh) return;

    const targetPos = this.rover.mesh.position;

    // Reset camera relative to rover position using isometric offset
    // Isometric view usually implies an offset like (20, 20, 20)
    const offset = 20;
    this.camera.position.set(targetPos.x + offset, offset, targetPos.z + offset);
    this.camera.lookAt(targetPos.x, targetPos.y, targetPos.z);

    // Reset Zoom default
    this.camera.zoom = 1;
    this.camera.updateProjectionMatrix();
  }

  updateProjection() {
    // Orthographic camera projection update usually handled by zoom property + updateProjectionMatrix
    this.camera.updateProjectionMatrix();
  }
}
