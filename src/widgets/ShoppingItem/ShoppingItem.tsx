import type { ShoppingItem } from "../../entities";
import type { FC } from "react";
import styles from "./ShoppingItem.module.css";

type ItemHandler = (itemId: string) => void;

interface ShoppingItemProps {
  item: ShoppingItem;
  onToggle: ItemHandler;
  onRemove: ItemHandler;
}

const ShoppingItemCard: FC<ShoppingItemProps> = ({
  item,
  onToggle,
  onRemove,
}) => (
  <div className={styles.card}>
    <label className={styles.checkboxLabel}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={item.bought}
        onChange={() => onToggle(item.id)}
        aria-label={`toggle-${item.id}`}
      />
    </label>

    <div className={styles.info}>
      <div className={item.bought ? styles.titleBought : styles.title}>
        {item.title}
      </div>
      {item.quantity != null && item.quantity > 0 && (
        <div className={styles.quantity}>×{item.quantity}</div>
      )}
    </div>

    <button
      className={styles.remove}
      onClick={() => onRemove(item.id)}
      aria-label={`remove-${item.id}`}
    >
      ✕
    </button>
  </div>
);

export default ShoppingItemCard;
