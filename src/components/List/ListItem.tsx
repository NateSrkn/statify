import { Artist, Track } from "../../types/spotify";
import { motion } from "framer-motion";
import { FC } from "react";
import { Card } from "../Card";
export const ListItem: FC<{
  item: Track | Artist;
  selectItem: Function;

  isSelected: boolean;
}> = ({ item, selectItem, isSelected = false }) => {
  const isTrack = (data): data is Track => data.type === "track";
  const [images = null] = isTrack(item) ? item.album.images : item.images;
  const [artist] = isTrack(item)
    ? item.artists
    : [{ id: item.id, type: item.type }];
  const list = isTrack(item)
    ? item.artists.map(({ name }) => name).join(", ")
    : item.genres.join(", ");
  return (
    <motion.li
      layout
      className="card-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: isSelected ? 1.5 : 1 }}
      exit={{ opacity: 1 }}
      onClick={() => selectItem(artist)}
    >
      <Card title={item.name} image={images?.url} secondaryContent={list} />
    </motion.li>
  );
};
