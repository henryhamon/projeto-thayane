import * as THREE from 'three';

export class Rover {
  constructor() {
    this.mesh = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(0.6, 0.4, 0.8);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0xffa500 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.3;
    body.castShadow = true;
    this.mesh.add(body);

    // Sensor
    const headGeo = new THREE.ConeGeometry(0.2, 0.4, 8);
    const headMat = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    const head = new THREE.Mesh(headGeo, headMat);
    head.rotation.x = -Math.PI / 2;
    head.position.set(0, 0.4, -0.3);
    this.mesh.add(head);

    this.direction = 'N';
    this.actionQueue = [];
    this.isMoving = false;
    this.animationTime = 0;
    this.ANIMATION_DURATION = 0.3;

    this.startPos = new THREE.Vector3();
    this.targetPos = new THREE.Vector3();
    this.startRot = 0;
    this.targetRot = 0;

    this.currentMapData = null;
    this.mazeRenderer = null;

    this.onWin = null;
    this.onCrash = null;
  }

  addToScene(scene) {
    scene.add(this.mesh);
  }

  setPosition(x, z) {
    this.mesh.position.set(x, 0, z);
  }

  setRotation(direction) {
    this.direction = direction;
    let angle = 0;
    switch (direction) {
      case 'N': angle = 0; break;
      case 'W': angle = Math.PI / 2; break;
      case 'S': angle = Math.PI; break;
      case 'E': angle = -Math.PI / 2; break;
    }
    this.mesh.rotation.y = angle;
  }

  processLogs(logs) {
    logs.forEach(log => {
      let action = log;
      if (typeof log.get === 'function') action = Object.fromEntries(log);
      if (['MOVE', 'TURN_LEFT', 'TURN_RIGHT', 'PRINT'].includes(action.action)) {
        this.actionQueue.push(action);
      }
    });
  }

  update(deltaTime) {
    if (this.isMoving) {
      this.animationTime += deltaTime;
      const t = Math.min(this.animationTime / this.ANIMATION_DURATION, 1);
      const smoothT = t * t * (3 - 2 * t);

      this.mesh.position.lerpVectors(this.startPos, this.targetPos, smoothT);

      let currentRot = this.startRot;
      let targetRot = this.targetRot;
      this.mesh.rotation.y = currentRot + (targetRot - currentRot) * smoothT;

      if (t >= 1) {
        this.isMoving = false;
        this.mesh.position.copy(this.targetPos);
        this.mesh.rotation.y = this.targetRot;
        this.checkWinCondition();
      }
      return;
    }

    if (this.actionQueue.length > 0) {
      const action = this.actionQueue.shift();
      this.startAnimation(action);
    }
  }

  startAnimation(action) {
    this.isMoving = true;
    this.animationTime = 0;
    this.startPos.copy(this.mesh.position);
    this.startRot = this.mesh.rotation.y;
    this.targetPos.copy(this.startPos);
    this.targetRot = this.startRot;

    switch (action.action) {
      case 'MOVE':
        const step = 1.0;
        let nextX = this.targetPos.x;
        let nextZ = this.targetPos.z;

        if (this.direction === 'N') nextZ -= step;
        else if (this.direction === 'S') nextZ += step;
        else if (this.direction === 'E') nextX += step;
        else if (this.direction === 'W') nextX -= step;

        if (this.isValidMove(nextX, nextZ)) {
          // TRAIL PAINTING
          if (this.mazeRenderer && typeof this.mazeRenderer.highlightTile === 'function' && this.currentMapData) {
            const { gridX, gridZ } = this.worldToGrid(this.startPos.x, this.startPos.z);
            this.mazeRenderer.highlightTile(gridX, gridZ, 0xFFFF00);
          }

          this.targetPos.x = nextX;
          this.targetPos.z = nextZ;
        } else {
          console.warn("CRASH! Wall at", nextX, nextZ);
          this.isMoving = false;
          this.mesh.position.y = 0.5;
          setTimeout(() => { if (this.mesh) this.mesh.position.y = 0.3 }, 200);
          if (this.onCrash) this.onCrash();
        }
        break;

      case 'TURN_LEFT':
        this.targetRot += Math.PI / 2;
        this.updateDirection('LEFT');
        break;

      case 'TURN_RIGHT':
        this.targetRot -= Math.PI / 2;
        this.updateDirection('RIGHT');
        break;

      case 'PRINT':
        console.log("ROBERTO:", action.message);
        this.isMoving = false;
        break;
    }
  }

  worldToGrid(wx, wz) {
    if (!this.currentMapData) return { gridX: 0, gridZ: 0 };
    const height = this.currentMapData.length;
    const width = this.currentMapData[0].length;
    const offsetX = -width / 2 + 0.5;
    const offsetZ = -height / 2 + 0.5;
    return {
      gridX: Math.round(wx - offsetX),
      gridZ: Math.round(wz - offsetZ)
    };
  }

  isValidMove(worldX, worldZ) {
    if (!this.currentMapData) return true;
    const { gridX, gridZ } = this.worldToGrid(worldX, worldZ);
    const height = this.currentMapData.length;
    const width = this.currentMapData[0].length;

    if (gridX < 0 || gridX >= width || gridZ < 0 || gridZ >= height) return false;
    return this.currentMapData[gridZ][gridX] !== 1;
  }

  checkWinCondition() {
    if (!this.currentMapData) return;
    const { gridX, gridZ } = this.worldToGrid(this.mesh.position.x, this.mesh.position.z);
    if (this.currentMapData[gridZ][gridX] === 3) {
      if (this.onWin) this.onWin();
    }
  }

  updateDirection(turn) {
    const dirs = ['N', 'E', 'S', 'W'];
    let idx = dirs.indexOf(this.direction);
    if (turn === 'RIGHT') idx = (idx + 1) % 4;
    else idx = (idx - 1 + 4) % 4;
    this.direction = dirs[idx];
  }
}