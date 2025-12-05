"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import * as THREE from "three";
import "./HexSphere.scss";

export default function HexSphere() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // ========== INITIALIZATION ==========
        let renderer, scene, camera, sphere, raf, yawGroup, pitchGroup;

        // Calculate square canvas dimensions (clamped to viewport)
        const maxWidth = Math.min(mount.clientWidth || 300, window.innerWidth);
        const sphereSize = Math.min(maxWidth, mount.clientHeight || 300);
        const width = sphereSize;
        const height = sphereSize;

        // ========== THREE.JS SETUP ==========
        scene = new THREE.Scene();
        scene.background = null;

        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 2.65);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.background = 'transparent';
        mount.appendChild(renderer.domElement);

        // ========== SPHERE & ROTATION GROUPS ==========
        const geometry = new THREE.SphereGeometry(0.9, 6, 6);
        const material = new THREE.MeshBasicMaterial({ color: 0x415057, wireframe: true });
        sphere = new THREE.Mesh(geometry, material);

        // Nested groups for independent yaw (horizontal) and pitch (vertical) rotation
        yawGroup = new THREE.Object3D();
        pitchGroup = new THREE.Object3D();
        pitchGroup.add(sphere);
        yawGroup.add(pitchGroup);
        scene.add(yawGroup);

        // ========== INTERACTION CONSTANTS ==========
        const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const ROTATION_SPEED = isMobile ? 0.010 : 0.005;
        const DAMPING = 0.93;
        const AUTO_ROTATION_Y = 0.0025;
        const AUTO_ROTATION_X = 0.00015;

        // ========== INTERACTION STATE ==========
        let isPointerDown = false;
        let activePointerId = null;
        let lastX = 0;
        let lastY = 0;
        let velocityX = 0;
        let velocityY = 0;

        // ========== EVENT HANDLERS ==========
        const onPointerDown = (e) => {
            if (!renderer?.domElement) return;
            e.preventDefault();
            isPointerDown = true;
            activePointerId = e.pointerId;
            lastX = e.clientX;
            lastY = e.clientY;
            try { renderer.domElement.setPointerCapture(activePointerId); } catch (err) { }
        };

        const onPointerMove = (e) => {
            if (!isPointerDown || e.pointerId !== activePointerId) return;
            e.preventDefault();

            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;

            yawGroup.rotation.y += dx * ROTATION_SPEED;
            pitchGroup.rotation.x += dy * ROTATION_SPEED;

            velocityY = dx * ROTATION_SPEED;
            velocityX = dy * ROTATION_SPEED;
        };

        const onPointerUp = (e) => {
            if (!isPointerDown || e.pointerId !== activePointerId) return;
            isPointerDown = false;
            try { renderer.domElement.releasePointerCapture(activePointerId); } catch (err) { }
            activePointerId = null;
        };

        const onWindowResize = () => {
            if (!mount || !renderer || !camera) return;

            const newWidth = Math.min(
                (mount.clientWidth && mount.clientWidth > 0) ? mount.clientWidth : window.innerWidth,
                window.innerWidth
            );
            const newHeight = (mount.clientHeight && mount.clientHeight > 0) ? mount.clientHeight : window.innerHeight;

            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(newWidth, newHeight, false);
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
        };

        // ========== ANIMATION LOOP ==========
        const animate = () => {
            raf = requestAnimationFrame(animate);

            // Auto-rotation when idle
            sphere.rotation.y += AUTO_ROTATION_Y;
            sphere.rotation.x += AUTO_ROTATION_X;

            // Apply momentum with damping when not actively dragging
            if (!isPointerDown) {
                velocityX *= DAMPING;
                velocityY *= DAMPING;

                if (Math.abs(velocityX) < 1e-5) velocityX = 0;
                if (Math.abs(velocityY) < 1e-5) velocityY = 0;

                pitchGroup.rotation.x += velocityX;
                yawGroup.rotation.y += velocityY;
            }

            renderer.render(scene, camera);
        };

        // ========== ATTACH EVENT LISTENERS ==========
        renderer.domElement.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        window.addEventListener('resize', onWindowResize);
        onWindowResize();
        animate();

        // ========== CLEANUP ==========
        return () => {
            try { renderer.domElement.removeEventListener('pointerdown', onPointerDown); } catch (e) { }
            try { window.removeEventListener('pointermove', onPointerMove); } catch (e) { }
            try { window.removeEventListener('pointerup', onPointerUp); } catch (e) { }
            try { window.removeEventListener('pointercancel', onPointerUp); } catch (e) { }
            try { window.removeEventListener('resize', onWindowResize); } catch (e) { }

            cancelAnimationFrame(raf);

            if (renderer) {
                try { renderer.dispose(); } catch (e) { }
            }
            try { geometry.dispose(); } catch (e) { }
            try { material.dispose(); } catch (e) { }
            if (renderer?.domElement && mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <motion.div
            ref={mountRef}
            className="hex-sphere"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.08 }}
        />
    );
}
