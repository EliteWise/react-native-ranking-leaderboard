import { Leaderboard } from 'react-native-ranking-leaderboard';
import type LeaderboardEntry from '../../src/leaderboard';
import CustomProfile from './CustomProfile';
import type { LeaderboardStyle } from '../../src/leaderboard';
import { Text, View } from 'react-native';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react-native';

export default function App() {
  const data: LeaderboardEntry[] = [
    {
      name: 'EliteWise',
      points: 1500,
      picture: 'https://i.pravatar.cc/60?img=3',
      sorting: [
        { points: 100, date: new Date(2025, 4, 1) },
        { points: 50, date: new Date(2025, 4, 2) },
      ],
    },
    {
      name: 'Bob',
      points: 1200,
      picture: 'https://i.pravatar.cc/60?img=50',
      sorting: [
        { points: 26, date: new Date(2025, 4, 5) },
        { points: 33, date: new Date(2025, 4, 2) },
        { points: 88, date: new Date(2025, 5, 5) },
        { points: 105, date: new Date(2025, 5, 2) },
      ],
    },
    {
      name: 'Charlie',
      points: 1100,
      picture: 'https://i.pravatar.cc/60?img=18',
      sorting: [
        { points: 100, date: new Date(2025, 5, 5) },
        { points: 50, date: new Date(2025, 5, 2) },
      ],
    },
    {
      name: 'Anne',
      points: 950,
      picture: 'https://i.pravatar.cc/60?img=19',
      sorting: [
        { points: 121, date: new Date(2025, 5, 9) },
        { points: 50, date: new Date(2025, 5, 9) },
      ],
    },
    {
      name: 'Eve',
      points: 900,
      picture: 'https://i.pravatar.cc/60?img=20',
      sorting: [
        { points: 100, date: new Date(2025, 5, 9) },
        { points: 50, date: new Date(2025, 5, 9) },
      ],
    },
    {
      name: 'Fiona',
      points: 850,
      picture: 'https://i.pravatar.cc/60?img=21',
      sorting: [
        { points: 224, date: new Date(2025, 5, 5) },
        { points: 50, date: new Date(2025, 5, 6) },
      ],
    },
    {
      name: 'Aline',
      points: 800,
      picture: 'https://i.pravatar.cc/60?img=36',
      sorting: [
        { points: 220, date: new Date(2025, 5, 9) },
        { points: 50, date: new Date(2025, 5, 9) },
      ],
    },
    {
      name: 'George',
      points: 750,
      picture: 'https://i.pravatar.cc/60?img=65',
      sorting: [
        { points: 102, date: new Date(2025, 5, 5) },
        { points: 50, date: new Date(2025, 5, 6) },
      ],
    },
    {
      name: 'Hannah',
      points: 700,
      picture: 'https://i.pravatar.cc/60?img=24',
      sorting: [
        { points: 360, date: new Date(2025, 5, 5) },
        { points: 150, date: new Date(2025, 5, 9) },
        { points: 50, date: new Date(2025, 5, 1) },
        { points: 50, date: new Date(2025, 4, 28) },
      ],
    },
    {
      name: 'Ivan',
      points: 650,
      picture: 'https://i.pravatar.cc/60?img=68',
      sorting: [
        { points: 10, date: new Date(2025, 4, 4) },
        { points: 30, date: new Date(2025, 4, 5) },
        { points: 50, date: new Date(2025, 5, 10) },
        { points: 66, date: new Date(2025, 5, 11) },
      ],
    },
  ];

  const RankDifferenceIcon = (difference: number) => {
    if (difference < 0) return <ArrowDownRight color="red" size={20} />;
    if (difference > 0) return <ArrowUpRight color="green" size={20} />;
    return <Minus color="gray" size={20} />;
  };

  const darkStyle: LeaderboardStyle = {
    containerStyle: {
      backgroundColor: '#121212',
      paddingVertical: 40,
    },
    podiumStyle: {
      first: { backgroundColor: '#00FFD1', height: 110 },
      second: { backgroundColor: '#00A3FF', height: 90 },
      third: { backgroundColor: '#FF00C8', height: 70 },
    },
    itemStyle: {
      backgroundColor: '#1e1e1e',
      borderColor: '#333',
      borderWidth: 1,
    },
    rankStyle: {
      color: '#00FFD1',
      fontWeight: 'bold',
      fontSize: 16,
    },
    usernameStyle: {
      color: '#ffffff',
      fontSize: 18,
    },
    pointStyle: {
      color: '#00FFD1',
      fontSize: 16,
      fontWeight: 600 as 600,
    },
    avatarStyle: {
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#00FFD1',
    },
    profileStyle: {
      overlayStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
      },
      modalStyle: {
        backgroundColor: '#222',
        borderRadius: 30,
        padding: 32,
      },
      avatarStyle: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#00FFD1',
      },
      nameStyle: {
        color: '#ffffff',
        fontSize: 22,
      },
      pointsStyle: {
        color: '#00FFD1',
        fontSize: 18,
      },
      closeButtonTextStyle: {
        color: '#FF4D4D',
        fontSize: 28,
      },
      closeButtonStyle: {
        position: 'absolute',
        top: 20,
        right: 20,
      },
      pointsLabel: 'Score',
      closeLabel: '×',
    },
    searchBarStyle: {
      backgroundColor: '#fff',
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    sortingButtonStyle: {
      backgroundColor: 'yellow',
    },
    sortingButtonActiveStyle: {
      backgroundColor: 'red',
    },
    sortingTextActiveStyle: {
      color: 'orange',
    },
    sortingPosition: 'bottom',
    rankDifferenceIcon: RankDifferenceIcon,
    podiumRankRenderer: (rank) => {
      switch (rank) {
        case 1:
          return <Text style={{ color: 'gold', fontSize: 12 }}>🥇 Top 1</Text>;
        case 2:
          return (
            <Text style={{ color: 'silver', fontSize: 12 }}>🥈 Top 2</Text>
          );
        case 3:
          return (
            <Text style={{ color: 'bronze', fontSize: 12 }}>🥉 Top 3</Text>
          );
        default:
          return <Text>{rank}</Text>;
      }
    },
  };

  console.log(darkStyle);

  return (
    <Leaderboard
      entries={data}
      showPodium={true}
      showSortingTypes={true}
      showSearchBar={true}
      showRankDifference={true} // Custom style
      style={{
        rankDifferenceIcon: RankDifferenceIcon,
      }}
      customProfile={(user, onClose) => {
        // Custom profile component
        if (!user) return null;
        return (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomProfile user={user} onClose={onClose} />
          </View>
        );
      }}
    />
  );
}
