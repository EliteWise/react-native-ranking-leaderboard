import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import type LeaderboardEntry from '../../src/leaderboard';
import { useState } from 'react';

type Props = {
  user: LeaderboardEntry | null | undefined;
  onClose: () => void;
};

const { width, height } = Dimensions.get('window');

const CustomProfile = ({ user, onClose }: Props) => {
  const [tab, setTab] = useState('stats');

  if (!user) {
    return (
      <View style={styles.overlay}>
        <View style={[styles.container, styles.centerContainer]}>
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
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // fond clair et translucide
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#f0f4f8', // blanc cassé très clair
    borderRadius: 20,
    width: width * 0.85,
    maxHeight: height * 0.75,
    padding: 24,
    shadowColor: '#888',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  closeText: {
    fontSize: 28,
    color: '#ff6b6b', // rouge doux
  },
  centered: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#4a90e2', // bleu doux
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50', // bleu foncé
  },
  rank: {
    fontSize: 18,
    color: '#4a90e2', // bleu doux
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#d0d7de',
  },
  tabText: {
    fontSize: 20,
    color: '#7f8c8d', // gris doux
    paddingBottom: 8,
  },
  activeTab: {
    color: '#4a90e2',
    borderBottomWidth: 3,
    borderBottomColor: '#4a90e2',
    fontWeight: '700',
  },
  content: {
    marginTop: 20,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  statLabel: {
    fontSize: 18,
    color: '#95a5a6', // gris clair
    marginTop: 4,
  },
  bioScroll: {
    maxHeight: 150,
  },
  bioText: {
    fontSize: 16,
    color: '#34495e',
  },
});

export default CustomProfile;
