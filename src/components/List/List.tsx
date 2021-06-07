import { Artist, Track } from "../../types/spotify";
import { ListItem } from "./ListItem";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useAtom } from "jotai";
import { activeArtist } from "../../store/active";

export const List: React.FC<{
  items: Track[] | Artist[];
  minColumnSize?: number;
}> = ({ items, minColumnSize = 150 }) => {
  const [selectedItem, setSelectItem] = useAtom(activeArtist);
  const handleSelectingItem = ({ id, type }) => {
    setSelectItem(
      id === selectedItem.id ? { id: null, type: null } : { id, type }
    );
  };
  return (
    <AnimateSharedLayout>
      <motion.ul
        layout
        className="grid"
        style={{
          listStyle: "none",
          gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnSize}px, .5fr))`,
        }}
      >
        {items?.map((item: Track | Artist, index: number) => (
          <ListItem
            key={item.id}
            item={item}
            selectItem={handleSelectingItem}
            isSelected={item.id === selectedItem.id}
          />
        ))}
      </motion.ul>
    </AnimateSharedLayout>
  );
};
