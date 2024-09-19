// App.js
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ClientLayout from './layouts/ClientLayout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
   return (
      <>
         <main>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/dashboard" element={
                  <ProtectedRoute>
                     <ClientLayout>
                        <div>Content Goes here</div>
                     </ClientLayout>
                  </ProtectedRoute>
               } />
            </Routes>
         </main>
      </>
   );
};
 
export default App;