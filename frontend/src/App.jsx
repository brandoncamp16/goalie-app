import { Route, Routes } from 'react-router';
import EntriesPage from './pages/EntriesPage';
import GoalsPage from './pages/GoalsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import CreateEntryPage from './pages/CreateEntryPage';
import CreateGoalPage from './pages/CreateGoalPage';
import CreateActivityPage from './pages/CreateActivityPage';
import EntryDetailPage from './pages/EntryDetailPage';
import GoalDetailPage from './pages/GoalDetailPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import SettingsPage from './pages/SettingsPage';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import AdminPage from './pages/AdminPage';

const ROLES = {
  'User': 2001,
  'Admin': 5150
}

const App = () => {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#20252E_60%,#000D08_100%)]' />
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* Private User Routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]}/>}>
            <Route path="/" element={<EntriesPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/createEntry" element={<CreateEntryPage />} />
            <Route path="/createGoal" element={<CreateGoalPage />} />
            <Route path="/createActivity" element={<CreateActivityPage />} />
            <Route path="/entries/:id" element={<EntryDetailPage />} />
            <Route path="/goals/:id" element={<GoalDetailPage />} />
            <Route path="/activities/:id" element={<ActivityDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          {/* Private Admin Routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          {/* Other Routes */}
          <Route path="/missing" element={<Missing />} />
        </Route>
      </Routes>

    </div>
  );
};

export default App;