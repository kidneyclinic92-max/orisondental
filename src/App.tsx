import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from './admin/AdminLayout'
import { AboutEditorPage } from './admin/pages/AboutEditorPage'
import { AchievementsEditorPage } from './admin/pages/AchievementsEditorPage'
import { AdminDashboardPage } from './admin/pages/AdminDashboardPage'
import { BookEditorPage } from './admin/pages/BookEditorPage'
import { ContactEditorPage } from './admin/pages/ContactEditorPage'
import { HomeEditorPage } from './admin/pages/HomeEditorPage'
import { ServicesEditorPage } from './admin/pages/ServicesEditorPage'
import { SiteSettingsPage } from './admin/pages/SiteSettingsPage'
import { AppointmentsAdminPage } from './admin/pages/AppointmentsAdminPage'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { AchievementsPage } from './pages/AchievementsPage'
import { BookPage } from './pages/BookPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book" element={<BookPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="site" element={<SiteSettingsPage />} />
        <Route path="appointments" element={<AppointmentsAdminPage />} />
        <Route path="home" element={<HomeEditorPage />} />
        <Route path="services" element={<ServicesEditorPage />} />
        <Route path="achievements" element={<AchievementsEditorPage />} />
        <Route path="about" element={<AboutEditorPage />} />
        <Route path="contact" element={<ContactEditorPage />} />
        <Route path="book" element={<BookEditorPage />} />
      </Route>
    </Routes>
  )
}

export default App
