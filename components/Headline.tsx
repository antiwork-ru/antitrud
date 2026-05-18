'use client';

import { motion } from 'framer-motion';


export default function Headline() {
    return (
        <div className='bg-[color:var(--surface) '>
            <section className=" flex flex-col gap-2 [word-spacing:-0.2em] w-full max-w-[75rem] mx-auto py-0 px-0 font-bold leading-[1.05] tracking-[-0.03em] text-neutral-950 ">
                {/* Первая фраза - слева */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[clamp(2rem,5vw,3.75rem)] text-center md:text-left md:self-start w-full md:w-auto"
                >
                    Размышляем,
                </motion.div>

                {/* Вторая фраза - центр */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[clamp(2rem,5vw,3.75rem)] self-center text-center"
                >

                    <span className="text-[color:var(--accent)]  decoration-2 underline-offset-8">
                        что{" "} не так с работой
                    </span>
                </motion.div>

                {/* Третья фраза - справа */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    // По умолчанию: w-full (на всю ширину), text-center (текст по центру), self-center (блок по центру)
                    // На десктопе (md): w-auto, text-right (текст вправо), self-end (блок в конец)
                    className="text-[clamp(2rem,5vw,3.75rem)] w-full md:w-auto self-center md:self-end text-center md:text-right"
                >
                    <span className="hidden md:inline">—</span> и что нам с этим делать
                </motion.div>

            </section></div>
    );
}