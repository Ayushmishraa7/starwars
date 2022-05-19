import React from 'react';
import './Spinner.scss';

export const Spinner: React.FC = () => {
  return (
    <div className='spinner'>
      <div className='spinner-dot'></div>
      <div className='spinner-dot'></div>
      <div className='spinner-dot'></div>
      <div className='spinner-dot'></div>
      <div className='spinner-dot'></div>
      <div className='spinner-dot'></div>
    </div>
  );
};
