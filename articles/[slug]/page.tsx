import type { ReactNode } from "react";
import { Article4DayIcelandBody } from "../4day-iceland";

export function getArticleBody(slug: string): ReactNode | null {
    switch (slug) {
        case "4day-iceland":
            return <Article4DayIcelandBody />;
        default:
            return null;
    }
}

