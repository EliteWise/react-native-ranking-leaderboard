import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import type { LeaderboardEntryDiff } from '../../src/leaderboard';

type Props = {
  user: LeaderboardEntryDiff | null | undefined;
  onClose: () => void;
};

const { width, height } = Dimensions.get('window');

const CustomProfile = ({ user, onClose }: Props) => {
  const [tab, setTab] = useState('stats');

  if (!user) {
    return (
      <View style={styles.overlay}>
        <View style={[styles.container]}>
          <Text style={styles.name}>User not found.</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.centered}>
          <Image source={{ uri: user.picture }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          {user.rank != null && (
            <Text style={styles.rank}>Rank #{user.rank}</Text>
          )}
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setTab('stats')}>
            <Text style={[styles.tabText, tab === 'stats' && styles.activeTab]}>
              Stats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTab('about')}>
            <Text style={[styles.tabText, tab === 'about' && styles.activeTab]}>
              Details
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {tab === 'stats' ? (
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{user.points}</Text>
                <Text style={styles.statLabel}>Score</Text>
              </View>
            </View>
          ) : (
            <ScrollView style={styles.bioScroll}>
              <Text style={styles.bioText}>
                {user.name} is a top player in the leaderboard.
              </Text>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    width: width * 0.88,
    maxHeight: height * 0.78,
    paddingVertical: 28,
    paddingHorizontal: 28,
    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    fontSize: 22,
    color: '#444',
    fontWeight: '600',
    lineHeight: 22,
  },
  centered: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: '#a7c7ff',
    backgroundColor: '#e6f0ff',
    shadowColor: '#a7c7ff',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  name: {
    fontSize: 30,
    fontWeight: '900',
    color: '#333',
    letterSpacing: 1.1,
  },
  rank: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    gap: 16,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 24,
    color: '#4a90e2',
    backgroundColor: '#e9f2ff',
  },
  activeTab: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    shadowColor: '#4a90e2',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  content: {
    marginTop: 30,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 34,
  },
  statNumber: {
    fontSize: 42,
    fontWeight: '900',
    color: '#333',
  },
  statLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
  },
  bioScroll: {
    maxHeight: 180,
  },
  bioText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#444',
    lineHeight: 26,
  },
});

export default CustomProfile;
