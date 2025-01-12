import React, { ReactNode } from 'react';
import './Card.css';


interface CardProps {
  width?: string;
  height?: string;
  padding?: string;
  backgroundColor?: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({
  width = '25%',
  height = 'auto',
  padding = '20px',
  backgroundColor = '#f4f4f4',
  children,
}) => {
  return (
    <div
      className="card"
      style={{
        width,
        height,
        padding,
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
