import Header from './components/Header';
import Simulator from './components/Simulator';
import './App.css';

function App() {
  return (
    <div className='flex flex-row justify-center flex-grow h-screen '>
      <div className='w-11/12 bg-gray-100 h-5/6 mt-7'>
        <Header/>
        <div className='px-8'>
          <Simulator/>
        </div>
      </div>
    </div>
  );
}

export default App;
