import type { FC } from "react";
import { useState } from "react";
import styles from "./AddItemForm.module.css";

interface AddItemFormProps {
  onAdd: (title: string, quantity?: number) => void;
}

const AddItemForm: FC<AddItemFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>("");
  const [quantityText, setQuantityText] = useState<string>("");

  const handleSubmit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") return;

    const parsed = quantityText === "" ? undefined : Number(quantityText);
    const quantityValue = Number.isFinite(parsed as number)
      ? (parsed as number)
      : undefined;

    onAdd(trimmedTitle, quantityValue);
    setTitle("");
    setQuantityText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Что купить?"
        aria-label="item-title"
        autoComplete="off"
        autoFocus
      />
      <input
        className={styles.inputSmall}
        value={quantityText}
        onChange={(event) => setQuantityText(event.target.value)}
        placeholder="Кол-во"
        aria-label="item-quantity"
        inputMode="numeric"
      />
      <button className={styles.button} type="submit" disabled={!title.trim()}>
        Добавить
      </button>
    </form>
  );
};

export default AddItemForm;
