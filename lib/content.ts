/** Editorial adapter (Sanity in production). */
import { bathroom, crafts, drops, girls, playlists, stories } from "./data/world";

export const getDrops = () => drops;
export const getDrop = (slug: string) => drops.find((d) => d.slug === slug);
export const getLiveDrop = () => drops.find((d) => d.status === "live") ?? drops[0]!;
export const getUpcomingDrop = () => drops.find((d) => d.status === "upcoming");

export const getCrafts = () => crafts;
export const getCraft = (slug: string) => crafts.find((c) => c.slug === slug);

export const getGirls = () => girls;
export const getGirl = (slug: string) => girls.find((g) => g.slug === slug);

export const getBathroom = () => bathroom;
export const getPlaylists = () => playlists;
export const getPlaylist = (slug: string) => playlists.find((p) => p.slug === slug);
export const getStories = () => stories;
