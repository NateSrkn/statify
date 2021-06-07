import { useAtom } from "jotai";
import { activeArtist } from "../../store/active";
import { Album, Artist, Track } from "../../types/spotify";
import ClickableText from "../ClickableText";
import { ArtistImage, Bubble, CardContainer, CardContents } from "./styles";
import Image from "next/image";
import Row from "../Row";
export const ActiveArtistCard = ({ artist }) => {
  const [, selectArtist] = useAtom(activeArtist);
  console.log(artist);
  if (!artist.id) return null;
  return (
    <CardContainer>
      <CardContents>
        <ArtistImage>
          {artist.images[0]?.url && (
            <Image
              src={artist.images[0]?.url}
              alt={artist.name}
              height={150}
              width={150}
            />
          )}
        </ArtistImage>

        <h3 style={{ fontSize: "clamp(24px, 2vw, 36px)" }}>{artist.name}</h3>

        <div>
          {artist.tracks.length !== 0 && (
            <section
              aria-label="Tracks"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h4 style={{ margin: "10px 0" }}>Tracks</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: 5,
                }}
              >
                {artist.tracks.map((track: Track) => (
                  <Row
                    key={track.id}
                    title={track.name}
                    image={track.album.images[0]?.url}
                    size={35}
                    secondary={track.album.artists.map((artist, index) => (
                      <ClickableText
                        content={artist.name}
                        separator={
                          index !== track.album.artists.length - 1 ? ", " : ""
                        }
                        clickHandler={() => selectArtist(artist)}
                      />
                    ))}
                  />
                ))}
              </div>
            </section>
          )}
          {artist.albums.items.length !== 0 && (
            <section
              aria-label="Albums"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h4 style={{ margin: "10px 0" }}>Albums</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: 5,
                }}
              >
                {artist.albums.items.map((album: Album) => (
                  <Row
                    key={album.id}
                    title={album.name}
                    image={album.images[0]?.url}
                    size={35}
                    secondary={album.artists.map((artist, index) => (
                      <ClickableText
                        content={artist.name}
                        separator={
                          index !== album.artists.length - 1 ? ", " : ""
                        }
                        clickHandler={() => selectArtist(artist)}
                      />
                    ))}
                  />
                ))}
              </div>
            </section>
          )}
          {artist.related_artists.length !== 0 && (
            <section aria-label="Related Artists">
              <h4 style={{ margin: "10px 0" }}>Related Artists</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {artist.related_artists.map((related: Artist) => (
                  <Bubble key={related.id + artist.id}>
                    <ClickableText
                      content={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          {related.images[0]?.url && (
                            <ArtistImage height="25px" width="25px">
                              <Image
                                src={related.images[0]?.url || null}
                                height={25}
                                width={25}
                              />
                            </ArtistImage>
                          )}
                          <span>{related.name}</span>
                        </div>
                      }
                      clickHandler={() => selectArtist(related)}
                    />
                  </Bubble>
                ))}
              </div>
            </section>
          )}
        </div>
      </CardContents>
    </CardContainer>
  );
};
