import React from 'react';
import './Home.css';
import TrackList from '../../components/TrackList';

const Home: React.FC = () => {
  return (
    <>
      <h1>Album Creator</h1>
      <TrackList />
    </>
  );
};

export default Home;
