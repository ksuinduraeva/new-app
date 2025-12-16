import type { FC } from "react";
import ShoppingListPage from "./pages/ShoppingListPage";
import { Routes, Route, Navigate } from "react-router-dom";
import ItemDetails from "./pages/ItemDetails";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ShoppingListPage />} />
      <Route path="/item/:id" element={<ItemDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
