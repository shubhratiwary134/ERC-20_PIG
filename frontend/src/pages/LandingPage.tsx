import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import * as THREE from "three";

// ─── Three.js Background ────────────────────────────────────
function ThreeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        // ── Particles ──
        const particleCount = 1200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const cyan = new THREE.Color(0x00f0ff);
        const purple = new THREE.Color(0x7b61ff);
        const green = new THREE.Color(0x00ff88);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 80;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

            const pick = Math.random();
            const c = pick < 0.5 ? cyan : pick < 0.8 ? purple : green;
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );
        particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const particleMat = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
        });

        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // ── Wireframe Icosahedron ──
        const icoGeo = new THREE.IcosahedronGeometry(6, 1);
        const icoMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            wireframe: true,
            transparent: true,
            opacity: 0.12,
        });
        const ico = new THREE.Mesh(icoGeo, icoMat);
        scene.add(ico);

        // ── Inner glow sphere ──
        const glowGeo = new THREE.IcosahedronGeometry(5.5, 2);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x7b61ff,
            wireframe: true,
            transparent: true,
            opacity: 0.05,
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        scene.add(glow);

        // ── Torus ring ──
        const torusGeo = new THREE.TorusGeometry(10, 0.08, 16, 100);
        const torusMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.08,
        });
        const torus = new THREE.Mesh(torusGeo, torusMat);
        torus.rotation.x = Math.PI / 3;
        scene.add(torus);

        // ── Mouse tracking ──
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // ── Resize ──
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // ── Animation loop ──
        let frame = 0;
        const animate = () => {
            frame = requestAnimationFrame(animate);

            particles.rotation.y += 0.0003;
            particles.rotation.x += 0.0001;

            ico.rotation.y += 0.003;
            ico.rotation.x += 0.001;

            glow.rotation.y -= 0.002;
            glow.rotation.z += 0.001;

            torus.rotation.z += 0.002;

            // Gentle camera follow
            camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
            camera.position.y += (-mouse.y * 3 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            particleGeo.dispose();
            particleMat.dispose();
            icoGeo.dispose();
            icoMat.dispose();
            glowGeo.dispose();
            glowMat.dispose();
            torusGeo.dispose();
            torusMat.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
        />
    );
}

// ─── Framer Motion Variants ─────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
    }),
};

const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
    }),
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
};

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

// ─── Features Data ──────────────────────────────────────────
const features = [
    {
        icon: "💧",
        title: "Faucet Minting",
        desc: "Claim free tokens daily from our decentralized faucet. Start building your digital portfolio with zero upfront cost.",
    },
    {
        icon: "🏁",
        title: "Pig Racing",
        desc: "Stake your tokens in thrilling on-chain pig races. Compete, win, and multiply your holdings in real time.",
    },
    {
        icon: "🔗",
        title: "On-Chain Ownership",
        desc: "Every token is fully on-chain with transparent smart contracts. True decentralized ownership, no middlemen.",
    },
];

const stats = [
    { value: "10K+", label: "Tokens Minted" },
    { value: "500+", label: "Active Racers" },
    { value: "100%", label: "On-Chain" },
];

// ─── Parallax Section Wrapper ───────────────────────────────
function ParallaxSection({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}

// ─── Landing Page Component ─────────────────────────────────
export default function LandingPage() {
    const navigate = useNavigate();
    const goToApp = () => navigate("/app");

    // Scroll-based hero fade
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
    const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.95]);

    return (
        <>
            <ThreeBackground />

            <div className="relative z-1 overflow-x-hidden scroll-smooth text-white font-inter">
                {/* ── Nav ── */}
                <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-xl bg-black/50 border-b border-white/[0.06]">
                    <span className="font-oxanium text-xl font-extrabold tracking-widest text-white/90">
                        ERC-20 PIG
                    </span>
                    <button
                        onClick={goToApp}
                        className="px-5 py-2.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-white/70 text-sm font-medium tracking-wide
                                   transition-all duration-300
                                   hover:bg-white/[0.1] hover:border-white/[0.2] hover:text-white"
                    >
                        Launch App →
                    </button>
                </nav>

                {/* ── Hero ── */}
                <motion.section
                    ref={heroRef}
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-16"
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex flex-col items-center"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={fadeUp}
                            custom={0}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-white/50 text-xs font-medium tracking-widest uppercase mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live on Sepolia Testnet
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={fadeUp}
                            custom={1}
                            className="font-oxanium text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight mb-6"
                        >
                            Mint Your
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 via-white/50 to-white/80">
                                Digital Assets
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeUp}
                            custom={2}
                            className="text-base text-white/40 max-w-xl leading-relaxed mb-10"
                        >
                            A cutting-edge decentralized platform for minting tokens, racing
                            pigs on-chain, and building your Web3 portfolio, all powered by
                            transparent smart contracts.
                        </motion.p>

                        {/* CTA Button — Dark Minimal */}
                        <motion.button
                            variants={fadeUp}
                            custom={3}
                            onClick={goToApp}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl
                                       bg-white/[0.07] border border-white/[0.12]
                                       text-white/80 font-semibold text-sm tracking-wide
                                       backdrop-blur-sm
                                       transition-all duration-300
                                       hover:bg-white/[0.12] hover:border-white/[0.22] hover:text-white
                                       hover:shadow-[0_8px_32px_rgba(255,255,255,0.06)]"
                        >
                            Enter the Platform
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.section>

                {/* ── Divider Line ── */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="mx-auto w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent origin-center"
                />

                {/* ── Features ── */}
                <ParallaxSection className="py-24 px-6 max-w-6xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3"
                    >
                        Why Choose PIG
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-center font-oxanium text-[clamp(1.6rem,4vw,2.5rem)] font-bold text-white/90 mb-16"
                    >
                        Built for the next era of digital finance
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                variants={slideFromLeft}
                                custom={i}
                                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                className="group relative p-8 rounded-2xl
                                           bg-white/[0.02] border border-white/[0.06]
                                           backdrop-blur-sm
                                           transition-all duration-400
                                           hover:bg-white/[0.04] hover:border-white/[0.12]"
                            >
                                {/* Top accent line */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-xl bg-white/[0.04] border border-white/[0.08]">
                                    {f.icon}
                                </div>
                                <h3 className="font-oxanium text-lg font-bold text-white/85 mb-2">
                                    {f.title}
                                </h3>
                                <p className="text-sm text-white/35 leading-relaxed">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </ParallaxSection>

                {/* ── Stats ── */}
                <motion.section
                    className="py-16 px-6 max-w-4xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                variants={scaleIn}
                                custom={i}
                                className="text-center py-10 px-6 rounded-2xl
                                           bg-white/[0.02] border border-white/[0.05]
                                           transition-all duration-300
                                           hover:border-white/[0.1]"
                            >
                                <div className="font-oxanium text-3xl font-extrabold text-white/80 mb-2">
                                    {s.value}
                                </div>
                                <div className="text-xs text-white/30 uppercase tracking-[0.15em] font-medium">
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* ── Divider Line ── */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="mx-auto w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent origin-center"
                />

                {/* ── Final CTA ── */}
                <section className="relative py-28 px-6 text-center overflow-hidden">
                    {/* Subtle radial glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-3xl pointer-events-none" />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={staggerContainer}
                        className="relative z-10"
                    >
                        <motion.h2
                            variants={fadeUp}
                            custom={0}
                            className="font-oxanium text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white/90 mb-4"
                        >
                            Ready to start minting?
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            custom={1}
                            className="text-white/35 text-base max-w-md mx-auto mb-10"
                        >
                            Join the decentralized revolution. Claim tokens, race pigs, and
                            own your assets on-chain.
                        </motion.p>
                        <motion.button
                            variants={fadeUp}
                            custom={2}
                            onClick={goToApp}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl
                                       bg-white/[0.07] border border-white/[0.12]
                                       text-white/80 font-semibold text-sm tracking-wide
                                       backdrop-blur-sm
                                       transition-all duration-300
                                       hover:bg-white/[0.12] hover:border-white/[0.22] hover:text-white
                                       hover:shadow-[0_8px_32px_rgba(255,255,255,0.06)]"
                        >
                            Launch App
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </motion.button>
                    </motion.div>
                </section>

                {/* ── Footer ── */}
                <motion.footer
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="py-6 px-8 border-t border-white/[0.04] text-center text-white/20 text-xs tracking-wide"
                >
                    © 2026 PIG Protocol · Built on Ethereum
                </motion.footer>
            </div>
        </>
    );
}
