import Header from './components/Header';
import Simulador from './components/Simulador';
import './App.css';

function App() {
  return (
    <div className=' flex flex-row flex-grow justify-center h-screen'>
      <div className='bg-gray-100 w-11/12 h-5/6 mt-7'>
        <Header/>
        <div className='px-8'>
          <Simulador/>
        </div>
      </div>
    </div>
  );
}

export default App;
