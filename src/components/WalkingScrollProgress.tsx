import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, useScroll } from 'motion/react';
import { sound } from '../utils/audio';

export const WalkingScrollProgress: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'right' | 'left'>('right');

  // References for mutable Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const limbsRef = useRef<{
    torso: THREE.Group;
    head: THREE.Group;
    leftLeg: THREE.Group;
    rightLeg: THREE.Group;
    leftArm: THREE.Group;
    rightArm: THREE.Group;
  } | null>(null);

  const walkPhaseRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<number | null>(null);
  const targetRotationYRef = useRef<number>(Math.PI / 2); // Facing right by default

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = 68;
    const height = 68;

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

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.2, 3.8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // 4. Procedural 3D Character Group (Composite 8-Part Model per directives)
    const charRoot = new THREE.Group();
    charRoot.position.set(0, -0.45, 0);
    characterGroupRef.current = charRoot;
    scene.add(charRoot);

    // Materials
    const suitMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.7,
      roughness: 0.3,
    });

    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // warm stylized gold/skin tone
      metalness: 0.2,
      roughness: 0.5,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });

    const bootsMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.9,
      roughness: 0.2,
    });

    const backpackMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.5,
      roughness: 0.4,
    });

    // Torso Group
    const torsoGroup = new THREE.Group();
    const torsoGeo = new THREE.CylinderGeometry(0.2, 0.17, 0.48, 12);
    const torsoMesh = new THREE.Mesh(torsoGeo, suitMat);
    torsoMesh.position.y = 0.58;
    torsoGroup.add(torsoMesh);

    // Tech Backpack
    const packGeo = new THREE.BoxGeometry(0.24, 0.28, 0.14);
    const packMesh = new THREE.Mesh(packGeo, backpackMat);
    packMesh.position.set(0, 0.6, -0.16);
    torsoGroup.add(packMesh);

    charRoot.add(torsoGroup);

    // Head Group
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.94, 0);

    const headGeo = new THREE.SphereGeometry(0.19, 16, 16);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(headMesh);

    // Glowing Cyber Visor
    const visorGeo = new THREE.BoxGeometry(0.26, 0.09, 0.15);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.02, 0.12);
    headGroup.add(visorMesh);

    // Headset / Cap accent
    const capGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.06, 16);
    const capMesh = new THREE.Mesh(capGeo, suitMat);
    capMesh.position.set(0, 0.14, 0);
    headGroup.add(capMesh);

    torsoGroup.add(headGroup);

    // Left Arm (pivot at shoulder)
    const leftArm = new THREE.Group();
    leftArm.position.set(0.26, 0.76, 0);
    const armGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.38, 8);
    const armMeshL = new THREE.Mesh(armGeo, suitMat);
    armMeshL.position.y = -0.19;
    leftArm.add(armMeshL);
    // Hand
    const handGeo = new THREE.SphereGeometry(0.055, 8, 8);
    const handMeshL = new THREE.Mesh(handGeo, skinMat);
    handMeshL.position.y = -0.4;
    leftArm.add(handMeshL);
    torsoGroup.add(leftArm);

    // Right Arm (pivot at shoulder)
    const rightArm = new THREE.Group();
    rightArm.position.set(-0.26, 0.76, 0);
    const armMeshR = new THREE.Mesh(armGeo, suitMat);
    armMeshR.position.y = -0.19;
    rightArm.add(armMeshR);
    // Hand
    const handMeshR = new THREE.Mesh(handGeo, skinMat);
    handMeshR.position.y = -0.4;
    rightArm.add(handMeshR);
    torsoGroup.add(rightArm);

    // Left Leg (pivot at hip)
    const leftLeg = new THREE.Group();
    leftLeg.position.set(0.12, 0.36, 0);
    const legGeo = new THREE.CylinderGeometry(0.075, 0.06, 0.42, 8);
    const legMeshL = new THREE.Mesh(legGeo, suitMat);
    legMeshL.position.y = -0.21;
    leftLeg.add(legMeshL);
    // Boot
    const bootGeo = new THREE.BoxGeometry(0.1, 0.08, 0.18);
    const bootMeshL = new THREE.Mesh(bootGeo, bootsMat);
    bootMeshL.position.set(0, -0.44, 0.04);
    leftLeg.add(bootMeshL);
    charRoot.add(leftLeg);

    // Right Leg (pivot at hip)
    const rightLeg = new THREE.Group();
    rightLeg.position.set(-0.12, 0.36, 0);
    const legMeshR = new THREE.Mesh(legGeo, suitMat);
    legMeshR.position.y = -0.21;
    rightLeg.add(legMeshR);
    // Boot
    const bootMeshR = new THREE.Mesh(bootGeo, bootsMat);
    bootMeshR.position.set(0, -0.44, 0.04);
    rightLeg.add(bootMeshR);
    charRoot.add(rightLeg);

    limbsRef.current = {
      torso: torsoGroup,
      head: headGroup,
      leftLeg,
      rightLeg,
      leftArm,
      rightArm,
    };

    // Set initial orientation facing right
    charRoot.rotation.y = Math.PI / 2;

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (limbsRef.current && characterGroupRef.current) {
        // Smooth rotation to face travel direction
        characterGroupRef.current.rotation.y = THREE.MathUtils.damp(
          characterGroupRef.current.rotation.y,
          targetRotationYRef.current,
          8,
          delta
        );

        if (isScrolling) {
          // Dynamic walking kinematics
          const swing = Math.sin(walkPhaseRef.current);
          limbsRef.current.leftLeg.rotation.x = swing * 0.75;
          limbsRef.current.rightLeg.rotation.x = -swing * 0.75;
          limbsRef.current.leftArm.rotation.x = -swing * 0.65;
          limbsRef.current.rightArm.rotation.x = swing * 0.65;

          // Torso bobbing on footfalls
          limbsRef.current.torso.position.y = 0.05 + Math.abs(Math.sin(walkPhaseRef.current * 2)) * 0.04;
          limbsRef.current.head.rotation.x = Math.sin(walkPhaseRef.current * 2) * 0.04;
        } else {
          // Relax to idle stance with gentle breathing
          limbsRef.current.leftLeg.rotation.x = THREE.MathUtils.damp(limbsRef.current.leftLeg.rotation.x, 0, 6, delta);
          limbsRef.current.rightLeg.rotation.x = THREE.MathUtils.damp(limbsRef.current.rightLeg.rotation.x, 0, 6, delta);
          limbsRef.current.leftArm.rotation.x = THREE.MathUtils.damp(limbsRef.current.leftArm.rotation.x, 0, 6, delta);
          limbsRef.current.rightArm.rotation.x = THREE.MathUtils.damp(limbsRef.current.rightArm.rotation.x, 0, 6, delta);

          limbsRef.current.torso.position.y = THREE.MathUtils.damp(
            limbsRef.current.torso.position.y,
            Math.sin(time * 2.5) * 0.015,
            4,
            delta
          );
          limbsRef.current.head.rotation.y = Math.sin(time * 1.5) * 0.08;
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torsoGeo.dispose();
      packGeo.dispose();
      headGeo.dispose();
      visorGeo.dispose();
      capGeo.dispose();
      armGeo.dispose();
      handGeo.dispose();
      legGeo.dispose();
      bootGeo.dispose();
      suitMat.dispose();
      skinMat.dispose();
      visorMat.dispose();
      bootsMat.dispose();
      backpackMat.dispose();
    };
  }, [isScrolling]);

  // Scroll Listener to calculate progress, velocity, and walking motion
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalDocHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalDocHeight)) : 0;
      setScrollPct(progress);

      const deltaY = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      if (Math.abs(deltaY) > 0.5) {
        setIsScrolling(true);
        // Advance walk animation phase proportional to scroll movement
        walkPhaseRef.current += Math.abs(deltaY) * 0.035;

        // Turn character left or right
        if (deltaY > 0) {
          setScrollDirection('right');
          targetRotationYRef.current = Math.PI / 2; // Facing right (downward scroll)
        } else {
          setScrollDirection('left');
          targetRotationYRef.current = -Math.PI / 2; // Facing left (upward scroll)
        }

        // Reset debounce timer to switch back to idle
        if (scrollTimeoutRef.current) {
          window.clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, 180);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleCharacterClick = () => {
    sound.playClick(1000);
    // Give character a mini hop
    if (limbsRef.current) {
      limbsRef.current.torso.position.y = 0.25;
      walkPhaseRef.current += Math.PI;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* Background Track Rail */}
      <div className="w-full h-[3px] bg-zinc-200/40 dark:bg-zinc-800/60 backdrop-blur-sm relative overflow-visible">
        {/* Glowing Progress Fill */}
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 transition-all duration-75 relative"
          style={{ width: `${scrollPct * 100}%` }}
        >
          {/* Leading glow halo */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-md opacity-80" />
        </div>
      </div>

      {/* Floating 3D Walking Character aligned with progress bar head */}
      <div
        className="absolute top-0 pointer-events-auto transition-transform duration-75 ease-out"
        style={{
          left: `calc(${scrollPct * 100}% - 34px)`,
          transform: 'translateY(-6px)',
        }}
      >
        <div
          onClick={handleCharacterClick}
          className="relative group cursor-pointer"
          title="3D Scroll Scout (Click for hop!)"
        >
          {/* Three.js 3D Viewport Mount */}
          <div
            ref={mountRef}
            className="w-[68px] h-[68px] filter drop-shadow-[0_4px_8px_rgba(6,182,212,0.35)] transition-transform group-hover:scale-110 active:scale-95"
          />

          {/* Interactive Tooltip Percentage Indicator */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded-full bg-zinc-950/85 border border-cyan-400/50 text-[9px] font-mono-code font-bold text-cyan-300 shadow-md pointer-events-none transition-opacity">
            {Math.round(scrollPct * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};
