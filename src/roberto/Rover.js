import * as THREE from 'three';

export class Rover {
  constructor() {
    this.mesh = new THREE.Group();

    // Body: Orange Box
    const bodyGeo = new THREE.BoxGeometry(0.6, 0.4, 0.8);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0xffa500 }); // Orange
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.3; // Lift body slightly off ground
    body.castShadow = true;
    this.mesh.add(body);

    // Head/Sensor: Cone pointing forward (Z-)
    // Adjusted orientation: ConeGeometry points up by default. 
    // We want it pointing along negative Z (forward for the rover).
    const headGeo = new THREE.ConeGeometry(0.2, 0.4, 8);
    const headMat = new THREE.MeshPhongMaterial({ color: 0x00ffff }); // Cyan sensor
    const head = new THREE.Mesh(headGeo, headMat);

    // Rotate cone to point forward
    head.rotation.x = -Math.PI / 2;
    head.position.set(0, 0.4, -0.3); // On top, slightly forward
    this.mesh.add(head);

    // Default orientation properties
    this.direction = 'N'; // N, S, E, W

    // Animation Queue System
    this.actionQueue = [];
    this.isMoving = false;
    this.animationTime = 0;
    this.ANIMATION_DURATION = 0.5; // seconds

    // Target state for interpolation
    this.startPos = new THREE.Vector3();
    this.targetPos = new THREE.Vector3();
    this.startRot = 0;
    this.targetRot = 0;
  }

  setPosition(x, z) {
    this.mesh.position.set(x, 0, z);
  }

  setRotation(direction) {
    this.direction = direction;
    let angle = this.getAngleFromDirection(direction);
    this.mesh.rotation.y = angle;
  }

  getAngleFromDirection(dir) {
    switch (dir) {
      case 'N': return 0;
      case 'W': return Math.PI / 2;
      case 'S': return Math.PI;
      case 'E': return -Math.PI / 2;
      default: return 0;
    }
  }

  processLogs(logs) {
    console.log("Processing logs:", logs);
    // Filter relevant actions and add to queue
    logs.forEach(log => {
      if (['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'PRINT'].includes(log.action)) {
        this.actionQueue.push(log);
      }
    });
  }

  update(deltaTime) {
    if (this.isMoving) {
      this.animationTime += deltaTime;
      const t = Math.min(this.animationTime / this.ANIMATION_DURATION, 1);

      // Smooth Step Interpolation
      const smoothT = t * t * (3 - 2 * t);

      // Interpolate Position
      this.mesh.position.lerpVectors(this.startPos, this.targetPos, smoothT);

      // Interpolate Rotation (Shortest path logic could be added, but simple lerp for now)
      // For rotation, we just interp the Y angle.
      // We need to handle the wrap-around case (e.g. PI to -PI) if we want perfect calls, 
      // but for 90 degree turns, simple linear interpolation usually works fine if we manage the angles correctly.
      // Here we just interpolate between startRot and targetRot.
      this.mesh.rotation.y = this.startRot + (this.targetRot - this.startRot) * smoothT;

      if (t >= 1) {
        this.isMoving = false;
        // Snap to exact values to prevent drift
        this.mesh.position.copy(this.targetPos);
        this.mesh.rotation.y = this.targetRot;
      }
      return;
    }

    // Process Next Action
    if (this.actionQueue.length > 0) {
      // Check if we have mapData context (hacky injection or passed param)
      // Ideally update() shouldn't need mapData if startAnimation handles it
      // But update() calls startAnimation.
      // We'll attach mapData to the rover instance for simplicity? 
      // Or pass it in update(deltaTime, mapData)?
      // Let's rely on it being passed to update() or stored.
      // Better: assume this.currentMapData exists

      const action = this.actionQueue.shift();
      this.startAnimation(action, this.currentMapData);
    }
  }

  // Helper for Wobble
  triggerBumpAnimation() {
    // Simple visualize feedback (skip for now or implement if time)
    // Just a console log is enough for logic, but maybe a shake?
    // We can simulate a "bounce" in the lerp logic later if needed.
  }

  startAnimation(action, mapData) {
    this.isMoving = true;
    this.animationTime = 0;
    this.startPos.copy(this.mesh.position);
    this.startRot = this.mesh.rotation.y;

    // Copy start to target initially
    this.targetPos.copy(this.startPos);
    this.targetRot = this.startRot;

    // 0 = TERRA, 1 = PEDRA, 2 = CUME, 3 = FAZENDA
    // We need mapData to check collisions

    switch (action.action) {
      case 'MOVE':
        // Calculate potential target
        const step = 1.0;
        let nextX = this.targetPos.x;
        let nextZ = this.targetPos.z;

        if (this.direction === 'N') nextZ -= step;
        else if (this.direction === 'S') nextZ += step;
        else if (this.direction === 'E') nextX += step;
        else if (this.direction === 'W') nextX -= step;

        // --- Collision Check ---
        let canMove = true;
        // Map Grid Coordinates (Round to nearest integer)
        const gridX = Math.round(nextX);
        const gridZ = Math.round(nextZ);

        // Check bounds
        if (mapData && (gridZ < 0 || gridZ >= mapData.length || gridX < 0 || gridX >= mapData[0].length)) {
          canMove = false;
        }
        // Check Wall (1 = PEDRA)
        else if (mapData && mapData[gridZ][gridX] === 1) {
          canMove = false;
        }

        if (canMove) {
          this.targetPos.x = nextX;
          this.targetPos.z = nextZ;

          // WIN CHECK (3 = FAZENDA)
          if (mapData && mapData[gridZ][gridX] === 3) {
            if (this.onWin) setTimeout(() => this.onWin(), 500); // Trigger after move
          }

        } else {
          // COLLISION!
          console.log("CRASH!");
          this.triggerBumpAnimation();
          if (this.onCrash) this.onCrash();

          // Stay in place
          this.targetPos.copy(this.startPos);
        }
        break;

      case 'TURN_LEFT':
        // N -> W -> S -> E -> N
        this.targetRot += Math.PI / 2;
        this.updateDirection('LEFT');
        break;

      case 'TURN_RIGHT':
        // N -> E -> S -> W -> N
        this.targetRot -= Math.PI / 2;
        this.updateDirection('RIGHT');
        break;

      case 'PRINT':
        console.log("ROBERTO DIZ:", action.message);
        this.isMoving = false; // Instant action
        break;
    }
  }

  updateDirection(turn) {
    const dirs = ['N', 'E', 'S', 'W'];
    let idx = dirs.indexOf(this.direction);

    if (turn === 'RIGHT') {
      idx = (idx + 1) % 4;
    } else {
      idx = (idx - 1 + 4) % 4;
    }

    this.direction = dirs[idx];
  }

  addToScene(scene) {
    scene.add(this.mesh);
  }
}
