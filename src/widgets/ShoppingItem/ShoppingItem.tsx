import type { ShoppingItem } from "../../types";
import styles from "./ShoppingItem.module.css";

type ItemHandler = (itemId: string) => void;

interface ShoppingItemProps {
  item: ShoppingItem;
  onToggle: ItemHandler;
  onRemove: ItemHandler;
}

function ShoppingItemCard({ item, onToggle, onRemove }: ShoppingItemProps) {
  function handleToggle() {
    onToggle(item.id);
  }

  function handleRemove() {
    onRemove(item.id);
  }

  return (
    <div className={styles.card}>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={item.bought}
          onChange={handleToggle}
          aria-label={`toggle-${item.id}`}
        />
      </label>

      <div className={styles.info}>
        <div className={item.bought ? styles.titleBought : styles.title}>
          {item.title}
        </div>
        {item.quantity !== undefined ? (
          <div className={styles.quantity}>×{item.quantity}</div>
        ) : null}
      </div>

      <button
        className={styles.remove}
        onClick={handleRemove}
        aria-label={`remove-${item.id}`}
      >
        ✕
      </button>
    </div>
  );
}
export default ShoppingItemCard;
