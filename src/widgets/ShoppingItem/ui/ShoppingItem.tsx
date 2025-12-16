import type { ShoppingItem } from "../../../entities/model/types";
import type { FC } from "react";
import styles from "./ShoppingItem.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../shared/providers/store/hooks";
import {
  toggleItemBought,
  removeItemById,
} from "../../../entities/model/slice";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type ItemHandler = (itemId: string) => void;

interface ShoppingItemProps {
  item: ShoppingItem;
  onToggle?: ItemHandler;
  onRemove?: ItemHandler;
}

const ShoppingItemCard: FC<ShoppingItemProps> = ({
  item,
  onToggle,
  onRemove,
}) => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    if (onToggle) {
      onToggle(item.id);
    } else {
      dispatch(toggleItemBought({ id: item.id }));
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(item.id);
    } else {
      dispatch(removeItemById({ id: item.id }));
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 1 }}>
      <ListItem
        disableGutters
        secondaryAction={
          <IconButton
            edge="end"
            aria-label={`remove-${item.id}`}
            onClick={handleRemove}
            className={styles.remove}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <Checkbox
          edge="start"
          checked={item.bought}
          onChange={handleToggle}
          slotProps={{ input: { "aria-label": `toggle-${item.id}` } }}
          className={styles.checkbox}
        />

        <ListItemText
          primary={
            <div className={item.bought ? styles.titleBought : styles.title}>
              <Link
                to={`/item/${item.id}`}
                aria-label={`open-${item.id}`}
                className={styles.titleLink}
              >
                {item.title}
              </Link>
            </div>
          }
          secondary={
            item.quantity != null && item.quantity > 0
              ? `×${item.quantity}`
              : undefined
          }
        />
      </ListItem>
    </Paper>
  );
};

export default ShoppingItemCard;
