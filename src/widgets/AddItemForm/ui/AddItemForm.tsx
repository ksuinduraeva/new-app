import type { FunctionComponent } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../../../shared/providers/store/hooks";
import styles from "./AddItemForm.module.css";
import { Box, TextField, Button, Stack } from "@mui/material";
import { addItem } from "../../../entities/model/slice";

const AddItemForm: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const [productName, setProductName] = useState<string>("");
  const [quantityText, setQuantityText] = useState<string>("");

  const clearForm = () => {
    setProductName("");
    setQuantityText("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = productName.trim();
    if (!name) return;

    const parsed =
      quantityText.trim() === "" ? undefined : Number(quantityText.trim());
    const quantity =
      parsed === undefined || Number.isNaN(parsed) ? undefined : parsed;

    const newItem = {
      id: uuid(),
      title: name,
      quantity,
      bought: false,
      createdAt: new Date().toISOString(),
    };

    dispatch(addItem(newItem));
    clearForm();
  };

  return (
    <Box
      component="form"
      className={styles.form}
      onSubmit={handleSubmit}
      aria-label="Форма добавления товара"
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        className={styles.row}
      >
        <TextField
          label="Название товара"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          size="small"
          fullWidth
          autoComplete="off"
          slotProps={{ htmlInput: { "aria-label": "Название товара" } }}
        />

        <TextField
          label="шт"
          value={quantityText}
          onChange={(event) => setQuantityText(event.target.value)}
          size="small"
          sx={{ width: { xs: "100%", sm: 120 } }}
          slotProps={{
            htmlInput: {
              inputMode: "decimal",
              "aria-label": "шт",
            },
          }}
          autoComplete="off"
        />

        <Button
          type="submit"
          variant="contained"
          className={styles.button}
          aria-label="Добавить товар"
        >
          Добавить
        </Button>
      </Stack>
    </Box>
  );
};

export default AddItemForm;
