import { Artist, Track } from "../../types/spotify";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";
export const ListItem: React.FC<{
  item: Track | Artist;
  selectItem: Function;
  isSelected: boolean;
}> = ({ item, selectItem, isSelected }) => {
  const isTrack = (data): data is Track => data.type === "track";
  return (
    <motion.li layout style={{ padding: "10px 0" }}>
      <motion.div
        layout
        className="tk-new-spirit"
        style={{ fontSize: "calc(18px + 0.9vw)" }}
        onClick={() => selectItem(item.id)}
      >
        {item.name}
      </motion.div>
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {isTrack(item)
          ? item.artists.map(({ name }) => name).join(", ")
          : item.genres.join(", ")}
      </motion.div>

      {/* <AnimatePresence>
        {isSelected && isTrack(item) && (
          <motion.div layout>
            <Image
              src={item.album.images[0].url}
              height={item.album.images[0].height / 4}
              width={item.album.images[0].width / 4}
            />
          </motion.div>
        )}
      </AnimatePresence> */}
    </motion.li>
  );
};
