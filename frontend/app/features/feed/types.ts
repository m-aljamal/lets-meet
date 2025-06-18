import type { Experience } from "@lets-meet/server/types";

export type ExperienceForFeed =  Experience & {
    commentsCount: number
}