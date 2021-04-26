import { Artist, Track } from "../../types/spotify";
import { ListItem } from "./ListItem";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useState } from "react";
export const List: React.FC<{ items: Track[] | Artist[] }> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectingItem = (id: number) => {
    setSelectedItem(id === selectedItem ? null : id);
  };
  return (
    <AnimateSharedLayout>
      <motion.ul layout style={{ listStyle: "none" }}>
        {items.map((item: Track | Artist) => (
          <ListItem
            key={item.id}
            item={item}
            isSelected={selectedItem === item.id}
            selectItem={handleSelectingItem}
          />
        ))}
      </motion.ul>
    </AnimateSharedLayout>
  );
};
