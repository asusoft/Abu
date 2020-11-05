import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, FlatList, Modal, } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import CourseList from '../components/CourseList';
import { AntDesign } from "@expo/vector-icons";
import colours from "../Colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCourseModal from '../components/AddCourseModal'
import Fire from '../Fire'


export default class Courses extends React.Component {

    
  state = {
      addCourseVisible: false,
      courses: [],
      user: {},
      loading: true
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
        if (error) {
        }

        firebase.getCourses(courses => {
            this.setState({ courses, user }, () => {
                this.setState({ loading: false });
            });
        });

        this.setState({ user });
    });
}
componentWillUnmount() {
    firebase.retach();
}

  
  toggleAddCourseModal() {
      this.setState({ addCourseVisible: !this.state.addCourseVisible });
  }

  renderCourse = course => {
      return <CourseList course={course} updateCourse={this.updateCourse} />;
  };

  addCourse = course => {
        firebase.addCourse({
            name: course.name,
            color: course.color,
            subs: []
        });
    };

  updateCourse = course => {
      firebase.updateCourse(course);
  };

  render() {
      return (
          <View style={styles.container}>
              <Modal
                  animationType="slide"
                  visible={this.state.addCourseVisible}
                  onRequestClose={() => this.toggleAddCourseModal()}
              >
                  <AddCourseModal closeModal={() => this.toggleAddCourseModal()} addCourse={this.addCourse} />
              </Modal>
              <FlatList
                      style={styles.scrollContainer}
                      data={this.state.courses}
                      keyExtractor={item => item.id.toString()}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => this.renderCourse(item)}
                      keyboardShouldPersistTaps="always"
                  />

                <View style={styles.addButton}>
                    <View style={{ marginVertical: 48 }}>
                        <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddCourseModal()}>
                            <AntDesign name="plus" size={20} color={colours.white} />
                        </TouchableOpacity>
                     </View>
                </View>
          </View>
      );
  }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    marginHorizontal: 15
},

scrollContainer: {
    flex: 1,
    marginBottom: 0,
    marginTop: 10,
},

addButton: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
},

addList: {
    borderWidth: 2,
    backgroundColor: '#14b98b',
    borderColor: '#14b98b',
    width: 60,
    height: 60,
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
},
});
