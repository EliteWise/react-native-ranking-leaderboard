import { Leaderboard } from 'react-native-ranking-leaderboard';
import type LeaderboardEntry from '../../src/leaderboard';
import type { LeaderboardStyle } from '../../src/leaderboard';

export default function App() {
  const data: LeaderboardEntry[] = [
    {
      rank: 1,
      name: 'EliteWise',
      points: 100,
      picture: 'https://i.pravatar.cc/60?img=1',
    },
    {
      rank: 2,
      name: 'Bob',
      points: 1200,
      picture: 'https://i.pravatar.cc/60?img=2',
    },
    {
      rank: 3,
      name: 'Charlie',
      points: 1100,
      picture: 'https://i.pravatar.cc/60?img=3',
    },
    {
      rank: 4,
      name: 'David',
      points: 950,
      picture: 'https://i.pravatar.cc/60?img=4',
    },
    {
      rank: 5,
      name: 'Eve',
      points: 900,
      picture: 'https://i.pravatar.cc/60?img=5',
    },
  ];

  const style: LeaderboardStyle = {
    containerStyle: {
      backgroundColor: 'grey',
    },
  };

  return <Leaderboard entries={data} showPodium={true} style={style} />;
}
