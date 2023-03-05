import React, { Suspense } from 'react';
import './App.css';
import 'antd/dist/reset.css';
import MovieLayout from '../layout';
import Movies from '../components/Movies';

const App = () => {
  return (
    <div className="App">
      <MovieLayout>
        <Movies />
      </MovieLayout>
    </div>
  );
}

export default App;
