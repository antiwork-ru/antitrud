import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

const requests = new Map();

function isRateLimited(ip: string) {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 минута
    const limit = 10;

    const data = requests.get(ip) || [];

    const filtered = data.filter((t: number) => now - t < windowMs);

    if (filtered.length >= limit) return true;

    filtered.push(now);
    requests.set(ip, filtered);

    return false;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const session_id = body.session_id;

        if (!session_id) {
            return NextResponse.json(
                { error: "Missing session_id" },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from("quiz_results")
            .insert([
                {
                    score: body.score,
                    answers: body.answers,
                    session_id: session_id,
                },
            ]);

        if (error) {
            // если уже отправлял
            if (error.code === "23505") {
                return NextResponse.json(
                    { error: "Quiz already submitted" },
                    { status: 409 }
                );
            }

            console.error(error);

            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

