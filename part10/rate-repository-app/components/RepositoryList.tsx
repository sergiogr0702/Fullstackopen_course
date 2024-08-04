import { Repository } from "@/types";
import { FlatList, StyleSheet, View } from "react-native";
import { RepositoryItem } from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

interface Props {
  repositories: Repository[];
}

export function RepositoryList({ repositories }: Props) {
  const renderItem = ({ item }: { item: Repository }) => {
    return <RepositoryItem repository={item} />;
  };

  return (
    <FlatList
      data={repositories}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.contentContainer}
      renderItem={renderItem}
    />
  );
}
