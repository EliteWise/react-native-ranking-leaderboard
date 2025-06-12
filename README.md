# 🏆 react-native-ranking-leaderboard

**Customizable and modern leaderboard component for React Native apps.**

I’ve always been obsessed with rankings in games — So I decided to turn that obsession into the best leaderboard library.

## Features

- 🥇 Podium for top 3 users
- 📋 Scrollable list
- 👤 Tap a user to open their profile
- 🎨 Fully customizable styles via props

## Preview

<table>
  <tr>
    <td>
      <img src="./src/assets/leaderboard.gif" alt="Demo" width="300" />
    </td>
    <td>
      <img src="./src/assets/default-style.png" alt="default" width="300" />
    </td>
    <td>
      <img src="./src/assets/dark-style.png" alt="dark" width="300" />
    </td>
  </tr>
</table>

## Installation

```bash
yarn add react-native-ranking-leaderboard
# or
npm install react-native-ranking-leaderboard
```

## How to use it?

```ts
const data = [
  { name: 'Alice', points: 1200, picture: 'https://example.com/alice.jpg' },
  { name: 'Bob', points: 1100, picture: 'https://example.com/bob.jpg' },
  { name: 'Charlie', points: 1000, picture: 'https://example.com/charlie.jpg' },
  { name: 'Daisy', points: 950, picture: 'https://example.com/daisy.jpg' },
  { name: 'Ethan', points: 900 },
];
```

```tsx
<Leaderboard
  entries={data}
  showPodium={true}
  showSortingTypes={true}
  showSearchBar={true}
  showRankDifference={false}
  style={{
    containerStyle: { backgroundColor: '#f0f0f0' },
    podiumStyle: {
      first: { backgroundColor: 'gold' },
      second: { backgroundColor: 'silver' },
      third: { backgroundColor: '#cd7f32' },
    },
    itemStyle: { backgroundColor: '#ffffff' },
    rankStyle: { color: '#333' },
    usernameStyle: { fontSize: 16 },
    pointStyle: { fontWeight: 'bold' },
    avatarStyle: { borderRadius: 18 },
  }}
/>
```

## Advanced Props

```tsx
// Adding your custom profile component

type CustomProfileProps = {
  user: LeaderboardEntry | null;
  onClose: () => void;
};

const CustomProfile = ({ user, onClose }: CustomProfileProps) => {
  if (!user) return null;

  return (
    <Modal visible={true} onRequestClose={onClose} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <TouchableWithoutFeedback>
            <View style={{ backgroundColor: 'white', padding: 80, borderRadius: 12, alignItems: 'center' }}>
              <Text>Add anything you want! 🧡</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

<Leaderboard
  entries={data}
  showPodium={false}
  customProfile={(user, onClose) => <CustomProfile user={user} onClose={onClose} />}
/>
```

```tsx
// Customize Rank Difference

import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react-native';

const RankDifferenceIcon = (difference: number) => {
  if (difference < 0) return <ArrowDownRight color="red" size={20} />;
  if (difference > 0) return <ArrowUpRight color="green" size={20} />;
  return <Minus color="gray" size={20} />;
};

<Leaderboard
  entries={data}
  showPodium={false}
  showSortingTypes={true} // Show buttons 'weekly' / 'monthly' / 'all time'
  showRankDifference={true} // Displays the change in user rankings compared to the previous week or month
  style={{
    rankDifferenceIcon: RankDifferenceIcon,
  }}
/>
```

More features will come soon!

Made with passion by [EliteWise](https://github.com/EliteWise) 🧡
