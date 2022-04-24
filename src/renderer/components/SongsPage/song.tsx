/* eslint-disable react/require-default-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { calculateTime } from '../../calculateTime';

interface SongData {
  songId: string;
  artworkPath?: string;
  path: string;
  title: string;
  artists: string[];
  duration: number;
  playSong: (x: string) => void;
  currentSongData: AudioData;
  updateContextMenuData: (
    isVisible: boolean,
    menuItems: ContextMenuItem[],
    pageX?: number,
    pageY?: number
  ) => void;
  // updateQueueData: (currentSongIndex?: number, queue?: string[]) => void;
  // queue: Queue;
}

export const Song = (props: SongData) => {
  const [isSongPlaying, setIsSongPlaying] = React.useState(false);
  React.useEffect(() => {
    setIsSongPlaying(() => {
      if (props.currentSongData)
        return props.currentSongData.songId === props.songId;
      else return false;
    });
  }, [props.songId]);
  return (
    <div
      className={`song ${props.songId} ${isSongPlaying && 'playing'}`}
      data-song-id={props.songId}
      onContextMenu={(e) => {
        e.preventDefault();
        props.updateContextMenuData(
          true,
          [
            {
              label: 'Play',
              handlerFunction: () => props.playSong(props.songId),
            },
            // {
            //   label: 'Play Next',
            //   handlerFunction: () => {
            //     const selectedSongId = props.queue.queue.filter(
            //       (songId) => songId === props.songId
            //     )[0];
            //     const newQueue = props.queue.queue.filter(
            //       (songId) => songId !== props.songId
            //     );
            //     newQueue.splice(
            //       props.queue.queue.length - 1 !== props.queue.currentSongIndex
            //         ? props.queue.currentSongIndex
            //           ? props.queue.currentSongIndex + 1
            //           : 0
            //         : 0,
            //       0,
            //       selectedSongId
            //     );
            //     props.updateQueueData(undefined, newQueue);
            //   },
            // },
            {
              label: 'Reveal in File Explorer',
              class: 'reveal-file-explorer',
              handlerFunction: () =>
                window.api.revealSongInFileExplorer(props.songId),
            },
          ],
          e.pageX,
          e.pageY
        );
      }}
    >
      <div className="song-cover-and-play-btn-container">
        <div className="play-btn-container">
          <i
            className={`fa-solid fa-circle-${isSongPlaying ? 'pause' : 'play'}`}
            onClick={() =>
              setIsSongPlaying((prevState) => {
                console.log('clicked songId', props.songId);
                props.playSong(props.songId);
                if (!prevState) {
                  return !prevState;
                } else return !prevState;
              })
            }
            style={isSongPlaying ? { color: `hsla(0,0%,100%,1)` } : {}}
          ></i>
        </div>
        <div className="song-cover-container">
          <img
            src={`otoMusic://localFiles/${props.artworkPath}`}
            loading="lazy"
            alt=""
          />
        </div>
      </div>
      <div className="song-info-container">
        <div className="song-title" title={props.title}>
          {props.title}
        </div>
        <div className="song-artists" title={props.artists.join('')}>
          {props.artists.map((artist, index) => (
            <span className="artist" key={index}>
              {artist}
              {index === props.artists.length - 1 ? '' : ', '}
            </span>
          ))}
        </div>
        <div className="song-duration">
          {props.duration ? calculateTime(props.duration) : `-- : --`}
        </div>
      </div>
    </div>
  );
};
