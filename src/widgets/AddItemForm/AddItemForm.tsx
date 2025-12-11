import React, { useState } from "react";
import styles from "./AddItemForm.module.css";

interface AddItemFormProps {
  onAdd: (title: string, quantity?: number) => void;
}

function AddItemForm({ onAdd }: AddItemFormProps) {
  const [title, setTitle] = useState<string>("");
  const [quantityText, setQuantityText] = useState<string>("");

  function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>): void {
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
  }

  function handleTitleChange(
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setTitle(changeEvent.target.value);
  }

  function handleQuantityChange(
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setQuantityText(changeEvent.target.value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={title}
        onChange={handleTitleChange}
        placeholder="Что купить?"
        aria-label="item-title"
        autoComplete="off"
        autoFocus
      />
      <input
        className={styles.inputSmall}
        value={quantityText}
        onChange={handleQuantityChange}
        placeholder="Кол-во"
        aria-label="item-quantity"
        inputMode="numeric"
      />
      <button className={styles.button} type="submit" disabled={!!title.trim()}>
        Добавить
      </button>
    </form>
  );
}
export default AddItemForm;
