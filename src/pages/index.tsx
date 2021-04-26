import React, { useState } from "react";
import Head from "next/head";
import { getSession, signIn, useSession, signOut } from "next-auth/client";

import { useTopItems } from "../hooks/useTopItems";

import { useCurrentlyPlaying } from "../hooks/useCurrentlyPlaying";
import { getNowPlaying } from "./api/playing";
import { getTopItems } from "./api/top";
import { Session } from "next-auth";
import { MouseFollower } from "../components/MouseFollower";
import { Layout } from "../components/layout/Layout";
import { LandingPage } from "../components/LandingPage";
import { List } from "../components/List/List";
export default function Home({
  session: serverSession,
  nowPlaying,
  topTracks,
  topArtists,
}) {
  const [termLength, setTermLength] = useState("short_term");
  const [activeType, setActiveType] = useState("tracks");
  const [session, isLoading] = useSession();
  const [
    { data: tracksShort },
    { data: tracksMid },
    { data: tracksLong },
  ] = useTopItems("tracks", topTracks);
  const [
    { data: artistsShort },
    { data: artistsMid },
    { data: artistsLong },
  ] = useTopItems("artists", topArtists);

  // const { data: currentlyPlaying } = useCurrentlyPlaying(nowPlaying);
  const display = {
    tracks: {
      short_term: tracksShort,
      medium_term: tracksMid,
      long_term: tracksLong,
    },
    artists: {
      short_term: artistsShort,
      medium_term: artistsMid,
      long_term: artistsLong,
    },
  };

  const types = {
    tracks: "Tracks",
    artists: "Artists",
  };

  const termTitles = {
    short_term: "Last Month",
    medium_term: "Last 6 Months",
    long_term: "All Time",
  };

  if (!serverSession) {
    return <LandingPage />;
  }
  if (isLoading) return null;
  return (
    <Layout>
      <Head>
        <title>Statify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session && (
        <div className="user-wrapper">
          <div className="user-data">
            <div>
              <div>
                {Object.entries(termTitles).map(([key, value]) => (
                  <button onClick={() => setTermLength(key)}>{value}</button>
                ))}
                {Object.entries(types).map(([key, value]) => (
                  <button onClick={() => setActiveType(key)}>{value}</button>
                ))}
              </div>
            </div>
            <div>
              <button onClick={() => signOut()}>Sign Out</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: 15 }}>
        <h3>
          Top {types[activeType]} / {termTitles[termLength]}
        </h3>
        <List items={display[activeType][termLength].items} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session: Session = await getSession({ req });
  if (!session) {
    return {
      props: {
        session: null,
        topTracks: [{}, {}, {}],
        topArtists: [{}, {}, {}],
        recentlyPlayed: {},
        nowPlaying: null,
      },
    };
  }
  // const nowPlaying = await getNowPlaying(session);
  const topTracks = await Promise.all([
    getTopItems({ type: "tracks", time_range: "short_term" }, session),
    getTopItems({ type: "tracks", time_range: "medium_term" }, session),
    getTopItems({ type: "tracks", time_range: "long_term" }, session),
  ]);
  const topArtists = await Promise.all([
    getTopItems({ type: "artists", time_range: "short_term" }, session),
    getTopItems({ type: "artists", time_range: "medium_term" }, session),
    getTopItems({ type: "artists", time_range: "long_term" }, session),
  ]);
  return {
    props: {
      session,
      // nowPlaying,
      topTracks,
      topArtists,
    },
  };
}
