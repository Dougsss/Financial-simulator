import Header from './components/Header';
import Simulator from './components/Simulator';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { indicators: [] }
  }
  //Este método serve para carregar os dados remoto e chamar o setState(), alterando o valor do estado inicial do componente
  componentDidMount() {
    fetch('http://localhost:3000/indicadores')
      .then(response => response.json())
      .then(data => {
        this.setState({ indicators: data })
      })
  }
  render() {
    return (
      <div className='flex flex-row justify-center flex-grow h-screen '>
        <div className='w-full sm:w-11/12 bg-gray-100 h-full lg:h-5/6 mt-7'>
          <Header />
          <div className='px-10'>
            <Simulator indicators={this.state.indicators} />
          </div>
        </div>
      </div>
    );
  }
}

export { App };
