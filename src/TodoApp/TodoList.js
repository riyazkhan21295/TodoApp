import { useRef, useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Animated, {
  runOnJS,
  withTiming,
  withDelay,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Modalize } from "react-native-modalize";

import { COLORS, getPriorityColor, getCategoryColor } from "./utils/constants";
import { EmptyList } from "./components/empty";

const ITEM_HEIGHT = 90;

export const TodoList = ({
  todoList,
  toggleTodoComplete,
  onPressEditTodo,
  deleteTodo,
  onScroll,
  Header
}) => {
  const actionModalRef = useRef();
  const [editingItem, setEditing] = useState("");
  const animatedItemHeight = useSharedValue(ITEM_HEIGHT);

  const _onEditPress = () => {
    onPressEditTodo(editingItem.id);
    actionModalRef.current.close();
  };

  const _onDelete = () => {
    actionModalRef.current.close();
    animatedItemHeight.value = withTiming(0, {}, () => {
      runOnJS(deleteTodo)(editingItem.id);
      runOnJS(setEditing)("");
    });
  };

  const openActionSheet = (item) => {
    animatedItemHeight.value = ITEM_HEIGHT;
    setEditing(item);
    actionModalRef.current.open();
  };
  return (
    <>
      <View style={{ height: 30 }} />
      <Animated.FlatList
        onScroll={onScroll}
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyList />}
        renderItem={({ item }) => (
          <Item
            item={item}
            onToggle={() => toggleTodoComplete(item.id)}
            onEdit={() => onPressEditTodo(item.id)}
            openActionSheet={openActionSheet}
            animatedItemHeight={animatedItemHeight}
            isSelected={editingItem?.id === item.id}
          />
        )}
        data={todoList}
      />
      <Modalize
        ref={actionModalRef}
        adjustToContentHeight
        modalStyle={styles.modalStyle}
        keyboardAvoidingOffset={50}
        scrollViewProps={{ keyboardShouldPersistTaps: "always" }}
      >
        <View style={styles.actions}>
          <Pressable style={styles.action} onPress={_onEditPress}>
            <Text style={styles.actionText}>Edit</Text>
            <Entypo name="pencil" size={24} color={COLORS.primary} />
          </Pressable>
          <Pressable
            onPress={_onDelete}
            style={[styles.action, styles.deleteAction]}
          >
            <Text style={[styles.actionText, { color: "red" }]}>Delete</Text>
            <Entypo name="trash" size={24} color="red" />
          </Pressable>
        </View>
      </Modalize>
    </>
  );
};

const Item = ({
  item,
  onToggle,
  isSelected,
  animatedItemHeight,
  openActionSheet,
}) => {
  const completed = useSharedValue(item.completed ? 1 : 0);

  const onPress = () => {
    if (item.completed) {
      completed.value = withTiming(0, { duration: 500 }, () => {
        runOnJS(onToggle)();
      });
    } else {
      completed.value = withTiming(1.5, { duration: 500 }, () => {
        runOnJS(onToggle)();
      });
      completed.value = withDelay(500, withTiming(1, null));
    }
  };


  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: isSelected ? animatedItemHeight.value : ITEM_HEIGHT,
    };
  }, [isSelected]);

  const animatedCheckStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: completed.value }],
    };
  });

  return (
    <Animated.View style={animatedContainerStyle}>
      <View
        style={[
          styles.item,
          { backgroundColor: item.completed ? "#c0c3c9" : "#fff" },
          {
            borderLeftWidth: 5,
            borderLeftColor: getCategoryColor(item.category),
          },
        ]}
      >
        <Pressable onPress={() => openActionSheet(item)} style={{ flex: 1 }}>
          <View style={styles.content}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
                  {item.task}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View style={styles.label}>
                <Text
                  style={[
                    styles.labelText,
                    { color: getCategoryColor(item.category) },
                  ]}
                >
                  {item.category}
                </Text>
              </View>
              {item.priority && (
                <View style={styles.label}>
                  <Text
                    style={[
                      styles.labelText,
                      { color: getPriorityColor(item.priority) },
                    ]}
                  >
                    {item.priority}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>

        <View
          style={{
            padding: 8,
            borderBottomLeftRadius: 8,
          }}
        >
          <Pressable onPress={() => onPress()}>
            <View style={[styles.checkBox]}>
              <Animated.View style={animatedCheckStyle}>
                <Entypo name="check" size={18} color={COLORS.primary} />
              </Animated.View>
            </View>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    marginHorizontal: 10,
    paddingBottom: 70,
  },
  content: {
    flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
  },
  item: {
    flexDirection: "row",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#d3d3d3",
  },
  checkBox: {
    // width: 20,
    // height: 20,
    borderRadius: 5,
    // marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginLeft: 5,
    borderRadius: 5,
    paddingVertical: 5,
    marginRight: 5,
  },
  labelText: {
    color: COLORS.primary,
    fontSize: 10,
  },
  actions: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  action: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: COLORS.primary,
  },
  actionText: {
    fontSize: 18,
    color: COLORS.primary,
  },
  deleteAction: {
    borderColor: "red",
    backgroundColor: "transparent",
  },
});
