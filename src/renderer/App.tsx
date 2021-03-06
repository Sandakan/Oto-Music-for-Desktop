/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { ReactElement } from 'react';
import 'tailwindcss/tailwind.css';
import '../../assets/styles/main.css';
import { BodyAndSideBarContainer } from './components/bodyAndSidebarContainer';
import Header from './components/Header/header';
import SongControlsContainer from './components/SongsControlsContainer/SongControlsContainer';
import { PromptMenu } from './components/PromptMenu/PromptMenu';
import ContextMenu from './components/ContextMenu/ContextMenu';
import {
  AppContext,
  AppUpdateContext,
  SongPositionContext,
  AppUpdateContextType,
} from './contexts/AppContext';
import MiniPlayer from './components/MiniPlayer/MiniPlayer';
import ErrorPrompt from './components/ErrorPrompt';
import Button, { ButtonProps } from './components/Button';

interface AppReducer {
  userData?: UserData;
  isDarkMode: boolean;
  currentSongData: AudioData;
  PromptMenuData: PromptMenuData;
  notificationPanelData: NotificationPanelData;
  contextMenuData: ContextMenuData;
  navigationHistory: NavigationHistoryData;
  isCurrentSongPlaying: boolean;
  isMiniPlayer: boolean;
  volume: { isMuted: boolean; value: number };
  isRepeating: RepeatTypes;
  songPosition: number;
  isShuffling: boolean;
}

type AppReducerStateActions =
  | 'USER_DATA_CHANGE'
  | 'START_PLAY_STATE_CHANGE'
  | 'IS_DARK_MODE_CHANGE'
  | 'CURRENT_SONG_DATA_CHANGE'
  | 'CURRENT_SONG_PLAYBACK_STATE'
  | 'PROMPT_MENU_DATA_CHANGE'
  | 'NOTIFICATION_PANEL_DATA_CHANGE'
  | 'CONTEXT_MENU_DATA_CHANGE'
  | 'CONTEXT_MENU_VISIBILITY_CHANGE'
  | 'CURRENT_ACTIVE_PAGE_CHANGE'
  | 'CURRENT_ACTIVE_PAGE_DATA_UPDATE'
  | 'UPDATE_NAVIGATION_HISTORY_DATA'
  | 'UPDATE_MINI_PLAYER_STATE'
  | 'UPDATE_VOLUME'
  | 'UPDATE_MUTED_STATE'
  | 'UPDATE_SONG_POSITION'
  | 'UPDATE_IS_REPEATING_STATE'
  | 'TOGGLE_IS_FAVORITE_STATE'
  | 'TOGGLE_SHUFFLE_STATE'
  | 'UPDATE_VOLUME_VALUE'
  | 'TOGGLE_REDUCED_MOTION'
  | 'TOGGLE_SONG_INDEXING'
  | 'TOGGLE_SONG_INDEXING';

const reducer = (
  state: AppReducer,
  action: { type: AppReducerStateActions; data?: unknown }
): AppReducer => {
  switch (action.type) {
    case 'IS_DARK_MODE_CHANGE':
      return {
        ...state,
        isDarkMode:
          typeof action.data === 'boolean' &&
          (action.data || !state.isDarkMode),
      };
    case 'USER_DATA_CHANGE':
      return {
        ...state,
        userData:
          typeof action.data === 'object'
            ? (action.data as UserData)
            : state.userData,
      };
    case 'TOGGLE_REDUCED_MOTION':
      return {
        ...state,
        userData:
          typeof action.data === 'boolean'
            ? {
                ...(state.userData as UserData),
                preferences: {
                  ...(state.userData as UserData).preferences,
                  isReducedMotion: action.data,
                },
              }
            : {
                ...(state.userData as UserData),
                preferences: {
                  ...(state.userData as UserData).preferences,
                  isReducedMotion: (state.userData as UserData).preferences
                    .isReducedMotion,
                },
              },
      };
    case 'TOGGLE_SONG_INDEXING':
      return {
        ...state,
        userData:
          typeof action.data === 'boolean'
            ? {
                ...(state.userData as UserData),
                preferences: {
                  ...(state.userData as UserData).preferences,
                  songIndexing: action.data,
                },
              }
            : {
                ...(state.userData as UserData),
                preferences: {
                  ...(state.userData as UserData).preferences,
                  songIndexing: (state.userData as UserData).preferences
                    .songIndexing,
                },
              },
      };
    case 'PROMPT_MENU_DATA_CHANGE':
      return {
        ...state,
        PromptMenuData: (action.data as PromptMenuData) || state.PromptMenuData,
      };
    case 'NOTIFICATION_PANEL_DATA_CHANGE':
      return {
        ...state,
        notificationPanelData:
          (action.data as NotificationPanelData) || state.notificationPanelData,
      };
    case 'CONTEXT_MENU_DATA_CHANGE':
      return {
        ...state,
        contextMenuData:
          (action.data as ContextMenuData) || state.contextMenuData,
      };
    case 'CONTEXT_MENU_VISIBILITY_CHANGE':
      return {
        ...state,
        contextMenuData: {
          ...state.contextMenuData,
          isVisible:
            typeof action.data === 'boolean'
              ? action.data
              : state.contextMenuData.isVisible,
        },
      };
    case 'CURRENT_ACTIVE_PAGE_CHANGE':
      return {
        ...state,
        navigationHistory: {
          pageHistoryIndex: state.navigationHistory.pageHistoryIndex + 1,
          history: action.data
            ? [
                ...state.navigationHistory.history,
                action.data as NavigationHistory,
              ]
            : state.navigationHistory.history,
        },
      };
    case 'CURRENT_ACTIVE_PAGE_DATA_UPDATE':
      state.navigationHistory.history[
        state.navigationHistory.pageHistoryIndex
      ].data = action.data;
      return {
        ...state,
        navigationHistory: state.navigationHistory,
      };
    case 'UPDATE_NAVIGATION_HISTORY_DATA':
      return {
        ...state,
        navigationHistory:
          typeof action.data === 'object'
            ? { ...state.navigationHistory, ...action.data }
            : state.navigationHistory,
      };
    case 'CURRENT_SONG_DATA_CHANGE':
      return {
        ...state,
        currentSongData:
          typeof action.data === 'object'
            ? { ...state.currentSongData, ...action.data }
            : state.currentSongData,
      };
    case 'CURRENT_SONG_PLAYBACK_STATE':
      return {
        ...state,
        isCurrentSongPlaying:
          typeof action.data === 'boolean'
            ? action.data
            : !state.isCurrentSongPlaying,
      };
    case 'UPDATE_MINI_PLAYER_STATE':
      window.api.toggleMiniPlayer(
        typeof action.data === 'boolean' ? action.data : state.isMiniPlayer
      );
      return {
        ...state,
        isMiniPlayer:
          typeof action.data === 'boolean' ? action.data : state.isMiniPlayer,
      };
    case 'UPDATE_SONG_POSITION':
      return {
        ...state,
        songPosition:
          typeof action.data === 'number' ? action.data : state.songPosition,
      };
    case 'UPDATE_IS_REPEATING_STATE':
      return {
        ...state,
        isRepeating:
          typeof action.data === 'string'
            ? (action.data as RepeatTypes)
            : state.isRepeating,
      };
    case 'TOGGLE_IS_FAVORITE_STATE':
      return {
        ...state,
        currentSongData: {
          ...state.currentSongData,
          isAFavorite:
            typeof action.data === 'boolean'
              ? action.data
              : !state.currentSongData.isAFavorite,
        },
      };
    case 'TOGGLE_SHUFFLE_STATE':
      return {
        ...state,
        isShuffling:
          typeof action.data === 'boolean' ? action.data : !state.isShuffling,
      };
    case 'UPDATE_VOLUME':
      return {
        ...state,
        volume:
          typeof action.data === 'object'
            ? { ...state.volume, ...action.data }
            : state.volume,
      };
    case 'UPDATE_VOLUME_VALUE':
      return {
        ...state,
        volume: {
          ...state.volume,
          value:
            typeof action.data === 'number' ? action.data : state.volume.value,
          isMuted: typeof action.data === 'number' && action.data === 0,
        },
      };
    case 'UPDATE_MUTED_STATE':
      return {
        ...state,
        volume: {
          ...state.volume,
          isMuted:
            typeof action.data === 'boolean'
              ? action.data
              : !state.volume.isMuted,
        },
      };
    default:
      return state;
  }
};

const { isDevelopment } = window.api;

const player = new Audio();

const updateNetworkStatus = () =>
  window.api.networkStatusChange(navigator.onLine);
updateNetworkStatus();
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

const reducerData: AppReducer = {
  isDarkMode: false,
  isMiniPlayer: false,
  userData: undefined,
  currentSongData: {} as AudioData,
  isCurrentSongPlaying: false,
  navigationHistory: {
    pageHistoryIndex: 0,
    history: [
      {
        pageTitle: 'Home',
        data: undefined,
      },
    ],
  },
  contextMenuData: {
    isVisible: false,
    menuItems: [],
    pageX: 200,
    pageY: 200,
  },
  notificationPanelData: {
    isVisible: false,
    icon: <></>,
    content: <span />,
    isLoading: false,
  },
  PromptMenuData: {
    isVisible: false,
    content: <span />,
    className: '',
  },
  volume: { isMuted: false, value: 50 },
  isRepeating: 'false',
  isShuffling: false,
  songPosition: 0,
};

export default function App() {
  const [content, dispatch] = React.useReducer(reducer, reducerData);
  const contentRef = React.useRef(reducerData);

  const [, startTransition] = React.useTransition();
  const refStartPlay = React.useRef(false);
  const refQueue = React.useRef({
    currentSongIndex: null,
    queue: [],
    queueBeforeShuffle: [],
    queueType: 'songs',
  } as Queue);

  const changePromptMenuData = React.useCallback(
    (
      isVisible = false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contentData?: ReactElement<any, any>,
      className = ''
    ) => {
      dispatch({
        type: 'PROMPT_MENU_DATA_CHANGE',
        data: {
          isVisible,
          content: contentData ?? content.PromptMenuData.content,
          className: className ?? content.PromptMenuData.className,
        },
      });
    },
    [content.PromptMenuData.className, content.PromptMenuData.content]
  );

  const managePlaybackErrors = React.useCallback(
    (err: unknown) => {
      console.error(err);
      if (isDevelopment)
        window.api.restartRenderer(`Error occurred in the player. ${err}`);
      else {
        changePromptMenuData(
          true,
          <ErrorPrompt
            reason="ERROR_IN_PLAYER"
            message={
              <>
                An error ocurred in the player. The app will restart in 5
                seconds.
              </>
            }
          />
        );
        setTimeout(
          () =>
            window.api.restartRenderer(`Error occurred in the player. ${err}`),
          5000
        );
      }
    },
    [changePromptMenuData]
  );

  const fadeOutIntervalId = React.useRef(undefined as NodeJS.Timer | undefined);
  const fadeInIntervalId = React.useRef(undefined as NodeJS.Timer | undefined);

  const fadeOutAudio = React.useCallback(() => {
    console.log('volume on fade out', contentRef.current.volume);

    if (fadeInIntervalId.current) clearInterval(fadeInIntervalId.current);
    if (fadeOutIntervalId.current) clearInterval(fadeOutIntervalId.current);
    const interval = 100;
    const duration = 300;
    fadeOutIntervalId.current = setInterval(() => {
      if (player.volume > 0) {
        const rate =
          contentRef.current.volume.value / (100 * (duration / interval));
        if (player.volume - rate <= 0) player.volume = 0;
        else player.volume -= rate;
      } else {
        player.pause();
        if (fadeOutIntervalId.current) clearInterval(fadeOutIntervalId.current);
      }
    }, interval);
  }, []);

  const fadeInAudio = React.useCallback(() => {
    console.log('volume on fade in', contentRef.current.volume);

    if (fadeInIntervalId.current) clearInterval(fadeInIntervalId.current);
    if (fadeOutIntervalId.current) clearInterval(fadeOutIntervalId.current);
    const interval = 100;
    const duration = 300;
    fadeInIntervalId.current = setInterval(() => {
      if (player.volume < contentRef.current.volume.value / 100) {
        const rate =
          (contentRef.current.volume.value / 100 / interval) *
          (duration / interval);
        if (player.volume + rate >= contentRef.current.volume.value / 100)
          player.volume = contentRef.current.volume.value / 100;
        else player.volume += rate;
      } else if (fadeInIntervalId.current) {
        clearInterval(fadeInIntervalId.current);
      }
    }, interval);
  }, []);

  const handleBeforeQuitEvent = React.useCallback(async () => {
    window.api.sendSongPosition(player.currentTime);
    await window.api.saveUserData(
      'isShuffling',
      contentRef.current.isShuffling
    );
    await window.api.saveUserData(
      'isRepeating',
      contentRef.current.isRepeating
    );
  }, []);

  React.useEffect(() => {
    const manageWindowBlurOrFocus = (state: 'blur' | 'focus') => {
      const appElement = document.querySelector('.App');
      if (appElement) {
        if (state === 'blur') appElement.classList.add('blurred');
        if (state === 'focus') appElement.classList.remove('blurred');
      }
    };
    player.addEventListener('error', (err) => managePlaybackErrors(err));
    player.addEventListener('play', () => {
      dispatch({
        type: 'CURRENT_SONG_PLAYBACK_STATE',
        data: true,
      });
      window.api.songPlaybackStateChange(true);
    });
    player.addEventListener('pause', () => {
      dispatch({
        type: 'CURRENT_SONG_PLAYBACK_STATE',
        data: false,
      });
      window.api.songPlaybackStateChange(false);
    });
    window.api.beforeQuitEvent(handleBeforeQuitEvent);
    window.api.onWindowBlur(() => manageWindowBlurOrFocus('blur'));
    window.api.onWindowFocus(() => manageWindowBlurOrFocus('focus'));
    return () => {
      window.api.removeBeforeQuitEventListener(handleBeforeQuitEvent);
    };
  }, [managePlaybackErrors, handleBeforeQuitEvent]);

  React.useEffect(() => {
    const displayDefaultTitleBar = () => {
      document.title = `Oto Music For Desktop`;
      window.api.saveUserData(
        'currentSong.stoppedPosition',
        player.currentTime
      );
    };
    const playSongIfPlayable = () => {
      if (refStartPlay.current)
        player.play().catch((err) => managePlaybackErrors(err));
    };
    const manageSongPositionUpdate = () => {
      contentRef.current.songPosition = Math.floor(player.currentTime);
    };
    player.addEventListener('canplay', playSongIfPlayable);
    player.addEventListener('ended', handleSkipForwardClick);
    player.addEventListener('play', addSongTitleToTitleBar);
    player.addEventListener('pause', displayDefaultTitleBar);

    const intervalId = setInterval(() => {
      if (!player.paused)
        startTransition(() =>
          dispatch({
            type: 'UPDATE_SONG_POSITION',
            data: Math.floor(contentRef.current.songPosition),
          })
        );
    }, 1000);

    player.addEventListener('timeupdate', manageSongPositionUpdate);

    return () => {
      clearInterval(intervalId);
      player.removeEventListener('timeupdate', manageSongPositionUpdate);
      player.removeEventListener('canplay', playSongIfPlayable);
      player.removeEventListener('ended', handleSkipForwardClick);
      player.removeEventListener('play', addSongTitleToTitleBar);
      player.removeEventListener('pause', displayDefaultTitleBar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // VOLUME RELATED SETTINGS
  React.useEffect(() => {
    player.volume = content.volume.value / 100;
    player.muted = content.volume.isMuted;
  }, [content.volume]);

  React.useEffect(() => {
    window.api
      .getUserData()
      .then((res) => {
        if (!res) return;
        dispatch({ type: 'USER_DATA_CHANGE', data: res });
        contentRef.current.userData = res;
        dispatch({ type: 'IS_DARK_MODE_CHANGE', data: res.theme.isDarkMode });
        contentRef.current.isDarkMode = res.theme.isDarkMode;
        dispatch({ type: 'UPDATE_VOLUME', data: res.volume });
        contentRef.current.volume = res.volume;
        toggleShuffling(res.isShuffling);
        toggleRepeat(res.isRepeating);
        if (
          content.navigationHistory.history.at(-1)?.pageTitle !==
          res.defaultPage
        )
          dispatch({
            type: 'CURRENT_ACTIVE_PAGE_CHANGE',
            data: { pageTitle: res.defaultPage, data: undefined },
          });
        if (res.currentSong.songId) playSong(res.currentSong.songId, false);
        player.currentTime = Number(res.currentSong.stoppedPosition);
        // eslint-disable-next-line promise/always-return
        if (res.queue) {
          refQueue.current = {
            ...refQueue.current,
            queue: res.queue.queue || [],
            queueType: res.queue.queueType,
            queueId: res.queue.queueId,
          };
        } else {
          // eslint-disable-next-line promise/no-nesting
          window.api
            .getAllSongs()
            .then((audioData) => {
              if (!audioData) return undefined;
              createQueue(
                audioData.data.map((song) => song.songId),
                'songs'
              );
              return undefined;
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));

    const noticeDataUpdateEvents = (
      _: unknown,
      dataType: DataUpdateEventTypes,
      message = ''
    ) => console.log('Data update event occurred.', dataType, message);

    window.api.toggleSongPlaybackState(() => {
      console.log('Main requested song playback');
      toggleSongPlayback();
    });
    window.api.skipBackwardToPreviousSong(handleSkipBackwardClick);
    window.api.skipForwardToNextSong(handleSkipForwardClick);
    window.api.dataUpdateEvent(noticeDataUpdateEvents);
    return () => {
      window.api.removeTogglePlaybackStateEvent(toggleSongPlayback);
      window.api.removeSkipBackwardToPreviousSongEvent(handleSkipBackwardClick);
      window.api.removeSkipForwardToNextSongEvent(handleSkipForwardClick);
      window.api.removeDataUpdateEventListener(noticeDataUpdateEvents);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notificationPanelTimeoutIdRef = React.useRef(
    undefined as NodeJS.Timer | undefined
  );
  const updateNotificationPanelData = React.useCallback(
    (
      delay = 5000,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contentData: ReactElement<any, any>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: ReactElement<any, any> = <></>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      buttons: ButtonProps[] = [],
      isLoading = false
    ) => {
      if (notificationPanelTimeoutIdRef.current)
        clearTimeout(notificationPanelTimeoutIdRef.current);
      if (delay === 0) {
        dispatch({
          type: 'NOTIFICATION_PANEL_DATA_CHANGE',
          data: {
            ...content.notificationPanelData,
            isVisible: false,
            icon: <></>,
            buttons: [],
            isLoading,
          },
        });
      } else {
        dispatch({
          type: 'NOTIFICATION_PANEL_DATA_CHANGE',
          data: { isVisible: true, content: contentData, icon, buttons },
        });
        notificationPanelTimeoutIdRef.current = setTimeout(
          () =>
            dispatch({
              type: 'NOTIFICATION_PANEL_DATA_CHANGE',
              data: {
                ...content.notificationPanelData,
                isVisible: false,
                icon: <></>,
                isLoading,
              },
            }),
          delay
        );
      }
    },
    [content.notificationPanelData]
  );

  const toggleSongPlayback = React.useCallback(
    (startPlay?: boolean) => {
      if (contentRef.current.currentSongData?.songId) {
        if (typeof startPlay !== 'boolean' || startPlay === player.paused) {
          if (player.paused) {
            player.play().catch((err) => managePlaybackErrors(err));
            return fadeInAudio();
          }
          if (player.ended) {
            player.currentTime = 0;
            player.play().catch((err) => managePlaybackErrors(err));
            return fadeInAudio();
          }
          return fadeOutAudio();
        }
      } else
        updateNotificationPanelData(
          5000,
          <span>Please select a song to play.</span>,
          <span className="material-icons-round-outlined text-lg">error</span>
        );
      return undefined;
    },
    [
      managePlaybackErrors,
      updateNotificationPanelData,
      fadeOutAudio,
      fadeInAudio,
    ]
  );

  const displayMessageFromMain = React.useCallback(
    (_: unknown, message: string, messageCode?: MessageCodes) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const buttons: ButtonProps[] = [];
      let duration = 5000;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-undef-init
      let icon: ReactElement<any, any> | undefined = undefined;
      if (messageCode === 'PARSE_SUCCESSFUL')
        icon = (
          <span className="material-icons-outline icon">file_download</span>
        );
      if (messageCode === 'PARSE_FAILED') {
        duration = 10000;
        buttons.push({
          label: 'Resync Songs',
          iconClassName: 'sync',
          clickHandler: () => window.api.resyncSongsLibrary(),
        });
      }
      updateNotificationPanelData(
        duration,
        <div>{message}</div>,
        icon,
        buttons
      );
    },
    [updateNotificationPanelData]
  );

  React.useEffect(() => {
    window.api.getMessageFromMain(displayMessageFromMain);
    return () => {
      window.api.removeMessageToRendererEventListener(displayMessageFromMain);
    };
  }, [displayMessageFromMain]);

  React.useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: contentRef.current.currentSongData.title,
        artist: Array.isArray(contentRef.current.currentSongData.artists)
          ? contentRef.current.currentSongData.artists
              .map((artist) => artist.name)
              .join(', ')
          : `Unknown Artist`,
        album: contentRef.current.currentSongData.album
          ? contentRef.current.currentSongData.album.name || 'Unknown Album'
          : 'Unknown Album',
        artwork: [
          {
            src: `data:;base64,${contentRef.current.currentSongData.artwork}`,
            sizes: '300x300',
            type: 'image/webp',
          },
        ],
      });
      navigator.mediaSession.setActionHandler('pause', () =>
        toggleSongPlayback(true)
      );
      navigator.mediaSession.setActionHandler('play', () =>
        toggleSongPlayback(false)
      );
      navigator.mediaSession.setActionHandler(
        'previoustrack',
        handleSkipBackwardClick
      );
      navigator.mediaSession.setActionHandler(
        `nexttrack`,
        handleSkipForwardClick
      );
      navigator.mediaSession.playbackState = content.isCurrentSongPlaying
        ? 'playing'
        : 'paused';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.currentSongData, content.isCurrentSongPlaying]);

  const handleContextMenuVisibilityUpdate = React.useCallback(() => {
    if (contentRef.current.contextMenuData.isVisible) {
      dispatch({
        type: 'CONTEXT_MENU_VISIBILITY_CHANGE',
        data: false,
      });
      contentRef.current.contextMenuData.isVisible = false;
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('click', handleContextMenuVisibilityUpdate);
    window.addEventListener('keydown', manageKeyboardShortcuts);
    return () => {
      window.removeEventListener('click', handleContextMenuVisibilityUpdate);
      window.removeEventListener('keydown', manageKeyboardShortcuts);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSongTitleToTitleBar = React.useCallback(() => {
    if (
      contentRef.current.currentSongData.title &&
      contentRef.current.currentSongData.artists
    )
      document.title = `${contentRef.current.currentSongData.title} - ${
        Array.isArray(contentRef.current.currentSongData.artists) &&
        contentRef.current.currentSongData.artists
          .map((artist) => artist.name)
          .join(', ')
        // : contentRef.current.currentSongData.artists.name
      }`;
  }, []);

  const toggleRepeat = React.useCallback((newState?: RepeatTypes) => {
    const repeatState =
      newState ||
      // eslint-disable-next-line no-nested-ternary
      (contentRef.current.isRepeating === 'false'
        ? 'repeat'
        : contentRef.current.isRepeating === 'repeat'
        ? 'repeat-1'
        : 'false');
    contentRef.current.isRepeating = repeatState;
    dispatch({
      type: 'UPDATE_IS_REPEATING_STATE',
      data: repeatState,
    });
  }, []);

  const playSong = React.useCallback(
    (songId: string, isStartPlay = true) => {
      if (typeof songId === 'string') {
        if (contentRef.current.currentSongData.songId === songId)
          return toggleSongPlayback();
        return window.api
          .getSong(songId)
          .then((songData) => {
            if (songData) {
              console.log('playSong', songId, songData.path);
              dispatch({ type: 'CURRENT_SONG_DATA_CHANGE', data: songData });
              contentRef.current.currentSongData = songData;
              if (player.src !== `otoMusic://localFiles/${songData.path}`)
                player.src = `otoMusic://localFiles/${songData.path}`;
              window.api.saveUserData('currentSong.songId', songData.songId);
              refStartPlay.current = isStartPlay;
              if (isStartPlay) toggleSongPlayback();
              if (refQueue.current.queue.length > 0) {
                if (refQueue.current.queue.indexOf(songData.songId) !== -1)
                  refQueue.current.currentSongIndex =
                    refQueue.current.queue.indexOf(songData.songId);
                else {
                  console.log(
                    `song ${songData.title} with id ${songData.songId} is not present in the queue`
                  );
                  refQueue.current.queue.push(songData.songId);
                  if (refQueue.current.currentSongIndex !== null)
                    refQueue.current.currentSongIndex += 1;
                  else refQueue.current.currentSongIndex = 0;
                }
              } else if (refQueue.current.queue.length === 0)
                refQueue.current.queue.push(songData.songId);
            } else console.log(songData);
            return undefined;
          })
          .catch((err) => {
            console.error(err);
            updateNotificationPanelData(
              10000,
              <span>Seems like we can&apos;t play that song.</span>,
              <span className="material-icons-round icon">error_outline</span>
            );
            changePromptMenuData(
              true,
              <div>
                <div className="title-container mt-1 pr-4 flex items-center mb-8 text-font-color-black text-3xl font-medium dark:text-font-color-white">
                  Couldn't Play the Song
                </div>
                <div className="description">
                  Seems like we can't play that song. Please check whether the
                  selected song is available in your system and accessible by
                  the app.
                </div>
                <div className="mt-6">
                  ERROR: {err?.message.split(':').at(-1) ?? 'UNKNOWN'}
                </div>
                <Button
                  label="OK"
                  className="remove-song-from-library-btn !bg-background-color-3 dark:!bg-dark-background-color-3 text-font-color-black dark:text-font-color-black rounded-md w-[10rem] hover:border-background-color-3 dark:hover:border-background-color-3 float-right mt-2"
                  clickHandler={() => changePromptMenuData(false)}
                />
              </div>
            );
          });
      }
      updateNotificationPanelData(
        5000,
        <span>Seems like we can&apos;t play that song.</span>,
        <span className="material-icons-round icon">error_outline</span>
      );
      changePromptMenuData(
        true,
        <ErrorPrompt
          reason="SONG_ID_UNDEFINED"
          message={
            <>
              An error ocurred when trying to play a song. <br />
              ERROR : SONG_ID_UNDEFINED
            </>
          }
        />
      );
      return window.api.sendLogs(
        `======= ERROR OCCURRED WHEN TRYING TO PLAY A S0NG. =======\nERROR : Song id is of unknown type; SONGIDTYPE : ${typeof songId}`
      );
    },
    [toggleSongPlayback, updateNotificationPanelData, changePromptMenuData]
  );

  const changeQueueCurrentSongIndex = React.useCallback(
    (currentSongIndex: number) => {
      console.log('currentSongIndex', currentSongIndex);
      refQueue.current.currentSongIndex = currentSongIndex;
      playSong(refQueue.current.queue[currentSongIndex]);
    },
    [playSong]
  );

  const handleSkipBackwardClick = React.useCallback(() => {
    const { currentSongIndex } = refQueue.current;
    if (player.currentTime > 5) {
      // if (contentRef.current.currentSongData.songId)
      //   window.api.incrementNoOfSongListens(
      //     contentRef.current.currentSongData.songId
      //   );
      player.currentTime = 0;
    } else if (typeof currentSongIndex === 'number') {
      if (currentSongIndex === 0)
        changeQueueCurrentSongIndex(refQueue.current.queue.length - 1);
      else changeQueueCurrentSongIndex(currentSongIndex - 1);
    } else changeQueueCurrentSongIndex(0);
  }, [changeQueueCurrentSongIndex]);

  const handleSkipForwardClick = React.useCallback(() => {
    const { currentSongIndex } = refQueue.current;
    if (contentRef.current.isRepeating === 'repeat-1') {
      player.currentTime = 0;
      toggleSongPlayback(true);
      window.api.incrementNoOfSongListens(
        contentRef.current.currentSongData.songId
      );
    } else if (typeof currentSongIndex === 'number') {
      if (refQueue.current.queue.length > 0) {
        if (refQueue.current.queue.length - 1 === currentSongIndex) {
          if (contentRef.current.isRepeating === 'repeat')
            changeQueueCurrentSongIndex(0);
        } else changeQueueCurrentSongIndex(currentSongIndex + 1);
      } else console.log('Queue is empty.');
    } else changeQueueCurrentSongIndex(0);
  }, [toggleSongPlayback, changeQueueCurrentSongIndex]);

  const createQueue = React.useCallback(
    (
      songIds: string[],
      queueType: QueueTypes,
      isShuffleQueue = false,
      queueId?: string,
      startPlaying = false
    ) => {
      const queue = {
        currentSongIndex: 0,
        queue: songIds.map((songId) => songId),
        queueId,
        queueType,
      };
      if (isShuffleQueue) {
        const { shuffledQueue } = shuffleQueue(queue.queue);
        queue.queue = shuffledQueue;
        queue.currentSongIndex = 0;
      }
      window.api
        .saveUserData('queue', queue)
        .then(() => {
          refQueue.current = queue;
          if (startPlaying) return changeQueueCurrentSongIndex(0);
          return undefined;
        })
        .catch((err: Error) => console.error(err));
    },
    [changeQueueCurrentSongIndex]
  );

  const updateQueueData = React.useCallback(
    (
      currentSongIndex?: number,
      newQueue?: string[],
      isShuffleQueue = false,
      playCurrentSongIndex = true
    ) => {
      const queue: Queue = {
        ...refQueue.current,
        currentSongIndex: currentSongIndex ?? refQueue.current.currentSongIndex,
        queue: newQueue ?? refQueue.current.queue,
      };
      if (Array.isArray(newQueue) && newQueue.length > 1 && isShuffleQueue) {
        const { shuffledQueue } = shuffleQueue(
          queue.queue,
          queue.currentSongIndex ?? undefined
        );
        queue.queue = shuffledQueue;
        queue.currentSongIndex = 0;
      }
      window.api.saveUserData('queue', queue);
      refQueue.current.currentSongIndex = currentSongIndex ?? 0;
      if (newQueue) refQueue.current.queue = newQueue;
      if (playCurrentSongIndex && typeof currentSongIndex === 'number')
        playSong(refQueue.current.queue[currentSongIndex]);
    },
    [playSong]
  );

  const toggleShuffling = React.useCallback((isShuffling?: boolean) => {
    dispatch({ type: 'TOGGLE_SHUFFLE_STATE', data: isShuffling });
    if (isShuffling !== undefined) contentRef.current.isShuffling = isShuffling;
    else contentRef.current.isShuffling = !contentRef.current.isShuffling;
  }, []);

  const updateCurrentSongPlaybackState = React.useCallback(
    (isPlaying: boolean) => {
      if (isPlaying !== content.isCurrentSongPlaying)
        dispatch({ type: 'CURRENT_SONG_PLAYBACK_STATE', data: isPlaying });
    },
    [content.isCurrentSongPlaying]
  );

  const toggleDarkMode = React.useCallback(
    (theme?: 'dark' | 'light') => {
      if (theme) {
        const isDarkMode = theme === 'dark';
        if (isDarkMode !== content.isDarkMode)
          window.api.saveUserData('theme.isDarkMode', isDarkMode);
        dispatch({
          type: 'IS_DARK_MODE_CHANGE',
          data: isDarkMode,
        });
      } else {
        window.api.saveUserData('theme.isDarkMode', !content.isDarkMode);
        dispatch({
          type: 'IS_DARK_MODE_CHANGE',
          data: !content.isDarkMode,
        });
      }
    },
    [content.isDarkMode]
  );

  const updateContextMenuData = React.useCallback(
    (
      isVisible: boolean,
      menuItems: ContextMenuItem[] = [],
      pageX?: number,
      pageY?: number
    ) => {
      dispatch({
        type: 'CONTEXT_MENU_DATA_CHANGE',
        data: {
          isVisible,
          menuItems:
            menuItems.length > 0
              ? menuItems
              : contentRef.current.contextMenuData.menuItems,
          pageX:
            pageX !== undefined
              ? pageX
              : contentRef.current.contextMenuData.pageX,
          pageY:
            pageY !== undefined
              ? pageY
              : contentRef.current.contextMenuData.pageY,
        },
      });
      contentRef.current.contextMenuData = {
        isVisible,
        menuItems:
          menuItems.length > 0
            ? menuItems
            : contentRef.current.contextMenuData.menuItems,
        pageX:
          pageX !== undefined
            ? pageX
            : contentRef.current.contextMenuData.pageX,
        pageY:
          pageY !== undefined
            ? pageY
            : contentRef.current.contextMenuData.pageY,
      };
    },
    []
  );

  const changeCurrentActivePage = React.useCallback(
    (pageClass: PageTitles, data?: object) =>
      (content.navigationHistory.history.at(-1)?.pageTitle !== pageClass ||
        content.navigationHistory.history.at(-1)?.data !== data) &&
      dispatch({
        type: 'CURRENT_ACTIVE_PAGE_CHANGE',
        data: {
          pageTitle: pageClass,
          data,
        },
      }),
    [content.navigationHistory.history]
  );

  const updatePageHistoryIndex = React.useCallback(
    (type: 'increment' | 'decrement', index?: number) => {
      if (type === 'decrement') {
        const { history } = content.navigationHistory;
        history.pop();
        dispatch({
          type: 'UPDATE_NAVIGATION_HISTORY_DATA',
          data: {
            pageHistoryIndex:
              index !== undefined &&
              index < content.navigationHistory.pageHistoryIndex
                ? content.navigationHistory.pageHistoryIndex - index
                : content.navigationHistory.pageHistoryIndex - 1,
            history,
          } as NavigationHistoryData,
        });
      }
    },
    [content.navigationHistory]
  );

  const updateMiniPlayerStatus = React.useCallback(
    (isVisible: boolean) => {
      if (content.isMiniPlayer !== isVisible)
        dispatch({ type: 'UPDATE_MINI_PLAYER_STATE', data: isVisible });
    },
    [content.isMiniPlayer]
  );

  const toggleIsFavorite = React.useCallback((isFavorite?: boolean) => {
    const newFavorite =
      isFavorite ?? !contentRef.current.currentSongData.isAFavorite;
    if (contentRef.current.currentSongData.isAFavorite !== newFavorite)
      window.api
        .toggleLikeSong(contentRef.current.currentSongData.songId, newFavorite)
        .then(() => {
          contentRef.current.currentSongData.isAFavorite = newFavorite;
          return dispatch({
            type: 'TOGGLE_IS_FAVORITE_STATE',
            data: newFavorite,
          });
        })
        .catch((err) => console.error(err));
  }, []);

  const updateVolume = React.useCallback((volume: number) => {
    if (fadeInIntervalId.current) clearInterval(fadeInIntervalId.current);
    if (fadeOutIntervalId.current) clearInterval(fadeOutIntervalId.current);
    window.api
      .saveUserData('volume.value', volume)
      .then(() => {
        contentRef.current.volume.value = volume;
        return dispatch({
          type: 'UPDATE_VOLUME_VALUE',
          data: volume,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const updateSongPosition = React.useCallback((position: number) => {
    if (position >= 0 && position <= player.duration)
      player.currentTime = position;
  }, []);

  const toggleMutedState = React.useCallback(
    (isMuted?: boolean) => {
      if (isMuted !== undefined)
        if (isMuted !== content.volume.isMuted)
          dispatch({ type: 'UPDATE_MUTED_STATE', data: isMuted });
        else dispatch({ type: 'UPDATE_MUTED_STATE' });
    },
    [content.volume.isMuted]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateCurrentlyActivePageData = React.useCallback((data: any) => {
    dispatch({ type: 'CURRENT_ACTIVE_PAGE_DATA_UPDATE', data });
  }, []);

  const toggleReducedMotion = React.useCallback(
    (state?: boolean) => {
      window.api
        .saveUserData(
          'preferences.isReducedMotion',
          state !== undefined
            ? state
            : content.userData?.preferences.isReducedMotion || false
        )
        .then(() =>
          dispatch({
            type: 'TOGGLE_REDUCED_MOTION',
            data: state,
          })
        )
        .catch((err) => console.error(err));
    },
    [content.userData?.preferences.isReducedMotion]
  );

  const toggleSongIndexing = React.useCallback(
    (state?: boolean) => {
      window.api
        .saveUserData(
          'preferences.songIndexing',
          state !== undefined
            ? state
            : content.userData?.preferences.songIndexing || false
        )
        .then(() =>
          dispatch({
            type: 'TOGGLE_SONG_INDEXING',
            data: state,
          })
        )
        .catch((err) => console.error(err));
    },
    [content.userData?.preferences.songIndexing]
  );

  const manageKeyboardShortcuts = React.useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.ctrlKey && e.key === 'ArrowUp')
        updateVolume(player.volume + 0.05 <= 1 ? player.volume * 100 + 5 : 100);
      else if (e.ctrlKey && e.key === 'ArrowDown')
        updateVolume(player.volume - 0.05 >= 0 ? player.volume * 100 - 5 : 0);
      else if (e.ctrlKey && e.key === 'm') toggleMutedState(!player.muted);
      else if (e.ctrlKey && e.key === 'ArrowRight') handleSkipForwardClick();
      else if (e.ctrlKey && e.key === 'ArrowLeft') handleSkipBackwardClick();
      else if (e.ctrlKey && e.key === 's') toggleShuffling();
      else if (e.ctrlKey && e.key === 't') toggleRepeat();
      else if (e.ctrlKey && e.key === 'h') toggleIsFavorite();
      else if (e.ctrlKey && e.key === 'l') {
        const currentlyActivePage =
          content.navigationHistory.history[
            content.navigationHistory.pageHistoryIndex
          ];
        if (currentlyActivePage.pageTitle === 'Lyrics')
          changeCurrentActivePage('Home');
        else changeCurrentActivePage('Lyrics');
      } else if (e.ctrlKey && e.key === 'n')
        updateMiniPlayerStatus(!content.isMiniPlayer);
      else if (e.ctrlKey && e.key === 'q') {
        const currentlyActivePage =
          content.navigationHistory.history[
            content.navigationHistory.pageHistoryIndex
          ];
        if (currentlyActivePage.pageTitle === 'CurrentQueue')
          changeCurrentActivePage('Home');
        else changeCurrentActivePage('CurrentQueue');
      } else if (e.code === 'Space') toggleSongPlayback();
      else if (e.key === 'ArrowLeft') {
        if (player.currentTime - 10 >= 0) player.currentTime -= 10;
        else player.currentTime = 0;
      } else if (e.key === 'ArrowRight') {
        if (player.currentTime + 10 < player.duration) player.currentTime += 10;
      }
    },
    [
      changeCurrentActivePage,
      content.isMiniPlayer,
      content.navigationHistory.history,
      content.navigationHistory.pageHistoryIndex,
      handleSkipBackwardClick,
      handleSkipForwardClick,
      toggleIsFavorite,
      toggleMutedState,
      toggleRepeat,
      toggleShuffling,
      toggleSongPlayback,
      updateMiniPlayerStatus,
      updateVolume,
    ]
  );

  const updatePageSortingOrder = React.useCallback(
    (page: PageSortTypes, state: unknown) => {
      if (content.userData) {
        const updatedUserData = content.userData;
        if (page === 'sortingStates.songsPage')
          updatedUserData.sortingStates.songsPage = state as SongSortTypes;
        if (page === 'sortingStates.artistsPage')
          updatedUserData.sortingStates.artistsPage = state as ArtistSortTypes;
        if (page === 'sortingStates.albumsPage')
          updatedUserData.sortingStates.albumsPage = state as AlbumSortTypes;
        if (page === 'sortingStates.genresPage')
          updatedUserData.sortingStates.genresPage = state as GenreSortTypes;
        window.api.savePageSortingState(page, state);
        dispatch({ type: 'USER_DATA_CHANGE', data: updatedUserData });
      }
    },
    [content.userData]
  );

  const shuffleQueue = (songIds: string[], currentSongIndex?: number) => {
    const currentSongId = currentSongIndex
      ? songIds.splice(currentSongIndex, 1)[0]
      : undefined;
    for (let i = songIds.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [songIds[i], songIds[randomIndex]] = [songIds[randomIndex], songIds[i]];
    }
    if (currentSongId) songIds.unshift(currentSongId);
    return { shuffledQueue: songIds, positons: [] as number[] };
  };

  const appContextStateValues = {
    isDarkMode: content.isDarkMode,
    isContextMenuVisible: contentRef.current.contextMenuData.isVisible,
    contextMenuItems: contentRef.current.contextMenuData.menuItems,
    contextMenuPageX: contentRef.current.contextMenuData.pageX,
    contextMenuPageY: contentRef.current.contextMenuData.pageY,
    PromptMenuData: content.PromptMenuData,
    currentSongData: contentRef.current.currentSongData,
    currentlyActivePage:
      content.navigationHistory.history[
        content.navigationHistory.pageHistoryIndex
      ],
    notificationPanelData: content.notificationPanelData,
    userData: content.userData,
    queue: refQueue.current,
    isCurrentSongPlaying: content.isCurrentSongPlaying,
    pageHistoryIndex: content.navigationHistory.pageHistoryIndex,
    isMiniPlayer: content.isMiniPlayer,
    volume: content.volume.value,
    isMuted: content.volume.isMuted,
    isRepeating: contentRef.current.isRepeating,
    isShuffling: content.isShuffling,
    isPlaying: !player.paused,
  };

  const appUpdateContextValues: AppUpdateContextType = {
    toggleDarkMode,
    updateContextMenuData,
    changePromptMenuData,
    playSong,
    changeCurrentActivePage,
    updateCurrentlyActivePageData,
    updateNotificationPanelData,
    toggleReducedMotion,
    toggleSongIndexing,
    createQueue,
    updatePageHistoryIndex,
    changeQueueCurrentSongIndex,
    updateCurrentSongPlaybackState,
    updateMiniPlayerStatus,
    handleSkipBackwardClick,
    handleSkipForwardClick,
    updateSongPosition,
    updateVolume,
    toggleMutedState,
    toggleRepeat,
    toggleShuffling,
    toggleIsFavorite,
    toggleSongPlayback,
    updateQueueData,
    updatePageSortingOrder,
  };

  return (
    <AppContext.Provider value={appContextStateValues}>
      <AppUpdateContext.Provider value={appUpdateContextValues}>
        {!content.isMiniPlayer && (
          <div
            className={`App ${
              content.isDarkMode
                ? 'dark bg-dark-background-color-1'
                : 'bg-background-color-1'
            } ${
              content.userData && content.userData.preferences.isReducedMotion
                ? 'reduced-motion transition-none animate-none'
                : ''
            } w-full h-screen flex flex-col items-center [&.blurred_#title-bar]:opacity-40`}
          >
            <ContextMenu />
            <PromptMenu />
            <Header />
            <BodyAndSideBarContainer />
            <SongPositionContext.Provider
              value={{ songPosition: player.currentTime }}
            >
              <SongControlsContainer />
            </SongPositionContext.Provider>
          </div>
        )}
        <SongPositionContext.Provider
          value={{ songPosition: player.currentTime }}
        >
          {content.isMiniPlayer && <MiniPlayer />}
        </SongPositionContext.Provider>
      </AppUpdateContext.Provider>
    </AppContext.Provider>
  );
}
