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
              About
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
    backgroundColor: 'rgba(10, 25, 47, 0.85)', // nuit sombre bleutée
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  container: {
    backgroundColor: '#1c2431',
    borderRadius: 32,
    width: width * 0.88,
    maxHeight: height * 0.78,
    paddingVertical: 28,
    paddingHorizontal: 28,
    shadowColor: '#3f51b5',
    shadowOpacity: 0.6,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2e374f',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    fontSize: 22,
    color: '#f2f2f2',
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
    borderWidth: 4,
    borderColor: '#7e57c2',
    backgroundColor: '#222b44',
    shadowColor: '#7e57c2',
    shadowOpacity: 0.9,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  name: {
    fontSize: 30,
    fontWeight: '900',
    color: '#e0d7f5',
    letterSpacing: 1.3,
    textShadowColor: '#7e57c2',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  rank: {
    fontSize: 18,
    fontWeight: '600',
    color: '#b39ddb',
    marginTop: 6,
    letterSpacing: 0.7,
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
    color: '#9381ff',
    backgroundColor: '#2e2a59',
  },
  activeTab: {
    backgroundColor: '#7e57c2',
    color: '#fff',
    shadowColor: '#7e57c2',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
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
    color: '#d1c4e9',
  },
  statLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#9fa8da',
    marginTop: 8,
  },
  bioScroll: {
    maxHeight: 180,
  },
  bioText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#cbc2f7',
    lineHeight: 26,
  },
});

export default CustomProfile;
