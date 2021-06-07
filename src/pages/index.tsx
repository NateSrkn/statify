import React, { useState } from "react";
import Head from "next/head";
import { getSession, signOut } from "next-auth/client";
import { useTopItems } from "../hooks/useTopItems";
import { getTopItems } from "./api/top";
import { Session } from "next-auth";
import { Layout } from "../components/layout/Layout";
import { LandingPage } from "../components/LandingPage";
import { useAtom } from "jotai";
import { activeArtist } from "../store/active";
import { motion } from "framer-motion";
import { useArtist } from "../hooks/useArtist";
import { ActiveArtistCard } from "../components/ActiveArtistCard";
import Row from "../components/Row";
import { Track, Artist } from "../types/spotify";
import ClickableText from "../components/ClickableText";
import { List } from "../components/List/List";

export default function Home({ session: serverSession, topTracks }) {
  const isTrack = (data: Track | Artist): data is Track =>
    data.type === "track";
  const [tracksShort, tracksMid, tracksLong] = topTracks;
  const [options, setOptions] = useState({
    term_length: "short_term",
    type: "tracks",
  });
  const [currentArtist, selectArtist] = useAtom(activeArtist);

  const [
    { data: artistsShort },
    { data: artistsMid },
    { data: artistsLong },
  ] = useTopItems("artists", serverSession);
  const {
    data: { data: { data: artist } } = { data: { data: { id: null } } },
  } = useArtist(currentArtist.id);
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

  const handleSetOptions = (name: "term_length" | "type", value: string) => {
    if (options[name] === value) return;
    setOptions({ ...options, [name]: value });
  };

  return (
    <Layout>
      <Head>
        <title>Statify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="user-wrapper">
        <div className="user-data">
          <div>
            <div>
              {Object.entries(termTitles).map(([key, value]) => (
                <button
                  onClick={() => handleSetOptions("term_length", key)}
                  key={key}
                >
                  {value}
                </button>
              ))}
              {Object.entries(types).map(([key, value]) => (
                <button onClick={() => handleSetOptions("type", key)} key={key}>
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        </div>
      </div>

      <ActiveArtistCard artist={artist} />
      <motion.section
        layout
        aria-label={`Top ${types[options.type]} / ${
          termTitles[options.term_length]
        }`}
      >
        <motion.h3 layout style={{ margin: "15px 0" }}>
          Top {types[options.type]} / {termTitles[options.term_length]}
        </motion.h3>

        {/* <List items={display[options.type][options.term_length].items} /> */}

        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          }}
        >
          {display[options.type][options.term_length]?.items &&
            display[options.type][options.term_length].items.map(
              (item: Track | Artist) => {
                const { name } = item;
                const [image] = isTrack(item) ? item.album.images : item.images;
                const secondary = isTrack(item)
                  ? item.artists.map((artist, index) => (
                      <ClickableText
                        content={artist.name}
                        separator={
                          index !== item.artists.length - 1 ? ", " : ""
                        }
                        key={artist.id}
                        clickHandler={() => selectArtist(artist)}
                      />
                    ))
                  : item.genres.join(", ");
                const clickHandler = isTrack(item)
                  ? null
                  : () => selectArtist(item);
                return (
                  <Row
                    image={image.url}
                    title={name}
                    secondary={secondary}
                    clickHandler={clickHandler}
                    key={item.id}
                  />
                );
              }
            )}
        </motion.div>
      </motion.section>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const session: Session = await getSession({ req });
  if (!session) {
    return {
      props: {
        session: null,
        topTracks: [{}, {}, {}],
      },
    };
  }
  const topTracks = await Promise.all([
    getTopItems({ type: "tracks", time_range: "short_term" }, session),
    getTopItems({ type: "tracks", time_range: "medium_term" }, session),
    getTopItems({ type: "tracks", time_range: "long_term" }, session),
  ]);

  return {
    props: {
      session,
      topTracks,
    },
  };
}
