"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./HexSphere.scss";

export default function HexSphere() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        let renderer, scene, camera, sphere, raf, yawGroup, pitchGroup;

        console.log("mount size:", mount.clientWidth, mount.clientHeight);

        const width = mount.clientWidth || 300;
        const height = mount.clientHeight || 300;

        // --- SCENE ---
        scene = new THREE.Scene();
        scene.background = null;


        // --- CAMERA ---
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 3);
        camera.lookAt(0, 0, 0);

        // --- RENDERER ---
        // use alpha:true so canvas can be transparent
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        // Use devicePixelRatio but cap it to avoid excessive GPU load
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        // make the canvas fill the mount element via CSS so it resizes visually
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        // Explicitly set clear alpha to 0 for full transparency and make
        // sure the canvas element itself has a transparent background style.
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.background = 'transparent';
        mount.appendChild(renderer.domElement);

        // Handle responsive resize: update renderer and camera when container/window changes
        const onWindowResize = () => {
            if (!mount || !renderer || !camera) return;
            // prefer mount's size but fall back to window size
            const newWidth = (mount.clientWidth && mount.clientWidth > 0) ? mount.clientWidth : window.innerWidth;
            const newHeight = (mount.clientHeight && mount.clientHeight > 0) ? mount.clientHeight : window.innerHeight;

            // update renderer pixel ratio in case DPR changed (e.g. moving window between monitors)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(newWidth, newHeight, false);

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
        };

        // call once to ensure correct initial sizing if mount size differs from initial measurement
        onWindowResize();
        window.addEventListener('resize', onWindowResize);

        // --- SPHERE (BRIGHT GREEN, 100% visible) ---
        const geometry = new THREE.SphereGeometry(1, 6, 5);
        const material = new THREE.MeshBasicMaterial({ color: 0x415057, wireframe: true });

        sphere = new THREE.Mesh(geometry, material);

        // Use nested groups: outer yawGroup handles Y rotation (yaw),
        // inner pitchGroup handles X rotation (pitch). This decouples
        // horizontal and vertical rotations so reaching the top doesn't
        // lock or invert the horizontal movement.
        yawGroup = new THREE.Object3D();
        pitchGroup = new THREE.Object3D();

        pitchGroup.add(sphere);
        yawGroup.add(pitchGroup);
        scene.add(yawGroup);

        console.log("sphere added:", sphere);

        // --- RENDER LOOP ---
        // Pointer/touch interaction state
        let isPointerDown = false;
        let activePointerId = null;
        let lastX = 0;
        let lastY = 0;
        // velocities applied each frame (momentum)
        let velocityX = 0; // vertical drag -> rotate x
        let velocityY = 0; // horizontal drag -> rotate y

        const ROTATION_SPEED = 0.005; // sensitivity of rotation to pointer delta
        const DAMPING = 0.93;
        // Automatic idle rotation (when not interacting) so the sphere always moves
        const AUTO_ROTATION_Y = 0.0025; // horizontal auto-rotation (around Y)
        const AUTO_ROTATION_X = 0.00015; // subtle vertical auto-tilt (around X)

        // Pointer event handlers (works for touch and mouse via Pointer Events)
        const onPointerDown = (e) => {
            if (!renderer || !renderer.domElement) return;
            // only handle primary pointer
            isPointerDown = true;
            activePointerId = e.pointerId;
            lastX = e.clientX;
            lastY = e.clientY;
            // capture pointer so we continue to receive move/up
            try { renderer.domElement.setPointerCapture(activePointerId); } catch (err) { }
        };

        const onPointerMove = (e) => {
            if (!isPointerDown || e.pointerId !== activePointerId) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;

            // Update group rotations for immediate response
            yawGroup.rotation.y += dx * ROTATION_SPEED;
            pitchGroup.rotation.x += dy * ROTATION_SPEED;

            // store velocity for momentum when pointer is released
            velocityY = dx * ROTATION_SPEED; // horizontal drag -> y rotation
            velocityX = dy * ROTATION_SPEED; // vertical drag -> x rotation
        };

        const onPointerUp = (e) => {
            if (!isPointerDown || e.pointerId !== activePointerId) return;
            isPointerDown = false;
            try { renderer.domElement.releasePointerCapture(activePointerId); } catch (err) { }
            activePointerId = null;
        };

        renderer.domElement.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);

        const animate = () => {
            raf = requestAnimationFrame(animate);

            // Always apply a subtle auto-rotation so the sphere moves when idle.
            sphere.rotation.y += AUTO_ROTATION_Y;
            sphere.rotation.x += AUTO_ROTATION_X;

            // Apply momentum when not dragging
            if (!isPointerDown) {
                // apply damping to velocities
                velocityX *= DAMPING;
                velocityY *= DAMPING;

                // if velocities are very small, zero them to avoid micro-rotations
                if (Math.abs(velocityX) < 1e-5) velocityX = 0;
                if (Math.abs(velocityY) < 1e-5) velocityY = 0;

                pitchGroup.rotation.x += velocityX;
                yawGroup.rotation.y += velocityY;
            }

            // Note: we intentionally no longer clamp the pitch here because
            // using nested yaw/pitch groups prevents the horizontal rotation
            // from inverting when the pitch crosses ±90°. If you prefer a
            // soft limit, we can reintroduce a clamp on pitchGroup.rotation.x.

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // remove pointer listeners
            try { renderer.domElement.removeEventListener('pointerdown', onPointerDown); } catch (e) { }
            try { window.removeEventListener('pointermove', onPointerMove); } catch (e) { }
            try { window.removeEventListener('pointerup', onPointerUp); } catch (e) { }
            try { window.removeEventListener('pointercancel', onPointerUp); } catch (e) { }

            cancelAnimationFrame(raf);
            // dispose threejs resources
            if (renderer) {
                try {
                    renderer.dispose();
                } catch (e) { }
            }
            try { geometry.dispose(); } catch (e) { }
            try { material.dispose(); } catch (e) { }
            if (renderer && renderer.domElement && mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="hex-sphere"
        />
    );
}
