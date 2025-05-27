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
}

export default interface LeaderboardEntry {
  rank?: number;
  picture?: string;
  name: string;
  points: number;
}
