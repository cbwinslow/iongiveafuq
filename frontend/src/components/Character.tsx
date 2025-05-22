import { Character } from '../data/characters';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface CharacterProps {
  character: Character;
  onCharacterClick?: (character: Character) => void;
}

export const CharacterComponent = ({ character, onCharacterClick }: CharacterProps) => {
  const sceneRef = useRef<THREE.Scene>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const controlsRef = useRef<OrbitControls>(null);

  useEffect(() => {
    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    rendererRef.current = renderer;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    // Create a basic geometry and material
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Update character position
    cube.position.set(
      character.position.x,
      character.position.y,
      character.position.z
    );

    // Add to DOM
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '0';
    container.style.top = '0';
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      container.remove();
      scene.dispose();
      renderer.dispose();
    };
  }, [character.position]);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${character.position.x * 100 + 50}%`,
        top: `${character.position.y * 100 + 20}%`,
        cursor: 'pointer',
        zIndex: 100
      }}
      onClick={() => onCharacterClick?.(character)}
    >
      <div className="character-tooltip">
        <h3>{character.name}</h3>
        <p>{character.species}</p>
      </div>
    </div>
  );
};
