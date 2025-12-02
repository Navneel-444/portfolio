"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function HexSphere({ textureSrc } = {}) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        let frameId = null;

        // -------------------------------
        // 1) SAFE INIT WRAPPER
        // -------------------------------
        const safeInit = () => {
            if (!mountRef.current) return;

            let width = mountRef.current.clientWidth;
            let height = mountRef.current.clientHeight;

            // If width/height = 0, try again next frame
            if (width === 0 || height === 0) {
                frameId = requestAnimationFrame(safeInit);
                return;
            }

            init(width, height);
        };

        safeInit(); // start the safe initialization

        // -------------------------------
        // FULL THREE.JS INITIALIZATION
        // -------------------------------
        function init(width, height) {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.set(0, 0, 3);

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(width, height);
            mountRef.current.appendChild(renderer.domElement);

            // SPHERE (low poly)
            const geometry = new THREE.SphereGeometry(1, 7, 7);

            let material;
            if (textureSrc) {
                const loader = new THREE.TextureLoader();
                const tex = loader.load(textureSrc);
                tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
                material = new THREE.MeshBasicMaterial({ map: tex });
            } else {
                material = new THREE.MeshBasicMaterial({ color: 0x2b2f36, wireframe: true });
            }

            const sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);

            // ORBIT CONTROLS
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enablePan = false;
            controls.enableZoom = false;
            controls.enableDamping = true;
            controls.dampingFactor = 0.08;
            controls.rotateSpeed = 0.4;

            let userInteracting = false;
            let velocity = 0;
            let lastAngle = controls.getAzimuthalAngle();

            const onStart = () => {
                userInteracting = true;
                velocity = 0;
                lastAngle = controls.getAzimuthalAngle();
                requestRenderIfNotRequested();
            };

            const onEnd = () => {
                userInteracting = false;
                requestRenderIfNotRequested();
            };

            controls.addEventListener("start", onStart);
            controls.addEventListener("end", onEnd);

            controls.addEventListener("change", () => {
                if (userInteracting) {
                    const angle = controls.getAzimuthalAngle();
                    velocity = angle - lastAngle;
                    lastAngle = angle;
                }
                requestRenderIfNotRequested();
            });

            let rafId = null;

            const animate = () => {
                rafId = null;

                if (!userInteracting) {
                    velocity *= 0.92;
                }

                controls.update();
                renderer.render(scene, camera);

                if (userInteracting || Math.abs(velocity) > 0.00015) {
                    requestRenderIfNotRequested();
                }
            };

            function requestRenderIfNotRequested() {
                if (!rafId) rafId = requestAnimationFrame(animate);
            }

            velocity = 0.0036;
            requestRenderIfNotRequested();

            const onResize = () => {
                if (!mountRef.current) return;
                const w = mountRef.current.clientWidth;
                const h = mountRef.current.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
                requestRenderIfNotRequested();
            };

            window.addEventListener("resize", onResize);

            const onVisibility = () => {
                if (document.hidden) {
                    if (rafId) cancelAnimationFrame(rafId);
                    rafId = null;
                } else {
                    requestRenderIfNotRequested();
                }
            };
            document.addEventListener("visibilitychange", onVisibility);

            // Cleanup
            return () => {
                window.removeEventListener("resize", onResize);
                document.removeEventListener("visibilitychange", onVisibility);
                controls.dispose();
                geometry.dispose();
                if (material.map) material.map.dispose();
                material.dispose();
                renderer.forceContextLoss();
                renderer.dispose();
                if (rafId) cancelAnimationFrame(rafId);
                if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                    mountRef.current.removeChild(renderer.domElement);
                }
            };
        }

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [textureSrc]);

    return (
        <div
            ref={mountRef}
            style={{ width: "100%", height: "100%", touchAction: "none" }}
        />
    );
}
