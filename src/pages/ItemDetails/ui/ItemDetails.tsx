import type { FC } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/providers/store/hooks";
import {
  toggleItemBought,
  removeItemById,
} from "../../../entities/model/slice";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";

const ItemDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const item = useAppSelector((state) =>
    state.shopping.items.find((it) => it.id === id),
  );

  if (!id)
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1">Id не указан.</Typography>
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </Paper>
      </Box>
    );

  if (!item)
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1">Товар с id {id} не найден.</Typography>
          <Button sx={{ mt: 1 }} component={Link} to="/" variant="text">
            На список
          </Button>
        </Paper>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 760, mx: "auto", p: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Детали товара
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Название:</strong> {item.title}
        </Typography>

        {item.quantity !== undefined && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Кол-во:</strong> {item.quantity}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Статус:</strong> {item.bought ? "Куплен" : "Не куплен"}
        </Typography>

        <Typography variant="caption" display="block" sx={{ mb: 2 }}>
          Добавлен: {new Date(item.createdAt).toLocaleString()}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Назад
          </Button>

          <Button
            variant="contained"
            onClick={() => dispatch(toggleItemBought({ id: item.id }))}
          >
            {item.bought ? "Снять отметку" : "Отметить купленным"}
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              dispatch(removeItemById({ id: item.id }));
              navigate(-1);
            }}
          >
            Удалить
          </Button>

          <Button component={Link} to="/" variant="text">
            На список
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ItemDetails;
