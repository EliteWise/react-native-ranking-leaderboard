import { Text, TouchableOpacity, View } from 'react-native';

export const SortingTypes = ({
  sortingTypes,
  sorting,
  setSorting,
  showSortingTypes,
  style,
  styles,
  sortingPosition,
}: {
  sortingTypes: ('weekly' | 'monthly' | 'alltime')[];
  sorting: string;
  setSorting: (value: 'weekly' | 'monthly' | 'alltime') => void;
  showSortingTypes: boolean;
  style?: any;
  styles: any;
  sortingPosition?: 'top' | 'bottom';
}) => {
  if (!showSortingTypes) return null;

  return (
    <View
      style={[
        styles.sortingTypesContainer,
        sortingPosition == 'top' ? { marginBottom: 10 } : null,
      ]}
    >
      {sortingTypes.map((st) => (
        <TouchableOpacity
          key={st}
          onPress={() => setSorting(st)}
          style={[
            styles.sortingButton,
            style?.sortingButtonStyle,
            sorting === st && [
              styles.sortingButtonActive,
              style?.sortingButtonActiveStyle,
            ],
          ]}
        >
          <Text
            style={[
              styles.sortingText,
              style?.sortingTextStyle,
              sorting === st && [
                styles.sortingTextActive,
                style?.sortingTextActiveStyle,
              ],
            ]}
          >
            {st.charAt(0).toUpperCase() + st.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
