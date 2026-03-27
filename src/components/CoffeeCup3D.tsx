import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ── Force transparent background on renderer ─────────────────────────────
function TransparentBackground() {
  const { gl } = useThree()
  useEffect(() => {
    gl.setClearColor(0x000000, 0)
  }, [gl])
  return null
}

// ── Steam particle ────────────────────────────────────────────────────────
function SteamParticle({ offset }: { offset: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const elapsed = useRef(offset * 2.5)
  const speed = 0.4 + offset * 0.2
  const sway = 0.3 + offset * 0.15

  useFrame((_, delta) => {
    if (!ref.current) return
    elapsed.current += delta * speed
    const t = elapsed.current % 3
    ref.current.position.y = 1.6 + t * 0.8
    ref.current.position.x = Math.sin(t * 2 + offset) * sway * (t / 3)
    ref.current.position.z = Math.cos(t * 1.5 + offset) * sway * 0.5 * (t / 3)
    ;(ref.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.3 - t * 0.1)
    ref.current.scale.setScalar(0.04 + t * 0.04)
  })

  return (
    <mesh ref={ref} position={[0, 1.6, 0]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#c8b89a"
        transparent
        opacity={0.3}
        roughness={1}
        metalness={0}
        depthWrite={false}
      />
    </mesh>
  )
}

// ── Coffee liquid surface ─────────────────────────────────────────────────
function CoffeeSurface() {
  const ref = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current) return
    elapsed.current += delta
    ;(ref.current.material as THREE.MeshStandardMaterial).roughness =
      0.4 + Math.sin(elapsed.current * 0.8) * 0.08
  })

  return (
    <mesh ref={ref} position={[0, 0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.57, 64]} />
      <meshStandardMaterial
        color="#0d0805"
        roughness={0.4}
        metalness={0}
      />
    </mesh>
  )
}

// ── Cup body ──────────────────────────────────────────────────────────────
function CupBody({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.35
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * -0.12,
      0.05
    )
    const target = hovered ? 1.06 : 1.0
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, target, 0.08)
    )
  })

  const cupColor = '#3a2010'
  const accentColor = '#c17f45'
  const baseColor = '#1e1008'

  return (
    <group ref={groupRef}>
      {/* Outer cup body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.62, 0.48, 1.5, 64, 1, true]} />
        <meshStandardMaterial
          color={cupColor}
          roughness={0.35}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cup base */}
      <mesh position={[0, -0.75, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.46, 0.06, 64]} />
        <meshStandardMaterial color={baseColor} roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Cup rim ring */}
      <mesh position={[0, 0.755, 0]}>
        <torusGeometry args={[0.62, 0.022, 16, 64]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.84, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.31, 0.052, 16, 48, Math.PI]} />
        <meshStandardMaterial color={cupColor} roughness={0.35} metalness={0.1} />
      </mesh>

      {/* Saucer */}
      <mesh position={[0, -0.84, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.1, 1.0, 0.09, 64]} />
        <meshStandardMaterial color={baseColor} roughness={0.3} metalness={0.08} />
      </mesh>

      {/* Saucer rim accent */}
      <mesh position={[0, -0.795, 0]}>
        <torusGeometry args={[1.05, 0.016, 12, 64]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Inner cup wall (visible from top) */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.58, 0.46, 1.3, 64, 1, true]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.5}
          metalness={0}
          side={THREE.BackSide}
        />
      </mesh>

      <CoffeeSurface />

      {[0, 1, 2, 3].map((i) => (
        <SteamParticle key={i} offset={i} />
      ))}
    </group>
  )
}

// ── Ambient floating particles ────────────────────────────────────────────
function AmbientParticles() {
  const ref = useRef<THREE.Points>(null)
  const elapsed = useRef(0)
  const count = 120

  const positions = useRef((() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  })())

  useFrame((_, delta) => {
    if (!ref.current) return
    elapsed.current += delta
    ref.current.rotation.y = elapsed.current * 0.04
    ref.current.rotation.x = Math.sin(elapsed.current * 0.02) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c17f45"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ── Lighting — warm, no HDR needed ────────────────────────────────────────
function Lighting() {
  return (
    <>
      <ambientLight intensity={1.2} color="#3d2010" />
      <pointLight position={[3, 5, 3]}   intensity={40} color="#d4924e" />
      <pointLight position={[-2, 1, -3]} intensity={15} color="#7c5030" />
      <pointLight position={[0, -3, 2]}  intensity={8}  color="#2c1a0e" />
      <spotLight
        position={[0, 5, 2]}
        intensity={50}
        color="#f0d8b0"
        angle={0.45}
        penumbra={0.9}
        castShadow
        shadow-mapSize={[512, 512]}
      />
    </>
  )
}

// ── Canvas wrapper ────────────────────────────────────────────────────────
export default function CoffeeCup3D() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ width: '100%', height: '100%', cursor: hovered ? 'grab' : 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 2]}
        camera={{ position: [0, 0.6, 4.2], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <TransparentBackground />
        <Lighting />
        <AmbientParticles />
        <CupBody hovered={hovered} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.5}
          dampingFactor={0.08}
          enableDamping
        />
      </Canvas>
    </div>
  )
}