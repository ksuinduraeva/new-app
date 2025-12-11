import { useState, useMemo } from "react";
import AddItemForm from "../../widgets/AddItemForm";
import ShoppingItemCard from "../../widgets/ShoppingItem";
import styles from "./ShoppingListPage.module.css";
import { v4 as uuid } from "uuid";
import type { ShoppingItem } from "../../entities";

function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "bought">("all");

  function addItem(title: string, quantity?: number) {
    const newItem: ShoppingItem = {
      id: uuid(),
      title,
      quantity,
      bought: false,
      createdAt: new Date().toISOString(),
    };
    setItems((previousItems) => [newItem, ...previousItems]);
  }

  function toggleBought(itemId: string) {
    setItems((previousItems) =>
      previousItems.map((existingItem) =>
        existingItem.id === itemId
          ? { ...existingItem, bought: !existingItem.bought }
          : existingItem,
      ),
    );
  }

  function removeItem(itemId: string) {
    setItems((previousItems) =>
      previousItems.filter((existingItem) => existingItem.id !== itemId),
    );
  }

  function clearBought() {
    setItems((previousItems) =>
      previousItems.filter((existingItem) => existingItem.bought === false),
    );
  }

  const filterItems = useMemo(
    () =>
      items.filter((existingItem) => {
        if (filter === "all") return true;
        if (filter === "active") return existingItem.bought === false;
        return existingItem.bought === true;
      }),
    [items, filter],
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Список покупок</h1>

      <AddItemForm onAdd={addItem} />

      <div className={styles.controls}>
        <div className={styles.filterGroup}>
          <button
            className={
              filter === "all" ? styles.activeButton : styles.filterButton
            }
            onClick={() => setFilter("all")}
          >
            Все
          </button>
          <button
            className={
              filter === "active" ? styles.activeButton : styles.filterButton
            }
            onClick={() => setFilter("active")}
          >
            Активные
          </button>
          <button
            className={
              filter === "bought" ? styles.activeButton : styles.filterButton
            }
            onClick={() => setFilter("bought")}
          >
            Купленные
          </button>
        </div>

        <button className={styles.clearButton} onClick={clearBought}>
          Очистить купленные
        </button>
      </div>

      <ul className={styles.list}>
        {filterItems.length === 0 ? ( // тут либо так, либо !filterItems.length
          <li className={styles.empty}>Список пуст</li>
        ) : (
          filterItems.map((existingItem) => (
            <li key={existingItem.id}>
              <ShoppingItemCard
                item={existingItem}
                onToggle={toggleBought}
                onRemove={removeItem}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ShoppingListPage;
