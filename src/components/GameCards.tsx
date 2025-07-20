import React from 'react'
import { useNavigate } from 'react-router-dom';

type GameCardsProps = {
    title:string,
    imgsrc?:string,
    description:string
    id:string,
}

const GameCards = ({description,imgsrc,title,id}: GameCardsProps) => {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${id}`);
  };
  return (
    <div className='game-card-container' id={id} onClick={handleClick}>
        <h2 className='game-title'>{title}</h2>
        <img src={imgsrc} alt={title} className='game-image'/>
        <p className='game-description'>{description}</p>
    </div>
  )
}

export default GameCards;