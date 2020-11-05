import React from 'react';
import { View, Text, StyleSheet, FlatList, Modal, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from "@expo/vector-icons";
import TodoList from '../components/TodoList';
import colours from '../Colors';
import AddListModal from "../components/AddListModal";
import Fire from '../Fire'


export default class Tasks extends React.Component {
    state = {
        addTodoVisible: false,
        lists: [],
        user: {},
        loading: true
    };

    componentDidMount() {
        firebase = new Fire((error, user) => {
            if (error) {}

            firebase.getLists(lists => {
                this.setState({ lists, user }, () => {
                    this.setState({ loading: false });
                });
            });

            this.setState({ user });
        });
    }

    componentWillUnmount() {
        firebase.detach();
    }

    toggleAddTodoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }

    renderList = list => {
        return <TodoList list={list} updateList={this.updateList} />;
    };

    addList = list => {
        firebase.addList({
            name: list.name,
            color: list.color,
            todos: []
        });
    };

    updateList = list => {
        firebase.updateList(list);
    };

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={colours.blue} />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    visible={this.state.addTodoVisible}
                    onRequestClose={() => this.toggleAddTodoModal()}
                >
                    <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
                </Modal>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.divider} />
                    <Text style={styles.title}>
                        My <Text style={{ fontWeight: "300", color: colours.blue }}>Tasks</Text>
                    </Text>
                    <View style={styles.divider} />
                </View>

                <View style={{ marginVertical: 48 }}>
                    <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
                        <AntDesign name="plus" size={16} color={colours.blue} />
                    </TouchableOpacity>

                    <Text style={styles.add}>Add Task</Text>
                </View>

                <View style={{ height: 275, paddingLeft: 32 }}>
                    <FlatList
                        data={this.state.lists}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => this.renderList(item)}
                        keyboardShouldPersistTaps="always"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
  },
  divider: {
      backgroundColor: colours.lightBlue,
      height: 1,
      flex: 1,
      alignSelf: "center"
  },
  title: {
      fontSize: 38,
      fontWeight: "800",
      color: colours.black,
      paddingHorizontal: 64
  },
  addList: {
      borderWidth: 2,
      borderColor: colours.lightBlue,
      borderRadius: 4,
      padding: 16,
      alignItems: "center",
      justifyContent: "center"
  },
  add: {
      color: colours.blue,
      fontWeight: "600",
      fontSize: 14,
      marginTop: 8
  }
});