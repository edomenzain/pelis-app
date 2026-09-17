import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './views/components/layout/Navbar';
import Footer from './views/components/layout/Footer';
import PageTransition from './views/components/layout/PageTransition';
import Home from './views/pages/Home';
import MovieDetail from './views/pages/MovieDetail';
import Profile from './views/pages/Profile';
import Admin from './views/pages/Admin';
import Login from './views/pages/Login';
import Categories from './views/pages/Categories';
import TopRated from './views/pages/TopRated';
import NewReleases from './views/pages/NewReleases';
import NotFound from './views/pages/NotFound';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <PageTransition>
                  <MovieDetail />
                </PageTransition>
              }
            />
            <Route
              path="/profile"
              element={
                <PageTransition>
                  <Profile />
                </PageTransition>
              }
            />
            <Route
              path="/admin"
              element={
                <PageTransition>
                  <Admin />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />
            <Route
              path="/categorias"
              element={
                <PageTransition>
                  <Categories />
                </PageTransition>
              }
            />
            <Route
              path="/mejor-calificado"
              element={
                <PageTransition>
                  <TopRated />
                </PageTransition>
              }
            />
            <Route
              path="/nuevo"
              element={
                <PageTransition>
                  <NewReleases />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
