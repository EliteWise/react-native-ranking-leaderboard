import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import type LeaderboardEntry from './leaderboard';
import type { ProfileStyle } from './leaderboard';

type LeaderboardProfileProps = {
  visible: boolean;
  onClose: () => void;
  user: LeaderboardEntry | null;
  style?: ProfileStyle;
};

export function LeaderboardProfile({
  visible,
  onClose,
  user,
  style = {},
}: LeaderboardProfileProps) {
  if (!user) return null;

  const pointsLabel = style.pointsLabel ?? 'Points';

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay, style.overlayStyle]}>
          <View style={[styles.modalContent, style.modalStyle]}>
            <Image
              source={{ uri: user.picture }}
              style={[styles.avatar, style.avatarStyle]}
            />
            <Text style={[styles.name, style.nameStyle]}>{user.name}</Text>
            <Text style={[styles.points, style.pointsStyle]}>
              {pointsLabel}: {user.points}
            </Text>

            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeIconButton, style.closeButtonStyle]}
            >
              <Text style={[styles.closeIconText, style.closeButtonTextStyle]}>
                ×
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    elevation: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 16,
    marginVertical: 8,
  },
  closeIconButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  closeIconText: {
    fontSize: 24,
    color: '#333',
  },
});
