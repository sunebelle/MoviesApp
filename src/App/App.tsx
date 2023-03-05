import React from 'react';
import Movies from '../components/Movies';
import './App.css';
import 'antd/dist/reset.css';
import { Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { useViewModeContext } from '../hooks/useViewPort';
import { VIEW_PORT } from '../constants/enums';
import InputSearch from '../components/InputSearch';
import MovieLayout from '../layout';

const App = () => {
  const { setViewMode } = useViewModeContext();
  return (
    <div className="App">
      <MovieLayout>
        <Movies />
      </MovieLayout>
    </div>
  );
}

export default App;
