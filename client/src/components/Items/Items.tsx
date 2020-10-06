import React from "react";
import Item from "./Item/Item";

import classes from "./Items.module.css";

interface ItemsProps {
  itemList: ItemType[];
  toggleItem: ToggleItem;
  handleItemSubmit: HandleItemSubmit;
}

const Items: React.FC<ItemsProps> = ({
  itemList,
  toggleItem,
  handleItemSubmit,
}) => {
  return (
    <div className={classes.MainContainer}>
      <div className={classes.container}>
        <form>
          <h3>Select all items you used:</h3>
          {itemList.map((ele) => {
            console.log(ele);
            return <Item key={ele.itemID} item={ele} toggleItem={toggleItem} />;
          })}
          <button type="submit" onClick={handleItemSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Items;
