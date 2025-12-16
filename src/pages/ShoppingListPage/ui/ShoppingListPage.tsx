import type { FC } from "react";
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  List,
  Divider,
  Paper,
} from "@mui/material";
import { useState, useMemo } from "react";
import AddItemForm from "../../../widgets/AddItemForm";
import ShoppingItemCard from "../../../widgets/ShoppingItem";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/providers/store/hooks";
import { replaceAllItems } from "../../../entities/model/slice";

const ShoppingListPage: FC = () => {
  const items = useAppSelector((state) => state.shopping.items);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<"all" | "active" | "bought">("all");

  const clearBought = () => {
    const remaining = items.filter((it) => !it.bought);
    dispatch(replaceAllItems(remaining));
  };

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        if (filter === "all") return true;
        if (filter === "active") return !item.bought;
        return item.bought;
      }),
    [items, filter],
  );

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Список покупок</Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant={filter === "all" ? "contained" : "outlined"}
                onClick={() => setFilter("all")}
              >
                Все
              </Button>
              <Button
                variant={filter === "active" ? "contained" : "outlined"}
                onClick={() => setFilter("active")}
              >
                Активные
              </Button>
              <Button
                variant={filter === "bought" ? "contained" : "outlined"}
                onClick={() => setFilter("bought")}
              >
                Куплено
              </Button>
              <Button variant="outlined" color="error" onClick={clearBought}>
                Очистить купленное
              </Button>
            </Stack>
          </Box>

          <AddItemForm />

          <Divider />

          {filtered.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Список пуст
            </Typography>
          ) : (
            <List disablePadding>
              {filtered.map((item) => (
                <Box key={item.id} sx={{ mb: 1 }}>
                  <ShoppingItemCard item={item} />
                </Box>
              ))}
            </List>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default ShoppingListPage;
