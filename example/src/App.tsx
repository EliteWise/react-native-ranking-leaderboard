import { Leaderboard } from 'react-native-ranking-leaderboard';
import type LeaderboardEntry from '../../src/leaderboard';
import CustomProfile from './CustomProfile';
import type { LeaderboardStyle } from '../../src/leaderboard';
import { View } from 'react-native';

export default function App() {
  const data: LeaderboardEntry[] = [
    {
      rank: 1,
      name: 'EliteWise',
      points: 1500,
      picture: 'https://i.pravatar.cc/60?img=3',
      sorting: [
        { points: 100, date: new Date(2025, 4, 1) },
        { points: 50, date: new Date(2025, 4, 2) },
      ],
    },
    {
      rank: 2,
      name: 'Bob',
      points: 1200,
      picture: 'https://i.pravatar.cc/60?img=50',
      sorting: [
        { points: 100, date: new Date(2025, 5, 5) },
        { points: 50, date: new Date(2025, 5, 2) },
      ],
    },
    {
      rank: 3,
      name: 'Charlie',
      points: 1100,
      picture: 'https://i.pravatar.cc/60?img=18',
      sorting: [
        { points: 100, date: new Date(2025, 5, 5) },
        { points: 50, date: new Date(2025, 5, 2) },
      ],
    },
    {
      rank: 4,
      name: 'Anne',
      points: 950,
      picture: 'https://i.pravatar.cc/60?img=19',
      sorting: [
        { points: 100, date: new Date(2025, 4, 1) },
        { points: 50, date: new Date(2025, 4, 2) },
      ],
    },
    {
      rank: 5,
      name: 'Eve',
      points: 900,
      picture: 'https://i.pravatar.cc/60?img=20',
      sorting: [
        { points: 100, date: new Date(2025, 4, 1) },
        { points: 50, date: new Date(2025, 4, 2) },
      ],
    },
    {
      rank: 6,
      name: 'Fiona',
      points: 850,
      picture: 'https://i.pravatar.cc/60?img=21',
      sorting: [
        { points: 100, date: new Date(2025, 5, 5) },
        { points: 50, date: new Date(2025, 5, 6) },
      ],
    },
    {
      rank: 7,
      name: 'Aline',
      points: 800,
      picture: 'https://i.pravatar.cc/60?img=36',
      sorting: [
        { points: 100, date: new Date(2025, 4, 1) },
        { points: 50, date: new Date(2025, 4, 2) },
      ],
    },
    {
      rank: 8,
      name: 'George',
      points: 750,
      picture: 'https://i.pravatar.cc/60?img=65',
      sorting: [
        { points: 100, date: new Date(2025, 5, 5) },
        { points: 50, date: new Date(2025, 5, 6) },
      ],
    },
    {
      rank: 9,
      name: 'Hannah',
      points: 700,
      picture: 'https://i.pravatar.cc/60?img=24',
      sorting: [
        { points: 100, date: new Date(2025, 5, 5) },
        { points: 50, date: new Date(2025, 5, 6) },
      ],
    },
    {
      rank: 10,
      name: 'Ivan',
      points: 650,
      picture: 'https://i.pravatar.cc/60?img=68',
      sorting: [
        { points: 100, date: new Date(2025, 5, 25) },
        { points: 50, date: new Date(2025, 5, 24) },
      ],
    },
  ];

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
    sortingPosition: 'top',
  };

  console.log(darkStyle);

  return (
    <Leaderboard
      entries={data}
      showPodium={true}
      showSortingTypes={false}
      showSearchBar={false}
      style={darkStyle} // Custom style
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
