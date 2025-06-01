import { Leaderboard } from 'react-native-ranking-leaderboard';
import type LeaderboardEntry from '../../src/leaderboard';
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function App() {
  const data: LeaderboardEntry[] = [
    {
      rank: 1,
      name: 'EliteWise',
      points: 1500,
      picture: 'https://i.pravatar.cc/60?img=3',
    },
    {
      rank: 2,
      name: 'Bob',
      points: 1200,
      picture: 'https://i.pravatar.cc/60?img=50',
    },
    {
      rank: 3,
      name: 'Charlie',
      points: 1100,
      picture: 'https://i.pravatar.cc/60?img=18',
    },
    {
      rank: 4,
      name: 'Anne',
      points: 950,
      picture: 'https://i.pravatar.cc/60?img=19',
    },
    {
      rank: 5,
      name: 'Eve',
      points: 900,
      picture: 'https://i.pravatar.cc/60?img=20',
    },
    {
      rank: 6,
      name: 'Fiona',
      points: 850,
      picture: 'https://i.pravatar.cc/60?img=21',
    },
    {
      rank: 7,
      name: 'Aline',
      points: 800,
      picture: 'https://i.pravatar.cc/60?img=36',
    },
    {
      rank: 8,
      name: 'George',
      points: 750,
      picture: 'https://i.pravatar.cc/60?img=65',
    },
    {
      rank: 9,
      name: 'Hannah',
      points: 700,
      picture: 'https://i.pravatar.cc/60?img=24',
    },
    {
      rank: 10,
      name: 'Ivan',
      points: 650,
      picture: 'https://i.pravatar.cc/60?img=68',
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const darkStyle = {
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
      fontWeight: '600',
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
  };

  console.log(darkStyle);

  type CustomProfileProps = {
    user: LeaderboardEntry | null;
    onClose: () => void;
  };

  const CustomProfile = ({ user, onClose }: CustomProfileProps) => {
    if (!user) return null;

    return (
      <Modal
        visible={true}
        onRequestClose={onClose}
        transparent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 80,
                  borderRadius: 12,
                  alignItems: 'center',
                }}
              >
                <Text>Add anything you want! 🧡</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <Leaderboard
      entries={data}
      showPodium={false}
      customProfile={(user, onClose) => (
        <CustomProfile user={user} onClose={onClose} />
      )}
    />
  );
}
