import React from 'react';
import '../Css/Home.css'
const TypingEffect = ({ text, className }) => {
  return (
    <h1 className={`typing-effect ${className}`}>
      {text}
    </h1>
  );
};

export default TypingEffect;
