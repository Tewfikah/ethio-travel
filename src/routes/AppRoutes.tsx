// ─── src/routes/AppRoutes.tsx ────────────────────────────────────────
//
// 🧠 SIMPLE EXPLANATION:
// This file is like a ROAD MAP for our app
// It tells React which page to show for each URL
//
// HOW IT WORKS:
// User goes to "/"           → sees HomePage
// User goes to "/destinations" → sees DestinationsPage
// User goes to "/blog"         → sees BlogPage
//
// MainLayout wraps each page
// So every page gets the Navbar automatically!
//
// We will UNCOMMENT more routes as we build more pages!

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home/HomePage';

// We will add these as we build them!
// import DestinationsPage from '../pages/Destinations/DestinationsPage';
// import BlogPage from '../pages/Blog/BlogPage';
// import ContactPage from '../pages/Contact/ContactPage';
// import NewsPage from '../pages/News/NewsPage';

export default function AppRoutes() {
  return (
    // BrowserRouter watches the URL in the browser
    <BrowserRouter>

      {/* Routes checks all Route children and shows the match */}
      <Routes>

        {/* Home Page — shows when URL is "/" */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        {/* We will add more routes here as we build! */}
        {/*
        <Route
          path="/destinations"
          element={
            <MainLayout>
              <DestinationsPage />
            </MainLayout>
          }
        />

        <Route
          path="/blog"
          element={
            <MainLayout>
              <BlogPage />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />

        <Route
          path="/news"
          element={
            <MainLayout>
              <NewsPage />
            </MainLayout>
          }
        />
        */}

      </Routes>
    </BrowserRouter>
  );
}