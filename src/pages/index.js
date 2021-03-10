import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getSession, signIn, useSession, signOut } from "next-auth/client";
import Image from "next/image";
import { useTopItems } from "../hooks/useTopItems";

import { useCurrentlyPlaying } from "../hooks/useCurrentlyPlaying";
import { useRecentlyPlayed } from "../hooks/useRecentlyPlayed";
import { Table } from "../components/Table/index";
import { getNowPlaying } from "./api/playing";
// import { getRecentlyPlayed } from "./api/recent";
import { getTopItems } from "./api/top";
import tw, { styled } from "twin.macro";

const Button = tw.button`text-white border-0 bg-green-400 p-2 rounded-full`;
const TableNumber = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 18px;
  color: var(--off-black);
  padding: 0 0 0 1.5rem;
`;
export default function Home({
  session: serverSession,
  nowPlaying,
  // recentlyPlayed,
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
  // const { data: recentTracks } = useRecentlyPlayed(recentlyPlayed);

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
        <Button onClick={() => signIn("spotify")}>Sign In</Button>
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

      <main tw="max-w-screen-2xl mx-auto">
        {session && (
          <div tw="flex items-center">
            <Image height={175} width={175} src={session.user.image} />
            <div className="user-wrapper" tw="flex">
              <div className="user-data" tw="m-4 flex-1">
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
                <div tw="py-2 flex flex-col">
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
                <div tw="my-4">
                  <Button onClick={() => signOut()}>Sign Out</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div tw="min-w-full grid grid-cols-1 md:grid-cols-2">
          <Table tableHeader={"Top Tracks"}>
            <h3 tw="py-4">Top Tracks</h3>
            {tracks[termLength].items?.map(
              ({ name, album, artists }, index) => (
                <tr key={name + index} tw="flex">
                  <TableNumber>{index + 1}</TableNumber>
                  <td tw="px-6 py-6">
                    <Image
                      width={album.images[1].width / 4}
                      height={album.images[1].height / 4}
                      src={album.images[1].url}
                    />
                  </td>
                  <td tw="py-6 m-4">
                    <div className="row-main-content">{name}</div>
                    <div className="row-secondary-content">
                      {artists.map(({ name }) => name).join(", ")}
                    </div>
                  </td>
                </tr>
              )
            )}
          </Table>
          <Table tableHeader={"Top Artists"}>
            <h3 tw="py-4">Top Artists</h3>
            {artists[termLength].items?.map(
              ({ name, images, genres }, index) => (
                <tr key={name + index} tw="flex">
                  <TableNumber>{index + 1}</TableNumber>
                  <td tw="px-6 py-6">
                    <Image
                      width={images[1].width / 4}
                      height={images[1].height / 4}
                      src={images[1].url}
                    />
                  </td>
                  <td tw="py-6 m-4">
                    <div className="row-main-content">{name}</div>
                    <div className="row-secondary-content">
                      {genres.join(", ")}
                    </div>
                  </td>
                </tr>
              )
            )}
          </Table>
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
