"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { Container } from "../../components/Container";

const questions = [
    {
        id: 1,
        text: "Когда вы ничего не делаете в выходной день, вы чувствуете…",
        options: [
            { text: "Заслуженный отдых. Я работал(а), я имею право.", score: 0 },
            { text: "Лёгкую тревогу. Надо бы чем-нибудь заняться.", score: 1 },
            { text: "Вину. Столько всего можно было сделать.", score: 2 },
            { text: "Физически больно. Я уже открыл(а) рабочую почту.", score: 3 },
        ],
    },
    {
        id: 2,
        text: "Как вы отвечаете на вопрос «Кто вы?»",
        options: [
            { text: "Рассказываю про хобби, близких, что меня интересует.", score: 0 },
            { text: "Упоминаю работу в конце как один из пунктов.", score: 1 },
            { text: "«Я работаю в…» – и дальше про карьеру.", score: 2 },
            { text: "Я и есть моя должность. Иначе кто я вообще?", score: 3 },
        ],
    },
    {
        id: 3,
        text: "Коллега берёт отгул «просто потому что устал». Ваша реакция?",
        options: [
            { text: "Понимаю. Усталость – достаточная причина.", score: 0 },
            { text: "Нейтрально. Его право, меня не касается.", score: 1 },
            { text: "Немного завидую и немного осуждаю одновременно.", score: 2 },
            { text: "Безответственность. Так нельзя.", score: 3 },
        ],
    },
    {
        id: 4,
        text: "Вы в отпуске. Приходит рабочее сообщение. Вы…",
        options: [
            { text: "Отвечу, когда вернусь. Я в отпуске.", score: 0 },
            { text: "Прочитаю, но отвечу завтра.", score: 1 },
            { text: "Отвечу сейчас – вдруг что-то срочное.", score: 2 },
            { text: "Я и так периодически проверяю почту. Это нормально.", score: 3 },
        ],
    },
    {
        id: 5,
        text: "Что вы думаете о людях, которые работают меньше, но зарабатывают столько же?",
        options: [
            { text: "Молодцы. Нашли хороший баланс.", score: 0 },
            { text: "Завидую, хочу так же.", score: 1 },
            { text: "Что-то здесь нечестно. Надо же отрабатывать.", score: 2 },
            { text: "Лентяи. Настоящий результат требует усилий.", score: 3 },
        ],
    },
    {
        id: 6,
        text: "«Я отдыхаю, только когда заслужу» – это про вас?",
        options: [
            { text: "Нет. Отдых не надо заслуживать.", score: 0 },
            { text: "Иногда так думаю, но стараюсь с этим бороться.", score: 1 },
            { text: "В общем, да. Лень – это порок.", score: 2 },
            { text: "Конечно. Иначе какой смысл отдыхать?", score: 3 },
        ],
    },
    {
        id: 7,
        text: "Что вы чувствуете, когда кто-то живёт на базовый доход или пособие и не ищет работу?",
        options: [
            { text: "Ничего особенного. Каждый живёт как хочет.", score: 0 },
            { text: "Удивление – я бы так не смог(ла).", score: 1 },
            { text: "Раздражение. Общество так не работает.", score: 2 },
            { text: "Это паразитизм. Все должны работать.", score: 3 },
        ],
    },
    {
        id: 8,
        text: "Как вы относитесь к фразе «работа облагораживает человека»?",
        options: [
            { text: "Пропаганда.", score: 0 },
            { text: "Есть доля правды, но это сильно преувеличено.", score: 1 },
            { text: "Согласен(а). Труд формирует характер.", score: 2 },
            { text: "Святая истина. Безделье развращает.", score: 3 },
        ],
    },
];

const results = [
    {
        range: [0, 0],
        title: "Вы свободны",
        emoji: "⛓️‍💥",
        color: "text-blue-700",
        bg: "bg-white border-white",
        text: "Вы – истинный антиворкист! Не думал, что я вас здесь встречу.",
    },

    {
        range: [1, 6],
        title: "Вы практически свободны",
        emoji: "🌿",
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-200",
        text: "Трудовая этика почти не добралась до вас. Вы осознаёте . Берегите себя.",
    },
    {
        range: [7, 12],
        title: "Лёгкое заражение",
        emoji: "🌡",
        color: "text-sky-700",
        bg: "bg-sky-50 border-sky-200",
        text: "Трудовая этика пустила корни, но вы ещё сопротивляетесь. Иногда вы чувствуете вину за отдых, но умеете ей отказать. Хороший знак.",
    },
    {
        range: [13, 18],
        title: "Средняя степень поражения",
        emoji: "⚠️",
        color: "text-amber-700",
        bg: "bg-amber-50 border-amber-200",
        text: "Продуктивность стала вашей валютой самооценки. Отдых ощущается как проступок, а чужая лень – как личная обида. Есть над чем поработать (в хорошем смысле).",
    },
    {
        range: [19, 23],
        title: "Глубокое поражение",
        emoji: "🔥",
        color: "text-red-700",
        bg: "bg-red-50 border-red-200",
        text: "Трудовая этика полностью встроилась в вашу идентичность. Вы – ваша должность, ваши достижения, ваши рабочие часы. Это не характер – это симптом. Возможно, пришло время прочитать что-нибудь из нашей библиотеки.",
    },

    {
        range: [24, 24],
        title: "Вы погибли.",
        emoji: "💀",
        color: "text-black",
        bg: "bg-black-500 border-black-1000",
        text: "К сожалению, вас уже не спасти. Вы можете попытаться, но даже мы не в силах вам помочь. Покойтесь с работой.",
    },
];

function getResult(score: number) {
    return results.find((r) => score >= r.range[0] && score <= r.range[1]) ?? results[3];
}

export default function QuizPage() {
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [done, setDone] = useState(false);

    const totalScore = answers.reduce((a, b) => a + b, 0);
    const result = getResult(totalScore);
    const progress = ((current) / questions.length) * 100;

    function handleSelect(score: number) {
        setSelected(score);
    }

    function handleNext() {
        if (selected === null) return;
        const next = [...answers, selected];
        setAnswers(next);
        setSelected(null);
        if (current + 1 >= questions.length) {
            setDone(true);
        } else {
            setCurrent((c) => c + 1);
        }
    }

    function handleRestart() {
        setCurrent(0);
        setAnswers([]);
        setSelected(null);
        setDone(false);
    }

    const q = questions[current];

    return (
        <div className="flex min-h-full flex-col bg-[color:var(--surface)]">
            <SiteHeader />
            <main className="flex-1 py-5 sm:py-6">
                <Container>
                    <div className="mx-auto max-w-[600px]">

                        {/* Back */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors mb-8"
                        >
                            ← На главную
                        </Link>

                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase">
                                    Тест
                                </span>
                                <span className="h-px w-6 bg-neutral-200" />
                            </div>
                            <h1 className="text-[clamp(1.5rem,4vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-neutral-950 mb-3">
                                Насколько трудовая этика{" "}
                                <em className="not-italic text-[color:var(--accent)]">
                                    отравила вам душу?
                                </em>
                            </h1>
                            <p className="text-[14px] text-neutral-500 font-light leading-relaxed">
                                8 вопросов. Без правильных ответов. Только честный диагноз.
                            </p>
                        </div>

                        {!done ? (
                            <div className="rounded-2xl border border-[color:var(--border)] bg-white overflow-hidden">
                                {/* Progress bar */}
                                <div className="h-1 bg-neutral-100">
                                    <div
                                        className="h-full bg-[color:var(--accent)] transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <div className="p-6 sm:p-8">
                                    {/* Counter */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="font-mono text-[11px] text-neutral-400">
                                            Вопрос {current + 1} из {questions.length}
                                        </span>
                                        <div className="flex gap-1">
                                            {questions.map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`h-1.5 w-4 rounded-full transition-colors ${i < current
                                                        ? "bg-[color:var(--accent)]"
                                                        : i === current
                                                            ? "bg-neutral-300"
                                                            : "bg-neutral-100"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question */}
                                    <p className="text-[17px] font-semibold leading-snug tracking-tight text-neutral-950 mb-6">
                                        {q.text}
                                    </p>

                                    {/* Options */}
                                    <div className="flex flex-col gap-2.5 mb-8">
                                        {q.options.map((opt, i) => {
                                            const isSelected = selected === opt.score;
                                            return (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => handleSelect(opt.score)}
                                                    className={`w-full text-left rounded-xl border px-4 py-3.5 text-[14px] leading-snug transition-all ${isSelected
                                                        ? "border-[color:var(--accent)] bg-[color:var(--accent-subtle)] text-neutral-900 font-medium"
                                                        : "border-[color:var(--border)] text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                                                        }`}
                                                >
                                                    <span className="font-mono text-[11px] text-neutral-400 mr-2">
                                                        {String.fromCharCode(65 + i)}.
                                                    </span>
                                                    {opt.text}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Next button */}
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={selected === null}
                                        className="w-full rounded-xl bg-[color:var(--foreground)] py-3 font-mono text-[12px] font-medium text-white transition-all hover:bg-[color:var(--accent)] disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        {current + 1 === questions.length ? "Получить результат →" : "Следующий вопрос →"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Result */
                            <div className="rounded-2xl border border-[color:var(--border)] bg-white overflow-hidden">
                                <div className="h-1 bg-[color:var(--accent)]" />
                                <div className="p-6 sm:p-8">
                                    <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-[0.1em] mb-4">
                                        Ваш результат
                                    </p>

                                    <div className={`rounded-xl border p-5 mb-6 ${result.bg}`}>
                                        <div className="text-3xl mb-3">{result.emoji}</div>
                                        <h2 className={`text-[20px] font-bold tracking-tight mb-2 ${result.color}`}>
                                            {result.title}
                                        </h2>
                                        <p className="text-[14px] leading-relaxed text-neutral-700">
                                            {result.text}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mb-6 px-1">
                                        <span className="font-mono text-[11px] text-neutral-400">
                                            Баллов: {totalScore} из {questions.length * 3}
                                        </span>
                                        <div className="h-2 w-40 rounded-full bg-neutral-100 overflow-hidden">
                                            <div
                                                className="h-full bg-[color:var(--accent)] rounded-full"
                                                style={{ width: `${(totalScore / (questions.length * 3)) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link
                                            href="/articles"
                                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--foreground)] px-5 py-3 font-mono text-[12px] font-medium text-white hover:bg-[color:var(--accent)] transition-colors"
                                        >
                                            Читать статьи →
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleRestart}
                                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] px-5 py-3 font-mono text-[12px] text-neutral-600 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
                                        >
                                            Пройти снова
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </main>
            <SiteFooter />
        </div>
    );
}
