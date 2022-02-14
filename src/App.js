import Header from './components/Header';
import Simulator from './components/Simulator';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { indicators: [] }
  }
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
        <div className='w-11/12 bg-gray-100 h-5/6 mt-7'>
          <Header />
          <div className='px-8'>
            <Simulator indicators={this.state.indicators} />
          </div>
        </div>
      </div>
    );
  }
}

export { App };
