import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import type LeaderboardEntry from './leaderboard';
import type { LeaderboardStyle } from './leaderboard';
import { useState } from 'react';
import { LeaderboardProfile } from './profile';

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  showPodium?: boolean;
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
  enableProfiles = true,
  customProfile,
}: LeaderboardProps) {
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

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
      {showPodium && entries.length >= 1 && (
        <View style={styles.podiumContainer}>
          {/* 2nd place */}
          {entries[1] && (
            <TouchableOpacity
              style={styles.podiumColumn}
              onPress={() => {
                if (enableProfiles) {
                  setSelectedUser(entries[1] ?? null);
                  setModalVisible(true);
                }
              }}
            >
              {entries[1]?.picture && (
                <Image
                  source={{ uri: entries[1]?.picture || '' }}
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
              <Text style={styles.playerName}>{entries[1]?.name}</Text>
            </TouchableOpacity>
          )}

          {/* 1st place */}
          {entries[0] && (
            <TouchableOpacity
              style={styles.podiumColumn}
              onPress={() => {
                if (enableProfiles) {
                  setSelectedUser(entries[0] ?? null);
                  setModalVisible(true);
                }
              }}
            >
              {entries[0]?.picture && (
                <Image
                  source={{ uri: entries[0]?.picture || '' }}
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
              <Text style={styles.playerName}>{entries[0]?.name}</Text>
            </TouchableOpacity>
          )}

          {/* 3rd place */}
          {entries[2] && (
            <TouchableOpacity
              style={styles.podiumColumn}
              onPress={() => {
                if (enableProfiles) {
                  setSelectedUser(entries[2] ?? null);
                  setModalVisible(true);
                }
              }}
            >
              {entries[2]?.picture && (
                <Image
                  source={{ uri: entries[2]?.picture || '' }}
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
              <Text style={styles.playerName}>{entries[2]?.name}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Rest of leaderboard */}
      <FlatList
        data={showPodium ? entries.slice(3) : entries}
        keyExtractor={(_, index) =>
          showPodium ? (index + 4).toString() : (index + 1).toString()
        }
        contentContainerStyle={styles.leaderboardList}
        renderItem={({ item, index }) => (
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
            <Text style={[styles.rank, style?.rankStyle]}>
              {showPodium ? index + 4 : index + 1}
            </Text>
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
});
