import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import AIChatAssistant from './components/AIChatAssistant';
import ScrollProgress from './components/ScrollProgress';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

function MainLayout() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <AIChatAssistant />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
