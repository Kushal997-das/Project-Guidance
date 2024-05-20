//components are landed over here 
import Home from './components/Home';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
    <Home />
    </DataProvider>
  );
}

export default App;
