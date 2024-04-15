import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeJsVectorGraphic = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      console.error('Ref is not attached to a DOM element');
      return;
    }

    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    ref.current.appendChild(renderer.domElement);

    // Create a plane geometry
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    const vertices = geometry.vertices;

    // Apply sine wave deformation
    if (vertices && vertices.length) {
      for (let i = 0; i < vertices.length; i++) {
        const x = vertices[i].x;
        const y = vertices[i].y;
        vertices[i].z = Math.sin(x * Math.PI * 2) * Math.sin(y * Math.PI);
      }
    }

    // ... (rest of the code remains the same)
  }, []);

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeJsVectorGraphic;