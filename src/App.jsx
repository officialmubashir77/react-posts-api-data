import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CustomNavbar from './components/CustomNavbar';
import { useState } from 'react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <CustomNavbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
