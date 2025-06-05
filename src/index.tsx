import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import type LeaderboardEntry from './leaderboard';
import type { LeaderboardStyle } from './leaderboard';
import { useState } from 'react';
import { LeaderboardProfile } from './profile';

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  showPodium?: boolean;
  showSearchBar?: boolean;
  enableProfiles?: boolean;
  style?: LeaderboardStyle;
  customProfile?: (
    user: LeaderboardEntry | null,
    onClose: () => void
  ) => React.ReactNode;
};

export function Leaderboard({
  entries,
  style,
  showPodium = true,
  showSearchBar = true,
  enableProfiles = true,
  customProfile,
}: LeaderboardProps) {
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  // Search Bar
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = entries.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const podiumEntries = filteredEntries.slice(0, 3);
  const restEntries =
    searchQuery.trim() === '' && showPodium
      ? filteredEntries.slice(3)
      : filteredEntries;

  const isSearchActive = searchQuery.trim() !== '';
  const rankOffset = showPodium && !isSearchActive ? 3 : 0;

  /*const [sorting, setSorting] = useState<'weekly' | 'monthly' | 'alltime'>(
    'alltime'
  );

  const sortingTypes: ('weekly' | 'monthly' | 'alltime')[] = [
    'weekly',
    'monthly',
    'alltime',
  ];*/

  if (!entries || entries.length === 0) {
    return (
      <View
        style={[
          styles.container,
          style?.containerStyle,
          { flex: 1, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={styles.emptyText}>No users yet 😕</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style?.containerStyle]}>
      {showSearchBar && (
        <TextInput
          style={[styles.searchBar, style?.searchBarStyle]}
          placeholder="Search users..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
      {showPodium && searchQuery.trim() === '' && podiumEntries.length >= 1 && (
        <View style={styles.podiumContainer}>
          {/* 2nd place */}
          {podiumEntries[1] && (
            <TouchableOpacity
              style={styles.podiumColumn}
              onPress={() => {
                if (enableProfiles) {
                  setSelectedUser(podiumEntries[1] ?? null);
                  setModalVisible(true);
                }
              }}
            >
              {podiumEntries[1]?.picture && (
                <Image
                  source={{ uri: podiumEntries[1]?.picture || '' }}
                  style={styles.avatar}
                />
              )}
              <View
                style={[
                  styles.podiumBlock,
                  styles.second,
                  style?.podiumStyle?.second,
                ]}
              >
                <Text style={styles.podiumRank}>2</Text>
              </View>
              <Text style={styles.playerName}>{podiumEntries[1]?.name}</Text>
            </TouchableOpacity>
          )}

          {/* 1st place */}
          {podiumEntries[0] && (
            <TouchableOpacity
              style={styles.podiumColumn}
              onPress={() => {
                if (enableProfiles) {
                  setSelectedUser(podiumEntries[0] ?? null);
                  setModalVisible(true);
                }
              }}
            >
              {podiumEntries[0]?.picture && (
                <Image
                  source={{ uri: podiumEntries[0]?.picture || '' }}
                  style={[styles.avatar, styles.firstAvatar]}
                />
              )}
              <View
                style={[
                  styles.podiumBlock,
                  styles.first,
                  style?.podiumStyle?.first,
                ]}
              >
                <Text style={styles.podiumRank}>1</Text>
              </View>
              <Text style={styles.playerName}>{podiumEntries[0]?.name}</Text>
            </TouchableOpacity>
          )}

          {/* 3rd place */}
          {podiumEntries[2] && (
            <TouchableOpacity
              style={styles.podiumColumn}
              onPress={() => {
                if (enableProfiles) {
                  setSelectedUser(podiumEntries[2] ?? null);
                  setModalVisible(true);
                }
              }}
            >
              {podiumEntries[2]?.picture && (
                <Image
                  source={{ uri: podiumEntries[2]?.picture || '' }}
                  style={styles.avatar}
                />
              )}
              <View
                style={[
                  styles.podiumBlock,
                  styles.third,
                  style?.podiumStyle?.third,
                ]}
              >
                <Text style={styles.podiumRank}>3</Text>
              </View>
              <Text style={styles.playerName}>{podiumEntries[2]?.name}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Rest of leaderboard */}
      <FlatList
        data={restEntries}
        keyExtractor={(_, index) => (index + 1 + rankOffset).toString()}
        contentContainerStyle={styles.leaderboardList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.leaderboardItem, style?.itemStyle]}
            activeOpacity={0.8}
            onPress={() => {
              if (enableProfiles) {
                setSelectedUser(item);
                setModalVisible(true);
              }
            }}
          >
            <Text style={[styles.rank, style?.rankStyle]}>{item.rank}</Text>
            {item.picture ? (
              <>
                <Image
                  source={{ uri: item.picture }}
                  style={[styles.itemAvatar, style?.avatarStyle]}
                />
                <Text style={[styles.itemName, style?.usernameStyle]}>
                  {item.name}
                </Text>
              </>
            ) : (
              <Text style={[styles.itemName, style?.usernameStyle]}>
                {item.name}
              </Text>
            )}
            <Text style={[styles.itemPoints, style?.pointStyle]}>
              {item.points}
            </Text>
          </TouchableOpacity>
        )}
      />
      {customProfile ? (
        customProfile(selectedUser, () => {
          setModalVisible(false);
          setSelectedUser(null);
        })
      ) : (
        <LeaderboardProfile
          visible={modalVisible}
          user={selectedUser}
          onClose={() => {
            setModalVisible(false);
            setSelectedUser(null);
          }}
          style={style?.profileStyle}
        />
      )}
      {/*<View style={styles.sortingTypesContainer}>
        {sortingTypes.map(st => (
          <TouchableOpacity key={st} onPress={() => setSorting(st)} style={[styles.sortingButton, sorting === st && styles.sortingButtonActive]}>
            <Text style={[styles.sortingText, sorting === st && styles.sortingTextActive]}>{st.charAt(0).toUpperCase() + st.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    paddingVertical: 32,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  podiumColumn: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  firstAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  podiumBlock: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 6,
  },
  first: { height: 100, backgroundColor: 'gold' },
  second: { height: 80, backgroundColor: 'silver' },
  third: { height: 60, backgroundColor: '#cd7f32' },
  podiumRank: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    maxWidth: 80,
  },
  leaderboardList: {
    paddingHorizontal: 16,
  },
  leaderboardItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  rank: {
    width: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  itemAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  itemPoints: {
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 40,
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    elevation: 2,
  },
  sortingTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sortingText: {
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  sortingButton: {
    backgroundColor: '#dfe6f3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 4,
    elevation: 1,
  },
  sortingTextActive: {
    color: '#fff',
  },
  sortingButtonActive: {
    backgroundColor: '#2c3e50',
  },
});
