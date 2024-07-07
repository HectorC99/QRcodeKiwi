import React from 'react';
import logoImage from '../assets/qrcodeKiwi.png'

const Logo: React.FC = () => {
  return (
    <img className="logo w-80" src={logoImage} alt="" />
  );
};

export default Logo;
