import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface LeaderboardStyle {
  containerStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  avatarStyle?: ImageStyle;
  pointStyle?: TextStyle;
  rankStyle?: TextStyle;
  usernameStyle?: TextStyle;
  podiumStyle?: {
    first?: ViewStyle;
    second?: ViewStyle;
    third?: ViewStyle;
  };
  podiumNameRenderer?: (user: LeaderboardEntry | undefined) => React.ReactNode;
  podiumRankRenderer?: (rank: number) => React.ReactNode;
  profileStyle?: ProfileStyle;
  searchBarStyle?: ViewStyle;
  sortingButtonStyle?: ViewStyle;
  sortingButtonActiveStyle?: ViewStyle;
  sortingTextStyle?: TextStyle;
  sortingTextActiveStyle?: TextStyle;
  sortingPosition?: 'top' | 'bottom';
  rankDifferenceIcon?: (difference: number) => React.ReactNode;
}

export interface ProfileStyle {
  showAvatar?: boolean;
  showName?: boolean;
  showPoints?: boolean;
  showCloseButton?: boolean;

  overlayStyle?: ViewStyle;
  modalStyle?: ViewStyle;
  avatarStyle?: ImageStyle;
  nameStyle?: TextStyle;
  pointsStyle?: TextStyle;
  closeButtonStyle?: ViewStyle;
  closeButtonTextStyle?: TextStyle;
  renderCustomContent?: (user: LeaderboardEntry) => React.ReactNode;

  pointsLabel?: string;
  closeLabel?: string;
}

export default interface LeaderboardEntry {
  picture?: string;
  name: string;
  points: number;
  sorting?: {
    points: number;
    date: Date;
  }[];
}

export type LeaderboardEntryDiff = LeaderboardEntry & {
  rankDifference: number;
  rank: number;
};
