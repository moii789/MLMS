import React from "react";
import Item from "./Item/Item";

import classes from "./Items.module.css";

interface ItemsProps {
  itemList: ItemType[];
  toggleItem: ToggleItem;
  handleItemSubmit: HandleItemSubmit;
  showItemsComponent: boolean;
}

const Items: React.FC<ItemsProps> = ({
  itemList,
  toggleItem,
  handleItemSubmit,
  showItemsComponent,
}) => {
  return (
    <div
      className={
        showItemsComponent
          ? classes.MainContainer
          : `${classes.MainContainer} ${classes.hidden}`
      }
    >
      <div className={classes.container}>
        <form>
          <h3>Select all items you used:</h3>
          {itemList.map((ele) => {
            return (
              <Item key={ele.itemName} item={ele} toggleItem={toggleItem} />
            );
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
