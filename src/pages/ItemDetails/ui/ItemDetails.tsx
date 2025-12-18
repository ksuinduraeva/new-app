import type { FC } from "react";
import { useCallback, useMemo } from "react";
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

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleToggleBought = useCallback(() => {
    if (!id) return;
    dispatch(toggleItemBought({ id }));
  }, [dispatch, id]);

  const handleRemove = useCallback(() => {
    if (!id) return;
    dispatch(removeItemById({ id }));
    navigate(-1);
  }, [dispatch, navigate, id]);

  const item = useAppSelector((state) =>
    state.shopping.items.find((it) => it.id === id),
  );

  const createdAtText = useMemo(() => {
    if (!item || !item.createdAt) return "";
    try {
      return new Date(item.createdAt).toLocaleString();
    } catch {
      return item.createdAt;
    }
  }, [item?.createdAt]);

  if (!id)
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1">Id не указан.</Typography>
          <Button sx={{ mt: 1 }} variant="outlined" onClick={handleGoBack}>
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
          Добавлен: {createdAtText}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button variant="outlined" onClick={handleGoBack}>
            Назад
          </Button>

          <Button variant="contained" onClick={handleToggleBought}>
            {item.bought ? "Снять отметку" : "Отметить купленным"}
          </Button>

          <Button variant="outlined" color="error" onClick={handleRemove}>
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
