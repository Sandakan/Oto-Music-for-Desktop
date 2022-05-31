/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
// import React from 'react';

interface MostRelevantResultProp {
  resultType: 'artist' | 'song' | 'album' | 'playlist';
  title: string;
  id: string;
  infoType1?: string;
  infoType2?: string;
  artworkPath?: string;
  onlineArtworkPath?: string;
  playSong?: (songId: string) => void;
  updateContextMenuData: (
    isVisible: boolean,
    menuItems: ContextMenuItem[],
    pageX?: number,
    pageY?: number
  ) => void;
  contextMenuItems: ContextMenuItem[];
  currentlyActivePage: { pageTitle: PageTitles; data?: any };
  changeCurrentActivePage: (pageTitle: PageTitles, data?: any) => void;
}

export const MostRelevantResult = (props: MostRelevantResultProp) => {
  return (
    <div
      className={`result most-relevant-${props.resultType.toLowerCase()} active`}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.updateContextMenuData(
          true,
          props.contextMenuItems,
          e.pageX,
          e.pageY
        );
      }}
    >
      <div className="result-img-container">
        {props.resultType.toLowerCase() !== 'artist' && (
          <span
            title="Play Song"
            className="material-icons-round icon"
            onClick={() => props.playSong && props.playSong(props.id)}
          >
            play_circle
          </span>
        )}{' '}
        <img
          src={
            navigator.onLine && props.onlineArtworkPath
              ? props.onlineArtworkPath
              : `otomusic://localFiles/${props.artworkPath}`
          }
          loading="lazy"
          alt="Most Relevant Result Cover"
        />
      </div>
      <div className="result-info-container">
        <div
          className="title"
          onClick={() => {
            props.resultType === 'artist'
              ? props.currentlyActivePage.pageTitle === 'ArtistInfo' &&
                props.currentlyActivePage.data.artistName === props.title
                ? props.changeCurrentActivePage('Home')
                : props.changeCurrentActivePage('ArtistInfo', {
                    artistName: props.title,
                  })
              : undefined;
          }}
        >
          {props.title}
        </div>
        {props.infoType1 && (
          <div className="info-type-1">{props.infoType1}</div>
        )}
        {props.infoType2 && (
          <div className="info-type-2">{props.infoType2}</div>
        )}
        <div className="result-type">{props.resultType.toUpperCase()}</div>
      </div>
    </div>
  );
};
