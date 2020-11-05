import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Modal,
    KeyboardAvoidingView,
    TextInput
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colours from "../Colors";

export default class ClassModal extends React.Component {
    state = {
        title: this.props.sub.title,
        type: this.props.sub.type,
        color: this.props.sub.color,
        topics: this.props.sub.topic
    };

    renderTopic = topic => {
        return (
            <View style={styles.todoContainer}>
                <Text
                    style={styles.todo}>
                    {topic.title}
                </Text>
            </View>
        );
    };

    
    handleDelete(index) {
        this.props.deleteSub(index);
        this.props.closeModal
    };
    render() {
        const subs = this.props.sub;
        const index = this.props.index;
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
                    onPress={this.props.closeModal}
                >
                    <AntDesign name="close" size={24} color={colours.black} />
                </TouchableOpacity>

                <View style={[styles.section, styles.header, { borderBottomColor: this.state.color }]}>
                    <View>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <Text style={styles.taskCount}>{this.state.type}
                        </Text>
                    </View>
                    
                </View>
                <View>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <Text style={styles.taskCount}>{this.state.type}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <Text style={styles.taskCount}>{this.state.type}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.handleDelete(index)}>
                            <Text color= "#FF0000"> DELETE</Text>
                        </TouchableOpacity>
                        
                    </View>

                <View style={[styles.section, { flex: 3 }]}>
                    <FlatList
                        data={this.state.topics}
                        renderItem={({ item }) => this.renderTopic(item)}
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colours.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colours.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    todo: {
        color: colours.black,
        fontWeight: "700",
        fontSize: 16
    }
});
