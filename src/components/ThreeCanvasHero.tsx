import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sliders, RotateCw, Eye, EyeOff, Layers, Maximize2 } from 'lucide-react';
import { sound } from '../utils/audio';

type ModeType = 'quantum' | 'matrix' | 'neural';
type FinishType = 'gold' | 'cyan' | 'emerald' | 'obsidian';

export const ThreeCanvasHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<ModeType>('quantum');
  const [finish, setFinish] = useState<FinishType>('cyan');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [hudCollapsed, setHudCollapsed] = useState<boolean>(false);

  // References for mutable Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0.003, y: 0.005 });

  const finishes: Record<FinishType, { color: number; metalness: number; roughness: number; emissive: number }> = {
    cyan: { color: 0x06b6d4, metalness: 0.85, roughness: 0.2, emissive: 0x083344 },
    gold: { color: 0xf59e0b, metalness: 0.9, roughness: 0.15, emissive: 0x451a03 },
    emerald: { color: 0x10b981, metalness: 0.8, roughness: 0.25, emissive: 0x022c22 },
    obsidian: { color: 0x27272a, metalness: 0.95, roughness: 0.1, emissive: 0x09090b },
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Detect software GL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Environment Lighting (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const blueLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    blueLight.position.set(-6, -4, -4);
    scene.add(blueLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x09090b, 1.2);
    scene.add(hemiLight);

    // Main Group (Composite Multi-Part 3D Model per directives)
    const mainGroup = new THREE.Group();
    mainGroupRef.current = mainGroup;
    scene.add(mainGroup);

    // Build Composite 3D Structure:
    // Part 1: Torus Knot / Core
    const coreGeo = new THREE.TorusKnotGeometry(1.4, 0.42, 128, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: finishes.cyan.color,
      metalness: finishes.cyan.metalness,
      roughness: finishes.cyan.roughness,
      emissive: finishes.cyan.emissive,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);
    meshesRef.current.push(coreMesh);

    // Part 2: Outer Wireframe Gyroscope Rings (2 concentric gimbal rings)
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);
    meshesRef.current.push(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.03, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat1);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);
    meshesRef.current.push(ring2);

    // Part 3: Orbiting Tech Nodes (Icosahedra representing Python, React, Java, Data)
    const nodeGeo = new THREE.IcosahedronGeometry(0.25, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x451a03,
    });
    const nodeCount = 6;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(Math.cos(angle) * 2.4, Math.sin(angle) * 1.8, Math.sin(angle * 2) * 0.8);
      mainGroup.add(nodeMesh);
      meshesRef.current.push(nodeMesh);
    }

    // Background Particle Constellation
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 18;
      particlePos[i + 1] = (Math.random() - 0.5) * 18;
      particlePos[i + 2] = (Math.random() - 0.5) * 18;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // Ground Contact Shadow plane
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.6;
    scene.add(shadowPlane);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Mouse Drag Rotation
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !mainGroupRef.current) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      rotationVelocityRef.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005,
      };

      mainGroupRef.current.rotation.x += deltaY * 0.008;
      mainGroupRef.current.rotation.y += deltaX * 0.008;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (mainGroupRef.current) {
        if (!isDraggingRef.current && autoRotate) {
          mainGroupRef.current.rotation.x += rotationVelocityRef.current.x;
          mainGroupRef.current.rotation.y += rotationVelocityRef.current.y;
          // Gentle decay back to standard orbital speed
          rotationVelocityRef.current.x = THREE.MathUtils.damp(rotationVelocityRef.current.x, 0.002, 2, delta);
          rotationVelocityRef.current.y = THREE.MathUtils.damp(rotationVelocityRef.current.y, 0.005, 2, delta);
        }

        // Float ring oscillators
        ring1.rotation.z += 0.004;
        ring2.rotation.x += 0.003;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      nodeGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  // Update Material Finish & Wireframe
  useEffect(() => {
    if (meshesRef.current.length > 0) {
      const core = meshesRef.current[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
      if (core && core.material) {
        const selected = finishes[finish];
        core.material.color.setHex(selected.color);
        core.material.metalness = selected.metalness;
        core.material.roughness = selected.roughness;
        core.material.emissive.setHex(selected.emissive);
        core.material.wireframe = wireframe;
        core.material.needsUpdate = true;
      }
    }
  }, [finish, wireframe]);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] lg:h-full rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-950/90 shadow-2xl flex flex-col justify-between group">
      {/* 3D Canvas Mounting Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate 3D tech core"
      />

      {/* Top Floating Spec Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono-code text-zinc-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>THREE.JS REAL-TIME CORE</span>
          <span className="text-zinc-600">·</span>
          <span className="text-amber-400 font-bold uppercase">{finish} PBR</span>
        </div>

        <button
          onClick={() => {
            sound.playClick(800);
            setHudCollapsed(!hudCollapsed);
          }}
          className="pointer-events-auto px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono-code flex items-center gap-1.5 transition-colors"
        >
          {hudCollapsed ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{hudCollapsed ? 'Show Dock' : 'Hide Dock'}</span>
        </button>
      </div>

      {/* Collapsible Ergonomic Bottom Control Dock (§5 Three.js Directives) */}
      {!hudCollapsed && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[500px] bg-zinc-950/85 backdrop-blur-md border border-zinc-800/90 rounded-xl p-3 z-10 shadow-2xl flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2 text-xs">
            {/* Finish swatches */}
            <div className="flex items-center gap-1.5">
              {(['cyan', 'gold', 'emerald', 'obsidian'] as FinishType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    sound.playClick(900);
                    setFinish(f);
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-mono-code uppercase transition-all ${
                    finish === f
                      ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Utility Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick(750);
                  setWireframe(!wireframe);
                }}
                className={`p-1.5 rounded text-[11px] font-mono-code border transition-colors ${
                  wireframe
                    ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                    : 'border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
                title="Toggle Wireframe Shader"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  sound.playClick(750);
                  setAutoRotate(!autoRotate);
                }}
                className={`p-1.5 rounded text-[11px] font-mono-code border transition-colors ${
                  autoRotate
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10'
                    : 'border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
                title="Toggle Auto Orbit"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono-code text-zinc-500 pt-1 border-t border-zinc-800/60">
            <span>DRAG CANVAS TO ROTATE FREELY</span>
            <span>60 FPS PBR RENDER</span>
          </div>
        </div>
      )}
    </div>
  );
};
