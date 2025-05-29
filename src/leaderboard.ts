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
  profileStyle?: ProfileStyle;
}

export interface ProfileStyle {
  overlayStyle?: ViewStyle;
  modalStyle?: ViewStyle;
  avatarStyle?: ImageStyle;
  nameStyle?: TextStyle;
  pointsStyle?: TextStyle;
  closeButtonStyle?: ViewStyle;
  closeButtonTextStyle?: TextStyle;

  pointsLabel?: string;
  closeLabel?: string;
}

export default interface LeaderboardEntry {
  rank?: number;
  picture?: string;
  name: string;
  points: number;
}
