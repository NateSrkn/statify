import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getSession, signIn, useSession, signOut } from "next-auth/client";
import Image from "next/image";
import { useTopItems } from "../hooks/useTopItems";

import { useCurrentlyPlaying } from "../hooks/useCurrentlyPlaying";
import { getNowPlaying } from "./api/playing";
import { getTopItems } from "./api/top";

export default function Home({
  session: serverSession,
  nowPlaying,
  topTracks,
  topArtists,
}) {
  const [termLength, setTermLength] = useState("short_term");

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

  const { data: currentlyPlaying } = useCurrentlyPlaying(nowPlaying);

  const tracks = {
    short_term: tracksShort,
    medium_term: tracksMid,
    long_term: tracksLong,
  };
  const artists = {
    short_term: artistsShort,
    medium_term: artistsMid,
    long_term: artistsLong,
  };

  const termTitles = {
    short_term: "Last Month",
    medium_term: "Last 6 Months",
    long_term: "All Time",
  };

  if (!serverSession) {
    return (
      <div className={styles.container}>
        <button onClick={() => signIn("spotify")}>Sign In</button>
      </div>
    );
  }
  if (isLoading) return null;
  return (
    <div>
      <Head>
        <title>
          Statify
          {currentlyPlaying.song
            ? ` | ${currentlyPlaying.song} - ${currentlyPlaying.artists
                .map(({ name }) => name)
                .join(",")}`
            : ""}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {session && (
          <div>
            <Image height={175} width={175} src={session.user.image} />
            <div className="user-wrapper">
              <div className="user-data">
                <h1>{session.user.name}</h1>
                {currentlyPlaying.song && (
                  <React.Fragment>
                    <div className="main-content">{currentlyPlaying.song}</div>
                    <div className="secondary-content">
                      {currentlyPlaying.artists
                        .map(({ name }) => name)
                        .join(",")}
                    </div>
                  </React.Fragment>
                )}
                <div>
                  <div>{termTitles[termLength]}</div>
                  <div>
                    <button onClick={() => setTermLength("short_term")}>
                      Last Month
                    </button>
                    <button onClick={() => setTermLength("medium_term")}>
                      6 Months
                    </button>
                    <button onClick={() => setTermLength("long_term")}>
                      All Time
                    </button>
                  </div>
                </div>
                <div>
                  <button onClick={() => signOut()}>Sign Out</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <h3>Top Tracks</h3>
          {tracks[termLength].items?.map(({ name, album, artists }, index) => (
            <tr key={name + index}>
              <div>{index + 1}</div>
              <td>
                <Image
                  width={album.images[1].width / 4}
                  height={album.images[1].height / 4}
                  src={album.images[1].url}
                />
              </td>
              <td>
                <div className="row-main-content">{name}</div>
                <div className="row-secondary-content">
                  {artists.map(({ name }) => name).join(", ")}
                </div>
              </td>
            </tr>
          ))}

          <h3>Top Artists</h3>
          {artists[termLength].items?.map(({ name, images, genres }, index) => (
            <tr key={name + index}>
              <div>{index + 1}</div>
              <td>
                <Image
                  width={images[1].width / 4}
                  height={images[1].height / 4}
                  src={images[1].url}
                />
              </td>
              <td>
                <div className="row-main-content">{name}</div>
                <div className="row-secondary-content">{genres.join(", ")}</div>
              </td>
            </tr>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
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
  const nowPlaying = await getNowPlaying(session);
  // const recentlyPlayed = await getRecentlyPlayed(session);
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
      nowPlaying,
      // recentlyPlayed,
      topTracks,
      topArtists,
    },
  };
}
