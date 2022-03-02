import React, { useState, useEffect } from "react";
import { styled } from "@linaria/react";
import PlayBtns from './Room/PlayBtns';
import { setNowPlaying } from "../../redux/actions/playlist";
import { useDispatch, useSelector } from "react-redux";

const MusicRoom = styled.div`
  grid-area: main;
  display:flex;
  flex-direction: column;

  .scene {
    margin: auto;
    width: 400px;
    height: 400px;
    perspective: 1200px;
    perspective-origin: top right ;
    img {
      background-size:contain;
      width:100%;
      height:100%;
    }
    .room {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transform: translateZ(-100px);
    }
    .room__wall {
      position: absolute;
      width: 100%;
      height: 100%;
      /* background-color: green; */
      /* opacity: 0.5; */
    }

    .room__wall-front {
      transform: rotateY(0deg) translateZ(200px);
    }
    .room__wall-right {
      transform: rotateY(90deg) translateZ(200px);
      /* background-color: red; */
    }
    .room__wall-back {
      transform: rotateY(180deg) translateZ(200px) scaleX(-1);
      
      /* background-color: black; */
    }
    .room__wall-left {
      transform: rotateY(-90deg) translateZ(200px);
      /* background-color: red; */
    }
    .room__wall-top {
      transform: rotateX(90deg) translateZ(200px);

    }
    .room__wall-bottom {
      transform: rotateX(-90deg) translateZ(200px);
      background-color: rgba(0,0,0,0.5);
      border : transparent;
    }
  }
`;
const Cat = styled.div`
  box-shadow: 10px 10px 0 0 #303f46, 20px 10px 0 0 #303f46, 30px 10px 0 0 #303f46, 40px 10px 0 0 #303f46, 50px 10px 0 0 #303f46, 60px 10px 0 0 #303f46, 70px 10px 0 0 #ffffff, 80px 10px 0 0 #303f46, 90px 10px 0 0 #303f46, 100px 10px 0 0 #303f46, 110px 10px 0 0 #303f46, 120px 10px 0 0 #ffffff, 130px 10px 0 0 #303f46, 140px 10px 0 0 #303f46, 150px 10px 0 0 #303f46, 160px 10px 0 0 #303f46, 10px 20px 0 0 #303f46, 20px 20px 0 0 #303f46, 30px 20px 0 0 #303f46, 40px 20px 0 0 #303f46, 50px 20px 0 0 #303f46, 60px 20px 0 0 #ffffff, 70px 20px 0 0 #ffcdd2, 80px 20px 0 0 #ffffff, 90px 20px 0 0 #303f46, 100px 20px 0 0 #303f46, 110px 20px 0 0 #ffffff, 120px 20px 0 0 #ffcdd2, 130px 20px 0 0 #ffffff, 140px 20px 0 0 #303f46, 150px 20px 0 0 #303f46, 160px 20px 0 0 #303f46, 10px 30px 0 0 #303f46, 20px 30px 0 0 #303f46, 30px 30px 0 0 #303f46, 40px 30px 0 0 #303f46, 50px 30px 0 0 #303f46, 60px 30px 0 0 #ffffff, 70px 30px 0 0 #ffcdd2, 80px 30px 0 0 #ffcdd2, 90px 30px 0 0 #000000, 100px 30px 0 0 #000000, 110px 30px 0 0 #000000, 120px 30px 0 0 #ffcdd2, 130px 30px 0 0 #ffffff, 140px 30px 0 0 #303f46, 150px 30px 0 0 #303f46, 160px 30px 0 0 #303f46, 10px 40px 0 0 #303f46, 20px 40px 0 0 #303f46, 30px 40px 0 0 #303f46, 40px 40px 0 0 #303f46, 50px 40px 0 0 #303f46, 60px 40px 0 0 #ffffff, 70px 40px 0 0 #ffcdd2, 80px 40px 0 0 #000000, 90px 40px 0 0 #ffffff, 100px 40px 0 0 #ffffff, 110px 40px 0 0 #000000, 120px 40px 0 0 #000000, 130px 40px 0 0 #ffffff, 140px 40px 0 0 #303f46, 150px 40px 0 0 #303f46, 160px 40px 0 0 #303f46, 10px 50px 0 0 #303f46, 20px 50px 0 0 #303f46, 30px 50px 0 0 #303f46, 40px 50px 0 0 #303f46, 50px 50px 0 0 #303f46, 60px 50px 0 0 #000000, 70px 50px 0 0 #ffffff, 80px 50px 0 0 #ffffff, 90px 50px 0 0 #000000, 100px 50px 0 0 #000000, 110px 50px 0 0 #000000, 120px 50px 0 0 #000000, 130px 50px 0 0 #ffffff, 140px 50px 0 0 #303f46, 150px 50px 0 0 #303f46, 160px 50px 0 0 #303f46, 10px 60px 0 0 #303f46, 20px 60px 0 0 #303f46, 30px 60px 0 0 #303f46, 40px 60px 0 0 #303f46, 50px 60px 0 0 #000000, 60px 60px 0 0 #000000, 70px 60px 0 0 #000000, 80px 60px 0 0 #000000, 90px 60px 0 0 #000000, 100px 60px 0 0 #000000, 110px 60px 0 0 #000000, 120px 60px 0 0 #ffffff, 130px 60px 0 0 #ffffff, 140px 60px 0 0 #303f46, 150px 60px 0 0 #303f46, 160px 60px 0 0 #303f46, 10px 70px 0 0 #303f46, 20px 70px 0 0 #303f46, 30px 70px 0 0 #303f46, 40px 70px 0 0 #303f46, 50px 70px 0 0 #000000, 60px 70px 0 0 #000000, 70px 70px 0 0 #000000, 80px 70px 0 0 #000000, 90px 70px 0 0 #ffffff, 100px 70px 0 0 #000000, 110px 70px 0 0 #ffffff, 120px 70px 0 0 #000000, 130px 70px 0 0 #000000, 140px 70px 0 0 #303f46, 150px 70px 0 0 #303f46, 160px 70px 0 0 #303f46, 10px 80px 0 0 #303f46, 20px 80px 0 0 #303f46, 30px 80px 0 0 #303f46, 40px 80px 0 0 #303f46, 50px 80px 0 0 #303f46, 60px 80px 0 0 #000000, 70px 80px 0 0 #000000, 80px 80px 0 0 #000000, 90px 80px 0 0 #000000, 100px 80px 0 0 #000000, 110px 80px 0 0 #000000, 120px 80px 0 0 #ffffff, 130px 80px 0 0 #ffffff, 140px 80px 0 0 #303f46, 150px 80px 0 0 #303f46, 160px 80px 0 0 #303f46, 10px 90px 0 0 #303f46, 20px 90px 0 0 #303f46, 30px 90px 0 0 #303f46, 40px 90px 0 0 #303f46, 50px 90px 0 0 #303f46, 60px 90px 0 0 #000000, 70px 90px 0 0 #000000, 80px 90px 0 0 #ffffff, 90px 90px 0 0 #ffffff, 100px 90px 0 0 #000000, 110px 90px 0 0 #ffffff, 120px 90px 0 0 #000000, 130px 90px 0 0 #000000, 140px 90px 0 0 #303f46, 150px 90px 0 0 #000000, 160px 90px 0 0 #303f46, 10px 100px 0 0 #303f46, 20px 100px 0 0 #303f46, 30px 100px 0 0 #303f46, 40px 100px 0 0 #303f46, 50px 100px 0 0 #303f46, 60px 100px 0 0 #000000, 70px 100px 0 0 #303f46, 80px 100px 0 0 #000000, 90px 100px 0 0 #000000, 100px 100px 0 0 #000000, 110px 100px 0 0 #ffffff, 120px 100px 0 0 #000000, 130px 100px 0 0 #000000, 140px 100px 0 0 #ffffff, 150px 100px 0 0 #303f46, 160px 100px 0 0 #000000, 10px 110px 0 0 #303f46, 20px 110px 0 0 #303f46, 30px 110px 0 0 #303f46, 40px 110px 0 0 #303f46, 50px 110px 0 0 #303f46, 60px 110px 0 0 #303f46, 70px 110px 0 0 #303f46, 80px 110px 0 0 #000000, 90px 110px 0 0 #000000, 100px 110px 0 0 #000000, 110px 110px 0 0 #000000, 120px 110px 0 0 #303f46, 130px 110px 0 0 #000000, 140px 110px 0 0 #303f46, 150px 110px 0 0 #ffffff, 160px 110px 0 0 #303f46, 10px 120px 0 0 #303f46, 20px 120px 0 0 #303f46, 30px 120px 0 0 #303f46, 40px 120px 0 0 #303f46, 50px 120px 0 0 #303f46, 60px 120px 0 0 #303f46, 70px 120px 0 0 #ffffff, 80px 120px 0 0 #000000, 90px 120px 0 0 #000000, 100px 120px 0 0 #ffffff, 110px 120px 0 0 #000000, 120px 120px 0 0 #ffffff, 130px 120px 0 0 #303f46, 140px 120px 0 0 #303f46, 150px 120px 0 0 #000000, 160px 120px 0 0 #303f46, 10px 130px 0 0 #303f46, 20px 130px 0 0 #303f46, 30px 130px 0 0 #303f46, 40px 130px 0 0 #303f46, 50px 130px 0 0 #ffffff, 60px 130px 0 0 #ffffff, 70px 130px 0 0 #ffffff, 80px 130px 0 0 #000000, 90px 130px 0 0 #ffffff, 100px 130px 0 0 #000000, 110px 130px 0 0 #000000, 120px 130px 0 0 #ffffff, 130px 130px 0 0 #000000, 140px 130px 0 0 #303f46, 150px 130px 0 0 #000000, 160px 130px 0 0 #303f46, 10px 140px 0 0 #303f46, 20px 140px 0 0 #303f46, 30px 140px 0 0 #303f46, 40px 140px 0 0 #303f46, 50px 140px 0 0 #ffffff, 60px 140px 0 0 #ffffff, 70px 140px 0 0 #ffffff, 80px 140px 0 0 #000000, 90px 140px 0 0 #000000, 100px 140px 0 0 #ffffff, 110px 140px 0 0 #ffffff, 120px 140px 0 0 #ffffff, 130px 140px 0 0 #303f46, 140px 140px 0 0 #ffffff, 150px 140px 0 0 #ffffff, 160px 140px 0 0 #303f46, 10px 150px 0 0 #303f46, 20px 150px 0 0 #303f46, 30px 150px 0 0 #303f46, 40px 150px 0 0 #ffffff, 50px 150px 0 0 #ffffff, 60px 150px 0 0 #ffffff, 70px 150px 0 0 #ffffff, 80px 150px 0 0 #ffffff, 90px 150px 0 0 #ffffff, 100px 150px 0 0 #ffffff, 110px 150px 0 0 #ffffff, 120px 150px 0 0 #ffffff, 130px 150px 0 0 #ffffff, 140px 150px 0 0 #ffffff, 150px 150px 0 0 #303f46, 160px 150px 0 0 #303f46, 10px 160px 0 0 #607d8b, 20px 160px 0 0 #607d8b, 30px 160px 0 0 #607d8b, 40px 160px 0 0 #607d8b, 50px 160px 0 0 #607d8b, 60px 160px 0 0 #ffffff, 70px 160px 0 0 #ffffff, 80px 160px 0 0 #607d8b, 90px 160px 0 0 #607d8b, 100px 160px 0 0 #607d8b, 110px 160px 0 0 #ffffff, 120px 160px 0 0 #ffffff, 130px 160px 0 0 #607d8b, 140px 160px 0 0 #607d8b, 150px 160px 0 0 #607d8b, 160px 160px 0 0 #607d8b;
  height: 10px;
  width: 10px;
`


//Music Playing
export default function Room() {

  const dispatch = useDispatch();
  const setNowPlaying= (idx) => dispatch(setNowPlaying(idx))
  const {nowPlaying, music} = useSelector(state => {
    return {
    nowPlaying : state.playlist.nowPlaying,
    music : state.playlist.playlist[state.playlist.nowPlaying]
  }})

  return (
    <MusicRoom>
      <div className="scene">
        <div className="room">
          <div className="room__wall room__wall-top">  </div>
          <div className="room__wall room__wall-bottom">  </div>
          <div className="room__wall room__wall-left"> <Cat></Cat></div>
          <div className="room__wall room__wall-right"> </div>
          
          <div className="room__wall room__wall-back" style={{ background : `url(${music.albumImage})`, backgroundSize: 'contain'}}/>
        </div>
      </div>
      <PlayBtns nowPlaying = {nowPlaying} setNowPlaying={setNowPlaying} music={music} />
    </MusicRoom>
  );
}
