// App.js
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
   return (
      <>
         <main>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/dashboard" element={
                  <ProtectedRoute>
                     <Dashboard />
                  </ProtectedRoute>
               } />
            </Routes>
         </main>
      </>
   );
};
 
export default App;