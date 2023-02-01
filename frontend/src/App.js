import UserForm from './components/Add User/UserForm';
import { Routes, Route } from "react-router-dom";
import UserDetails from './components/Show Users/UserDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/userForm" element={<UserForm />} />
      <Route path="/userDetails" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
