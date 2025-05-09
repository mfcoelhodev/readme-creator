import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </BrowserRouter>
  );
}