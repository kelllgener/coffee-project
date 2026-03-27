import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ── Transparent canvas background ────────────────────────────────────────
function TransparentBackground() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);
  return null;
}

// ── Steam particle ────────────────────────────────────────────────────────
function SteamParticle({ offset }: { offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const elapsed = useRef(offset * 2.5);
  const speed = 0.38 + offset * 0.18;
  const sway = 0.25 + offset * 0.12;

  useFrame((_, delta) => {
    if (!ref.current) return;
    elapsed.current += delta * speed;
    const t = elapsed.current % 3;
    ref.current.position.y = 1.65 + t * 0.75;
    ref.current.position.x = Math.sin(t * 2.2 + offset) * sway * (t / 3);
    ref.current.position.z = Math.cos(t * 1.4 + offset) * sway * 0.5 * (t / 3);
    (ref.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.28 - t * 0.09);
    ref.current.scale.setScalar(0.05 + t * 0.045);
  });

  return (
    <mesh ref={ref} position={[0, 1.65, 0]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#e8ddd0"
        transparent
        opacity={0.28}
        roughness={1}
        metalness={0}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Coffee liquid surface ─────────────────────────────────────────────────
function CoffeeSurface() {
  const ref = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    elapsed.current += delta;
    (ref.current.material as THREE.MeshStandardMaterial).roughness =
      0.25 + Math.sin(elapsed.current * 0.9) * 0.06;
  });

  return (
    <mesh ref={ref} position={[0, 0.71, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.555, 64]} />
      <meshStandardMaterial color="#1c0f06" roughness={0.25} metalness={0.05} />
    </mesh>
  );
}

// ── Crema ring ────────────────────────────────────────────────────────────
function CremaRing() {
  return (
    <mesh position={[0, 0.715, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.38, 0.555, 64]} />
      <meshStandardMaterial
        color="#6b3d1e"
        roughness={0.5}
        metalness={0}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// ── Logo label painted onto a canvas texture ──────────────────────────────
function CupLabel() {
  const texture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Transparent base
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2 + 20;

    // ── Decorative top rule ──
    ctx.strokeStyle = "rgba(201, 135, 58, 0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 90, cy - 72);
    ctx.lineTo(cx + 90, cy - 72);
    ctx.stroke();

    // ── Small diamond / ornament ──
    ctx.fillStyle = "rgba(201, 135, 58, 0.85)";
    ctx.save();
    ctx.translate(cx, cy - 72);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-4, -4, 8, 8);
    ctx.restore();

    // ── "NOIR" wordmark ──
    ctx.fillStyle = "rgba(240, 220, 190, 0.92)";
    ctx.font = "bold 72px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("NOIR", cx, cy - 22);

    // ── Thin rule between words ──
    ctx.strokeStyle = "rgba(201, 135, 58, 0.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 60, cy + 18);
    ctx.lineTo(cx + 60, cy + 18);
    ctx.stroke();

    // ── "& BREW" in smaller spaced caps ──
    ctx.fillStyle = "rgba(201, 135, 58, 0.9)";
    ctx.font = "500 28px Georgia, serif";
    ctx.letterSpacing = "0.22em";
    ctx.fillText("& BREW", cx + 14, cy + 44);

    // ── Decorative bottom rule ──
    ctx.strokeStyle = "rgba(201, 135, 58, 0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 90, cy + 76);
    ctx.lineTo(cx + 90, cy + 76);
    ctx.stroke();

    // ── Small diamond bottom ──
    ctx.fillStyle = "rgba(201, 135, 58, 0.85)";
    ctx.save();
    ctx.translate(cx, cy + 76);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-4, -4, 8, 8);
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Wrap the label around the front face of the cup
  // Position it slightly proud of the cup surface to avoid z-fighting
  return (
    <mesh position={[0, 0.08, 0.615]} rotation={[0, 0, 0]}>
      <planeGeometry args={[0.82, 0.72]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={1}
        roughness={0.45}
        metalness={0.05}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-1}
        polygonOffsetUnits={-1}
      />
    </mesh>
  );
}

// ── Cup body ──────────────────────────────────────────────────────────────
function CupBody({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * -0.1,
      0.05
    );
    const target = hovered ? 1.05 : 1.0;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, target, 0.08)
    );
  });

  const ceramicColor  = "#c8a882";
  const ceramicInside = "#b8956e";
  const accentGold    = "#c9873a";
  const saucerColor   = "#c2a07a";
  const baseColor     = "#a07850";

  return (
    <group ref={groupRef}>

      {/* Outer cup body — castShadow only, NO receiveShadow to kill self-shadow artifact */}
      <mesh castShadow>
        <cylinderGeometry args={[0.60, 0.46, 1.48, 80, 2, true]} />
        <meshStandardMaterial
          color={ceramicColor}
          roughness={0.55}
          metalness={0.0}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Inner cup wall */}
      <mesh>
        <cylinderGeometry args={[0.56, 0.43, 1.44, 80, 1, true]} />
        <meshStandardMaterial
          color={ceramicInside}
          roughness={0.6}
          metalness={0}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Cup base — castShadow only */}
      <mesh position={[0, -0.74, 0]} castShadow>
        <cylinderGeometry args={[0.46, 0.44, 0.05, 64]} />
        <meshStandardMaterial color={baseColor} roughness={0.65} metalness={0} />
      </mesh>

      {/* Rim gold torus */}
      <mesh position={[0, 0.745, 0]}>
        <torusGeometry args={[0.60, 0.026, 20, 80]} />
        <meshStandardMaterial color={accentGold} roughness={0.18} metalness={0.55} />
      </mesh>

      {/* Rim top face */}
      <mesh position={[0, 0.748, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.57, 0.62, 80]} />
        <meshStandardMaterial color={accentGold} roughness={0.18} metalness={0.55} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.80, 0.06, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.295, 0.058, 20, 60, Math.PI]} />
        <meshStandardMaterial color={ceramicColor} roughness={0.55} metalness={0} />
      </mesh>

      {/* Handle gold accent lines */}
      <mesh position={[0.80, 0.27, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.295, 0.010, 12, 60, Math.PI]} />
        <meshStandardMaterial color={accentGold} roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0.80, -0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.295, 0.010, 12, 60, Math.PI]} />
        <meshStandardMaterial color={accentGold} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Saucer — castShadow only, NO receiveShadow */}
      <mesh position={[0, -0.82, 0]} castShadow>
        <cylinderGeometry args={[1.08, 0.98, 0.10, 80]} />
        <meshStandardMaterial color={saucerColor} roughness={0.5} metalness={0} />
      </mesh>

      {/* Saucer top face ring */}
      <mesh position={[0, -0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.68, 1.08, 80]} />
        <meshStandardMaterial color={saucerColor} roughness={0.45} metalness={0} />
      </mesh>

      {/* Saucer center well */}
      <mesh position={[0, -0.768, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.68, 64]} />
        <meshStandardMaterial color={baseColor} roughness={0.6} metalness={0} />
      </mesh>

      {/* Saucer rim gold accent */}
      <mesh position={[0, -0.772, 0]}>
        <torusGeometry args={[1.03, 0.016, 14, 80]} />
        <meshStandardMaterial color={accentGold} roughness={0.18} metalness={0.55} />
      </mesh>

      {/* Saucer inner gold ring */}
      <mesh position={[0, -0.768, 0]}>
        <torusGeometry args={[0.68, 0.010, 12, 64]} />
        <meshStandardMaterial color={accentGold} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Coffee surface + crema */}
      <CoffeeSurface />
      <CremaRing />

      {/* Logo label */}
      <CupLabel />

      {/* Steam */}
      {[0, 1, 2, 3].map((i) => (
        <SteamParticle key={i} offset={i} />
      ))}
    </group>
  );
}

// ── Ambient dust particles ────────────────────────────────────────────────
function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);
  const elapsed = useRef(0);
  const count = 100;

  const positions = useRef(
    (() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        arr[i * 3]     = (Math.random() - 0.5) * 7;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
      return arr;
    })()
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    elapsed.current += delta;
    ref.current.rotation.y = elapsed.current * 0.035;
    ref.current.rotation.x = Math.sin(elapsed.current * 0.018) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d4924e"
        size={0.022}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Lighting ──────────────────────────────────────────────────────────────
function Lighting() {
  return (
    <>
      <ambientLight intensity={2.5} color="#8c6040" />
      <pointLight position={[-3, 4, 4]} intensity={55} color="#ffe0b0" />
      <pointLight position={[4, 2, 2]}  intensity={30} color="#ffd090" />
      <pointLight position={[0, 3, -4]} intensity={20} color="#c87030" />
      <pointLight position={[0, -3, 2]} intensity={12} color="#a06030" />
      {/* castShadow only on the spotlight — no self-shadowing on the cup */}
      <spotLight
        position={[0, 6, 1]}
        intensity={80}
        color="#fff5e8"
        angle={0.5}
        penumbra={0.85}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.002}
      />
    </>
  );
}

// ── Canvas wrapper ────────────────────────────────────────────────────────
export default function CoffeeCup3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ width: "100%", height: "100%", cursor: hovered ? "grab" : "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 2]}
        camera={{ position: [0, 0.8, 4.0], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <TransparentBackground />
        <Lighting />
        <AmbientParticles />
        <CupBody hovered={hovered} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 1.9}
          rotateSpeed={0.5}
          dampingFactor={0.08}
          enableDamping
        />
      </Canvas>
    </div>
  );
}