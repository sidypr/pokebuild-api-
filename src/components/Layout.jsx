import Navbar from './Navbar';

function Layout({ children, onSearch, onTypeSelect, selectedType }) {
  return (
    <div>
      <Navbar 
        onSearch={onSearch} 
        onTypeSelect={onTypeSelect} 
        selectedType={selectedType}
      />
      {children}
    </div>
  );
}

export default Layout; 