import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { SignIn } from './pages/login/SingIn';
import { SignUp } from './pages/login/SignUp';
import Home from './pages/film-list/index';
import Layout from "./layout/Layout";
import { FilmDetail } from './pages/film-detail/FilmDetail';
import { SearchPage } from "./pages/film-search";

const PulicRoute = () => {
  return !localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/signin" element={<PulicRoute />}>
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route path="/signup" element={<PulicRoute />}>
          <Route path="/signup" element={<SignUp />} />
        </Route>
          <Route path="/" element={<Home />} />
          <Route path="/film-detail/:id" element={<FilmDetail />} />
          <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
