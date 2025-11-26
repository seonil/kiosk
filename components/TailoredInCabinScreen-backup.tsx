import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Page } from '../types';
import Header from './Header';

type Solution = {
  id: string;
  title: string;
  image: string;
  description: string;
  accent: string;
  target: {
    x: number;
    y: number;
    zoom: number;
    rotation: number;
  };
  pageTarget?: Page;
};

const SOLUTIONS: Solution[] = [
  {
    id: 'cockpit',
    title: 'Digital Cockpit',
    image: 'images/btn-solution7.png',
    description: '완성차급 HUD · Cluster 연동으로 모든 드라이빙 맥락을 한눈에.',
    accent: '#7CD3FF',
    target: { x: -150, y: -40, zoom: 1.18, rotation: -6 }
  },
  {
    id: 'rse',
    title: 'Rear Seat Entertainment',
    image: 'images/btn-solution8.png',
    description: '패밀리와 공유하는 몰입형 시네마, 멀티 스크린 스트리밍.',
    accent: '#F9C9FF',
    target: { x: 180, y: -20, zoom: 1.22, rotation: 5 },
    pageTarget: Page.PassengerRseDetail
  },
  {
    id: 'dsm',
    title: 'Driver Status Monitor',
    image: 'images/btn-solution3.png',
    description: '시선 · 표정 · 졸음까지 실시간 분석해 안전을 우선하는 모니터링.',
    accent: '#FFDD8B',
    target: { x: -40, y: 60, zoom: 1.3, rotation: -2 },
    pageTarget: Page.DsmDetail
  },
  {
    id: 'ev',
    title: 'EV Charger',
    image: 'images/btn-solution4.png',
    description: '홈 · 포터블 대응 충전 UX를 디지털로 연결해 거점 간격을 줄입니다.',
    accent: '#6CF7C7',
    target: { x: 230, y: 110, zoom: 1.35, rotation: 8 },
    pageTarget: Page.EvHomeChargerDetail
  },
  {
    id: 'svm',
    title: 'Surround View Monitoring',
    image: 'images/btn-solution5.png',
    description: '차량 주변 360°를 스티치해 주차와 협로 진입을 직관적으로 안내.',
    accent: '#8CD8FF',
    target: { x: 0, y: 0, zoom: 1.16, rotation: 0 },
    pageTarget: Page.SvmDetail
  },
  {
    id: 'purifier',
    title: 'Air Purifier',
    image: 'images/btn-solution6.png',
    description: '미세먼지 · 탈취를 좌석별로 커버하는 맞춤형 청정 플로우.',
    accent: '#A7C8FF',
    target: { x: -210, y: 120, zoom: 1.24, rotation: -4 },
    pageTarget: Page.AirPurifierDetail
  },
  {
    id: 'camera',
    title: 'In-Cabin Camera',
    image: 'images/btn-solution1.png',
    description: '탑승자 제스처와 포즈를 읽어 인포테인먼트를 손끝처럼 제어.',
    accent: '#FFB6B6',
    target: { x: -10, y: -140, zoom: 1.32, rotation: -3 }
  },
  {
    id: 'carpet',
    title: 'Smart Carpet',
    image: 'images/btn-solution2.png',
    description: '바닥 촉감을 데이터로 읽어 모빌리티 안심 시나리오를 열어갑니다.',
    accent: '#BBFF9E',
    target: { x: 70, y: 170, zoom: 1.28, rotation: 4 }
  }
];

const TailoredInCabinScreen: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {
  const [activeId, setActiveId] = useState<string>(SOLUTIONS[0].id);
  const [pulseKey, setPulseKey] = useState(0);
  const [stageReady, setStageReady] = useState(false);
  const [viewMode, setViewMode] = useState<'follow' | 'top' | 'front' | 'rear' | 'free'>(
    'follow'
  );
  const meshToggles = useMemo(
    () => [
      'Object_4',
      'Object_5',
      'Object_6',
      'Object_7',
      'Object_9',
      'Object_10',
      'Object_12',
      'Object_13',
      'Object_15',
      'Object_16',
      'Object_18',
      'Object_19'
    ],
    []
  );
  const [visibleMeshes, setVisibleMeshes] = useState<Set<string>>(
    () => new Set(meshToggles)
  );
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const viewModeRef = useRef<'follow' | 'top' | 'front' | 'rear' | 'free'>('follow');
  const stageRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    camera?: THREE.PerspectiveCamera;
    controls?: OrbitControls;
    scene?: THREE.Scene;
    targetPos: THREE.Vector3;
    frame?: number;
    toggleTargets?: () => Record<string, THREE.Object3D>;
    dispose?: () => void;
  }>({ targetPos: new THREE.Vector3(4.8, 2.8, 6.2) });

  const activeSolution = useMemo(
    () => SOLUTIONS.find(s => s.id === activeId) ?? SOLUTIONS[0],
    [activeId]
  );

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  useEffect(() => {
    if (!canvasHostRef.current) {
      return;
    }

    setStageReady(false);
    const host = canvasHostRef.current;
    const initialWidth = host.clientWidth || 960;
    const initialHeight = host.clientHeight || 760;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initialWidth, initialHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    renderer.setClearColor(0x000000, 0);
    scene.background = null;
    scene.fog = null;

    const camera = new THREE.PerspectiveCamera(45, initialWidth / initialHeight, 0.1, 100);
    camera.position.set(4.8, 2.8, 6.2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 2.5;
    controls.maxDistance = 9.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.08;
    controls.target.set(0, 0.85, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.28);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
    keyLight.position.set(6, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const rimLight = new THREE.SpotLight(0x00eaff, 3.6, 24, Math.PI / 4, 0.6, 1.4);
    rimLight.position.set(-6, 6, -2);
    rimLight.target.position.set(0, 0, 0);
    rimLight.castShadow = true;
    rimLight.shadow.mapSize.width = 2048;
    rimLight.shadow.mapSize.height = 2048;
    scene.add(rimLight);
    scene.add(rimLight.target);

    const grid = new THREE.GridHelper(24, 22, 0x3c4a63, 0x2a3a52);
    grid.position.y = 0.01;
    scene.add(grid);

    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;
    let toggleTargets: Record<string, THREE.Object3D> = {};

    loader.load(
      'images/22_civic_sedan_stylized.glb',
      gltf => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);
        model.position.y += size.y * 0.5;

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.8 / maxDim;
        model.scale.setScalar(scale);

        model.traverse(child => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            const material = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            material.forEach(mat => {
              if (mat && 'metalness' in mat) {
                (mat as THREE.MeshStandardMaterial).metalness = 0.85;
                (mat as THREE.MeshStandardMaterial).roughness = 0.25;
              }
            });
          }
          if (child.name && meshToggles.includes(child.name)) {
            toggleTargets[child.name] = child;
            child.visible = visibleMeshes.has(child.name);
          }
        });

        scene.add(model);
        setStageReady(true);
      },
      undefined,
      () => setStageReady(false)
    );

    const targetPos = stageRef.current.targetPos;
    targetPos.set(4.6, 2.4, 6.2);

    const animate = () => {
      stageRef.current.frame = requestAnimationFrame(animate);
      camera.position.lerp(targetPos, 0.04);
      const currentView = viewModeRef.current;
      controls.enableRotate = currentView === 'free';
      controls.enableZoom = currentView === 'free';
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = host.clientWidth || initialWidth;
      const h = host.clientHeight || initialHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    stageRef.current.renderer = renderer;
    stageRef.current.camera = camera;
    stageRef.current.controls = controls;
    stageRef.current.scene = scene;
    stageRef.current.toggleTargets = () => toggleTargets;
    stageRef.current.dispose = () => {
      window.removeEventListener('resize', handleResize);
      if (stageRef.current.frame) {
        cancelAnimationFrame(stageRef.current.frame);
      }
      controls.dispose();
      renderer.dispose();
      pmrem.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
      scene.clear();
    };
    return () => {
      stageRef.current.dispose?.();
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage.camera || !stage.controls || !stage.targetPos) return;
    if (viewMode !== 'follow') return;

    const focus = activeSolution.target;
    const depth = 6.2 / (focus.zoom || 1);
    stage.targetPos.set(4.2 + focus.x / 240, 2.1 + focus.y / 320, depth);
    stage.controls.target.set(focus.x / 260, 0.64 + focus.y / 420, 0);
  }, [activeSolution, viewMode]);

  useEffect(() => {
    const targets = stageRef.current.toggleTargets?.();
    if (!targets) return;
    meshToggles.forEach(name => {
      const obj = targets[name];
      if (obj) obj.visible = visibleMeshes.has(name);
    });
  }, [visibleMeshes, meshToggles]);

  const toggleMeshVisibility = (name: string) => {
    setVisibleMeshes(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const setPresetView = (mode: 'follow' | 'top' | 'front' | 'rear' | 'free') => {
    setViewMode(mode);
    const stage = stageRef.current;
    if (!stage.camera || !stage.controls || !stage.targetPos) return;

    if (mode === 'follow') {
      const focus = activeSolution.target;
      const depth = 6.2 / (focus.zoom || 1);
      stage.targetPos.set(4.2 + focus.x / 240, 2.1 + focus.y / 320, depth);
      stage.controls.target.set(focus.x / 260, 0.64 + focus.y / 420, 0);
      return;
    }

    if (mode === 'top') {
      stage.targetPos.set(0, 11.5, 0.01);
      stage.controls.target.set(0, 0.3, 0);
      return;
    }
    if (mode === 'front') {
      stage.targetPos.set(0, 1.6, 7.2);
      stage.controls.target.set(0, 0.9, 0);
      return;
    }
    if (mode === 'rear') {
      stage.targetPos.set(0, 1.6, -7.2);
      stage.controls.target.set(0, 0.9, 0);
      return;
    }
    if (mode === 'free') {
      stage.targetPos.set(4.6, 2.6, 6.6);
      stage.controls.target.set(0, 0.9, 0);
    }
  };

  useEffect(() => {
    setPulseKey(key => key + 1);
  }, [activeId]);

  const renderMenuButton = (solution: Solution, align: 'left' | 'right') => (
    <motion.button
      key={solution.id}
      onClick={() => setActiveId(solution.id)}
      style={{
        width: '280px',
        height: '124px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        background:
          'linear-gradient(125deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
        boxShadow: solution.id === activeId
          ? `0 0 35px 0 ${solution.accent}33`
          : '0 6px 20px rgba(0,0,0,0.25)',
        justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
        padding: align === 'left' ? '10px 14px 10px 10px' : '10px 10px 10px 14px',
        cursor: 'pointer'
      }}
      whileHover={{ scale: 1.02, opacity: 0.95 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        borderColor: solution.id === activeId ? solution.accent : 'rgba(255,255,255,0.12)'
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      {align === 'left' && (
        <div
          style={{
            padding: '8px',
            borderRadius: '12px',
            background: `${solution.accent}22`,
            border: `1px solid ${solution.accent}55`
          }}
        >
          <img
            src={solution.image}
            alt={solution.title}
            style={{ width: '92px', height: '92px', objectFit: 'contain' }}
          />
        </div>
      )}
      <div
        style={{
          color: '#fff',
          flex: 1,
          display: 'flex',
          alignItems: align === 'left' ? 'flex-start' : 'flex-end',
          justifyContent: align === 'left' ? 'flex-start' : 'flex-end'
        }}
      >
        <div style={{ textAlign: align === 'left' ? 'left' : 'right' }}>
          <div
            style={{
              fontFamily: 'Albert Sans',
              fontWeight: 700,
              fontSize: '20px',
              letterSpacing: '0.4px',
              color: '#fff'
            }}
          >
            {solution.title}
          </div>
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.7)',
              marginTop: '6px',
              lineHeight: 1.4,
              maxWidth: '140px'
            }}
          >
            {solution.description.slice(0, 36)}...
          </div>
        </div>
      </div>
      {align === 'right' && (
        <div
          style={{
            padding: '8px',
            borderRadius: '12px',
            background: `${solution.accent}22`,
            border: `1px solid ${solution.accent}55`
          }}
        >
          <img
            src={solution.image}
            alt={solution.title}
            style={{ width: '92px', height: '92px', objectFit: 'contain' }}
          />
        </div>
      )}
    </motion.button>
  );

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/tailored-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(45% 45% at 50% 50%, rgba(78, 194, 255, 0.15), transparent), radial-gradient(30% 30% at 70% 30%, rgba(255, 198, 255, 0.18), transparent)'
        }}
      />

      <Header setPage={setPage} onBack={() => setPage(Page.Home)} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '120px 120px'
        }}
      />

      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          top: '200px',
          left: '56px'
        }}
      >
        {SOLUTIONS.slice(0, 4).map(solution => renderMenuButton(solution, 'left'))}
      </div>

      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          top: '200px',
          right: '56px'
        }}
      >
        {SOLUTIONS.slice(4).map(solution => renderMenuButton(solution, 'right'))}
      </div>

      <div
        style={{
          position: 'absolute',
          right: '260px',
          bottom: '80px',
          display: 'flex',
          gap: '10px',
          padding: '10px 12px',
          borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(10, 19, 36, 0.75)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
        }}
      >
        {[
          { key: 'follow', label: '포커스' },
          { key: 'top', label: '평면뷰' },
          { key: 'front', label: '정면뷰' },
          { key: 'rear', label: '후면뷰' },
          { key: 'free', label: '자유뷰' }
        ].map(item => {
          const active = viewMode === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setPresetView(item.key as typeof viewMode)}
              style={{
                padding: '10px 14px',
                minWidth: '80px',
                borderRadius: '10px',
                border: `1px solid ${active ? '#7CD3FF' : 'rgba(255,255,255,0.2)'}`,
                background: active
                  ? 'linear-gradient(120deg, rgba(124,211,255,0.35), rgba(124,211,255,0.16))'
                  : 'rgba(255,255,255,0.05)',
                color: active ? '#07101F' : '#e8f3ff',
                fontWeight: 700,
                letterSpacing: '0.4px',
                cursor: 'pointer',
                boxShadow: active ? '0 8px 20px rgba(124,211,255,0.35)' : 'none'
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '80px',
          width: '220px',
          padding: '12px',
          borderRadius: '18px',
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'rgba(8, 14, 26, 0.72)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 10px 35px rgba(0,0,0,0.35)',
          color: '#fff'
        }}
      >
        <div
          style={{
            fontSize: '14px',
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '8px'
          }}
        >
          Mesh toggles
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '8px'
          }}
        >
          {meshToggles.map(name => {
            const active = visibleMeshes.has(name);
            return (
              <button
                key={name}
                onClick={() => toggleMeshVisibility(name)}
                style={{
                  height: '36px',
                  borderRadius: '10px',
                  border: `1px solid ${active ? '#6CF7C7' : 'rgba(255,255,255,0.16)'}`,
                  background: active
                    ? 'linear-gradient(120deg, rgba(108,247,199,0.25), rgba(108,247,199,0.12))'
                    : 'rgba(255,255,255,0.02)',
                  color: active ? '#0A1324' : '#e6e6e6',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.4px',
                  cursor: 'pointer',
                  textShadow: active ? '0 0 10px rgba(108,247,199,0.35)' : 'none'
                }}
              >
                {name.replace('Object_', '#')}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setVisibleMeshes(new Set(meshToggles))}
          style={{
            marginTop: '10px',
            width: '100%',
            height: '36px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            fontWeight: 700,
            letterSpacing: '0.6px',
            cursor: 'pointer'
          }}
        >
          ALL ON
        </button>
        <button
          onClick={() => setVisibleMeshes(new Set())}
          style={{
            marginTop: '8px',
            width: '100%',
            height: '32px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.03)',
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600,
            letterSpacing: '0.4px',
            cursor: 'pointer'
          }}
        >
          ALL OFF
        </button>
        <div
          style={{
            marginTop: '10px',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.4
          }}
        >
          자유뷰를 누른 뒤 마우스 드래그·휠로<br />자유롭게 좌표를 돌려볼 수 있어요.
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '180px',
          left: '480px',
          width: '960px',
          height: '760px'
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '32px',
            overflow: 'hidden',
            background: 'radial-gradient(circle at 50% 60%, rgba(255,255,255,0.07), rgba(255,255,255,0.02))'
          }}
          animate={{ boxShadow: `0 0 60px ${activeSolution.accent}12` }}
        />

        <motion.div
          style={{
            position: 'absolute',
            top: '48px',
            left: '48px',
            right: '48px',
            bottom: '48px'
          }}
          animate={{
            x: activeSolution.target.x,
            y: activeSolution.target.y,
            scale: activeSolution.target.zoom,
            rotateZ: 0
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 0.8 }}
        >
          <motion.div
            key={`grid-${pulseKey}`}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '28px',
              border: `1px solid ${activeSolution.accent}55`,
              mixBlendMode: 'screen'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.18, scale: 1.02 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            animate={{ rotate: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 14 }}
          >
            <motion.div
              key={`reticle-${pulseKey}`}
              style={{ width: '360px', height: '360px', position: 'relative' }}
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: `1px dashed ${activeSolution.accent}55`
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  borderTop: `1px solid ${activeSolution.accent}33`,
                  transform: 'translateY(-50%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  borderLeft: `1px solid ${activeSolution.accent}33`,
                  transform: 'translateX(-50%)'
                }}
              />
            </motion.div>
          </motion.div>

          <div
            style={{
              position: 'absolute',
              inset: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              ref={canvasHostRef}
              style={{
                position: 'relative',
                width: '780px',
                height: '780px',
                filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.25))'
              }}
            />
            {!stageReady && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '20px',
                  letterSpacing: '0.6px',
                  width: '780px',
                  height: '780px',
                  borderRadius: '32px',
                  border: '1px dashed rgba(255,255,255,0.2)',
                  background: 'rgba(6,12,24,0.7)'
                }}
              >
                Loading vehicle...
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            color: '#fff',
            bottom: '24px',
            left: '48px'
          }}
          key={`coords-${pulseKey}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
            Focus Vector
          </div>
          <div
            style={{
              marginTop: '4px',
              fontSize: '20px',
              display: 'flex',
              gap: '16px'
            }}
          >
            <span style={{ color: activeSolution.accent }}>X {activeSolution.target.x}</span>
            <span style={{ color: activeSolution.accent }}>Y {activeSolution.target.y}</span>
            <span style={{ color: activeSolution.accent }}>
              Zoom {Math.round(activeSolution.target.zoom * 100)}%
            </span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeSolution.id}
          style={{
            position: 'absolute',
            borderRadius: '24px',
            color: '#fff',
            left: '480px',
            right: '480px',
            bottom: '60px',
            padding: '20px 26px',
            background:
              'linear-gradient(140deg, rgba(9,19,34,0.75), rgba(12,26,46,0.9))',
            border: `1px solid ${activeSolution.accent}33`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.45)`
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            
            {activeSolution.pageTarget && (
              <motion.button
                onClick={() => setPage(activeSolution.pageTarget!)}
                style={{
                  padding: '14px 22px',
                  borderRadius: '12px',
                  border: `1px solid ${activeSolution.accent}`,
                  color: '#0A1324',
                  background: activeSolution.accent,
                  boxShadow: `0 10px 30px ${activeSolution.accent}44`,
                  minWidth: '180px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                자세히 보기
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TailoredInCabinScreen;
