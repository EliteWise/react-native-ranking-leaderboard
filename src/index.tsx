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
import type { LeaderboardEntryDiff, LeaderboardStyle } from './leaderboard';
import { useState } from 'react';
import { LeaderboardProfile } from './Profile';
import { SortingTypes } from './SortingTypes';

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  showPodium?: boolean;
  showSearchBar?: boolean;
  showSortingTypes?: boolean;
  showRankDifference?: boolean;
  enableProfiles?: boolean;
  style?: LeaderboardStyle;
  customProfile?: (
    user: LeaderboardEntryDiff | null,
    onClose: () => void
  ) => React.ReactNode;
};

export function Leaderboard({
  entries,
  style,
  showPodium = true,
  showSearchBar = true,
  showSortingTypes = false,
  showRankDifference = false,
  enableProfiles = true,
  customProfile,
}: LeaderboardProps) {
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntryDiff | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  // Search Bar
  const [searchQuery, setSearchQuery] = useState('');

  // Get the start and end of the week for a given date (Monday to Sunday)
  function getWeekRange(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day; // lundi = jour 1
    const start = new Date(d);
    start.setDate(d.getDate() + diff);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  }

  // Get the start and end of the month for a given date
  function getMonthRange(date: Date) {
    const d = new Date(date);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  }

  // Current and past dates for filtering
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Past Ranking comparison
  const { start: startWeek, end: endWeek } = getWeekRange(oneWeekAgo);
  const { start: startMonth, end: endMonth } = getMonthRange(oneMonthAgo);
  const { start, end } = getWeekRange(now);

  const currentWeekRange = filterByDateRange(entries, start, end);
  const currentMonthRange = filterByDateRange(entries, start, end);

  const lastWeekRange = filterByDateRange(entries, startWeek, endWeek);
  const lastMonthRange = filterByDateRange(entries, startMonth, endMonth);

  // Map: username → their previous rank (weekly)
  const lastWeekRanks: { [key: string]: number | undefined } = {};

  lastWeekRange.forEach((user, index) => {
    lastWeekRanks[user.name] = index + 1;
  });

  // Map: username → their previous rank (monthly)
  const lastMonthRanks: { [key: string]: number | undefined } = {};

  lastMonthRange.forEach((user, index) => {
    lastMonthRanks[user.name] = index + 1;
  });

  // Calculates rank change between current and past ranking
  function getRankChange(
    user: LeaderboardEntryDiff,
    period: 'weekly' | 'monthly'
  ): number {
    const lastRanks = period === 'weekly' ? lastWeekRanks : lastMonthRanks;
    const currentRange =
      period === 'weekly' ? currentWeekRange : currentMonthRange;

    const lastRank = lastRanks[user.name] ?? currentRange.length + 1;
    const currentRank =
      currentRange.findIndex((u) => u.name === user.name) + 1 ||
      currentRange.length + 1;
    return currentRank - lastRank; // Positive = moved down, negative = moved up
  }

  // Sorting Feature
  // Filters points by a date range and returns sorted leaderboard
  function filterByDateRange(
    data: LeaderboardEntry[],
    startDate: Date,
    endDate: Date
  ): LeaderboardEntryDiff[] {
    const filtered = data
      .map((user) => {
        const filteredScores = user.sorting?.filter(
          (sorting) => sorting.date >= startDate && sorting.date <= endDate
        );
        const totalPoints =
          filteredScores?.reduce((sum, score) => sum + score.points, 0) ?? 0;

        return {
          ...user,
          points: totalPoints,
        };
      })
      .filter((user) => (user.points ?? 0) > 0)
      .sort((a, b) => (b.points ?? 0) - (a.points ?? 0)); // Sort descending

    // Recalculate ranks
    return filtered.map((user, index) => ({
      ...user,
      rank: index + 1,
      rankDifference: 0,
    }));
  }

  // Handle sorting selection
  const sortingPosition = style?.sortingPosition ?? 'bottom';

  let displayedEntries: LeaderboardEntryDiff[] = [];

  const [sorting, setSorting] = useState<'weekly' | 'monthly' | 'general'>(
    'general'
  );

  const sortingTypes: ('weekly' | 'monthly' | 'general')[] = [
    'weekly',
    'monthly',
    'general',
  ];

  // Depending on selected sorting type, update displayed entries
  if (sorting === 'weekly') {
    const { start, end } = getWeekRange(now);
    displayedEntries = filterByDateRange(entries, start, end);
  } else if (sorting === 'monthly') {
    const { start, end } = getMonthRange(now);
    displayedEntries = filterByDateRange(entries, start, end);
  } else {
    displayedEntries = entries.map((user, index) => ({
      ...user,
      rank: index + 1,
      rankDifference: 0,
    }));
  }

  // Search bar filter
  const filteredEntries = displayedEntries.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const podiumEntries = filteredEntries.slice(0, 3);

  // Handle display of rest of the list (excluding podium if enabled)
  const baseRestEntries =
    searchQuery.trim() === '' && showPodium
      ? filteredEntries.slice(3)
      : filteredEntries;

  // Attach rank changes if sorting is weekly or monthly
  const restEntries: LeaderboardEntryDiff[] =
    sorting === 'weekly' || sorting === 'monthly'
      ? baseRestEntries.map((user) => ({
          ...user,
          rankDifference: getRankChange(user, sorting),
        }))
      : baseRestEntries.map((user) => ({
          ...user,
          rankDifference: 0,
        }));

  const isSearchActive = searchQuery.trim() !== '';
  const rankOffset = showPodium && !isSearchActive ? 3 : 0;

  // Handle empty state
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
      {showSortingTypes && sortingPosition === 'top' && (
        <SortingTypes
          sortingTypes={sortingTypes}
          sorting={sorting}
          setSorting={setSorting}
          showSortingTypes={showSortingTypes}
          style={style}
          styles={styles}
          sortingPosition="top"
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
                <Text style={styles.podiumRank}>
                  {style?.podiumRankRenderer
                    ? style?.podiumRankRenderer?.(2)
                    : '2'}
                </Text>
              </View>
              <Text style={styles.playerName}>
                {style?.podiumNameRenderer
                  ? style?.podiumNameRenderer(podiumEntries[1])
                  : podiumEntries[1]?.name}
              </Text>
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
                <Text style={styles.podiumRank}>
                  {style?.podiumRankRenderer
                    ? style?.podiumRankRenderer?.(1)
                    : '1'}
                </Text>
              </View>
              <Text style={styles.playerName}>
                {style?.podiumNameRenderer
                  ? style?.podiumNameRenderer(podiumEntries[0])
                  : podiumEntries[0]?.name}
              </Text>
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
                <Text style={styles.podiumRank}>
                  {style?.podiumRankRenderer
                    ? style?.podiumRankRenderer?.(3)
                    : '3'}
                </Text>
              </View>
              <Text style={styles.playerName}>
                {style?.podiumNameRenderer
                  ? style?.podiumNameRenderer(podiumEntries[2])
                  : podiumEntries[2]?.name}
              </Text>
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
            <View style={styles.pointsAndRankDiffContainer}>
              <Text style={[styles.itemPoints, style?.pointStyle]}>
                {item.points}
              </Text>
              {showRankDifference &&
                (sorting === 'monthly' || sorting === 'weekly') && (
                  <Text style={styles.rankDifference}>
                    {style?.rankDifferenceIcon
                      ? style?.rankDifferenceIcon(item.rankDifference)
                      : item.rankDifference > 0
                        ? `↑ ${item.rankDifference}`
                        : item.rankDifference < 0
                          ? `↓ ${Math.abs(item.rankDifference)}`
                          : '➖'}
                  </Text>
                )}
            </View>
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
      {showSortingTypes && sortingPosition === 'bottom' && (
        <SortingTypes
          sortingTypes={sortingTypes}
          sorting={sorting}
          setSorting={setSorting}
          showSortingTypes={showSortingTypes}
          style={style}
          styles={styles}
          sortingPosition="bottom"
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
    color: '#2c3e50',
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
  pointsAndRankDiffContainer: {
    flexDirection: 'row',
  },
  rankDifference: {
    width: 40,
    paddingLeft: 18,
    textAlign: 'left',
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
});
