import React from "react";
import classes from "./Item.module.css";

interface ItemProps {
  item: ItemType;
  toggleItem: ToggleItem;
}

const Item: React.FC<ItemProps> = ({ item, toggleItem }) => {
  return (
    <div
      className={
        item.selected
          ? `${classes.container} ${classes.selected}`
          : classes.container
      }
      onClick={() => toggleItem(item)}
    >
      <h4>{item.itemName}</h4>
    </div>
  );
};

export default Item;
