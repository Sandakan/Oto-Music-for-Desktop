/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { createContext, ReactElement } from 'react';
import { ButtonProps } from 'renderer/components/Button';

export interface AppStateContextType {
  // THEME
  isDarkMode: boolean;
  // CONTEXT MENU
  isContextMenuVisible: boolean;
  contextMenuItems: ContextMenuItem[];
  contextMenuPageX: number;
  contextMenuPageY: number;
  // PROMPT MENU
  PromptMenuData: {
    content: any;
    isVisible: boolean;
    className: string;
  };
  // NOTIFICATION PANEL
  notificationPanelData: NotificationPanelData;
  // CURRENTLY ACTVIE PAGE AND NAVIGATION HISTORY
  currentlyActivePage: { pageTitle: PageTitles; data?: any };
  pageHistoryIndex: number;
  // AUDIO PLAYBACK
  currentSongData: AudioData;
  userData: UserData | undefined;
  isCurrentSongPlaying: boolean;
  // songPosition: number;
  volume: number;
  isMuted: boolean;
  isRepeating: RepeatTypes;
  isShuffling: boolean;
  isPlaying: boolean;
  queue: Queue;
  // QUEUE
  // MINI PLAYER
  isMiniPlayer: boolean;
}

export interface AppUpdateContextType {
  toggleDarkMode: (theme?: 'dark' | 'light') => void;
  updateContextMenuData: (
    isVisible: boolean,
    menuItems?: ContextMenuItem[],
    pageX?: number,
    pageY?: number
  ) => void;
  changePromptMenuData: (
    isVisible: boolean,
    content?: ReactElement<any, any>,
    className?: string
  ) => void;
  updateNotificationPanelData: (
    delay: number | undefined,
    content: ReactElement<any, any>,
    icon?: ReactElement<any, any>,
    buttons?: ButtonProps[],
    isLoading?: boolean
  ) => void;
  changeCurrentActivePage: (pageTitle: PageTitles, data?: any) => void;
  updatePageHistoryIndex: (
    type: 'increment' | 'decrement',
    index?: number
  ) => void;
  updateCurrentlyActivePageData: (data: any) => void;
  toggleReducedMotion: (state?: boolean) => void;
  toggleSongIndexing: (state?: boolean) => void;
  playSong: (songId: string, isStartPlay?: boolean) => void;
  updateCurrentSongPlaybackState: (isPlaying: boolean) => void;
  handleSkipBackwardClick: () => void;
  handleSkipForwardClick: () => void;
  toggleShuffling: (isShuffling?: boolean) => void;
  toggleSongPlayback: () => void;
  toggleRepeat: () => void;
  toggleIsFavorite: (isFavorite: boolean) => void;
  toggleMutedState: (isMuted?: boolean) => void;
  updateVolume: (volume: number) => void;
  updateSongPosition: (position: number) => void;
  createQueue: (
    songIds: string[],
    queueType: QueueTypes,
    isShuffleQueue?: boolean,
    queueId?: string,
    startPlaying?: boolean
  ) => void;
  updateQueueData: (
    currentSongIndex?: number,
    queue?: string[],
    isShuffleQueue?: boolean,
    playCurrentSongIndex?: boolean
  ) => void;
  changeQueueCurrentSongIndex: (currentSongIndex: number) => void;
  updateMiniPlayerStatus: (isVisible: boolean) => void;
  updatePageSortingOrder: (page: PageSortTypes, state: unknown) => void;
}

export interface SongPositionContextType {
  songPosition: number;
}

export const AppContext = createContext({} as AppStateContextType);

export const AppUpdateContext = createContext({} as AppUpdateContextType);

export const SongPositionContext = createContext({} as SongPositionContextType);
