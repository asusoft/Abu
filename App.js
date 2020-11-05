import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { 
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from './screens/DrawerContent';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme, 
  Button
} from 'react-native-paper';

import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from './components/context';

import Dashboard from './screens/dashboard'
import Schedule from './screens/schedule'
import Settings from './screens/settings'
import Courses from './screens/courses'
import courseDetails from './screens/coursedetails'
import newCourse from './screens/newCourse'
import editCourse from './screens/editCourse'
import Tasks from './screens/tasks'
import taskDetails from './screens/taskdetails'
import newTask from './screens/newTask'
import editTask from './screens/editTask'
import Notes from './screens/notes'

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { Loading } from "./screens/LoadingScreen";

import Fire from './Fire'
import firebase from "firebase";
import FirebaseKeys from "./config";





const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="SignIn"
      component={LoginScreen}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={RegisterScreen}
      options={{ title: "Sign Up" }}
    />
  </AuthStack.Navigator>
);



const DasboardStack = createStackNavigator();
const DasboardStackScreen = ({navigation}) => (
  <DasboardStack.Navigator>
    <DasboardStack.Screen 
    name="Dashboard"
    options={{
      headerTitle: "Dashboard",
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#14b98b',
        
        
        
      },
      headerTitleStyle: {
        color: 'white',
        textAlign: 'center',
    },
      headerLeft: () => (
        <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.toggleDrawer()}
            
          >
            <Icon
              name= "menu"
              size= {32}
              color= "white"
            ></Icon>
          </TouchableOpacity>
      )
    }}
    component={Dashboard} />
  </DasboardStack.Navigator>
);

const CourseStack = createStackNavigator();
const CourseStackScreen = ({navigation}) => (
  <CourseStack.Navigator>
    <CourseStack.Screen 
    name="Courses"
    options={{
      headerTitle: "Courses",
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#14b98b',  
      },
      headerTitleStyle: {
        color: 'white',
        textAlign: 'center',
    },
      headerLeft: () => (
        <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.toggleDrawer()}
            
          >
            <Icon
              name= "menu"
              size= {32}
              color= "white"
            ></Icon>
          </TouchableOpacity>
      )
    }}
    component={Courses} />
    <CourseStack.Screen 
    name="newCourse"
    options={{
      headerShown: false
    }} 
    component={newCourse} />
    <CourseStack.Screen 
    name="courseDetails"
    options={{
      headerShown: false
    }}
    component={courseDetails} />
    <CourseStack.Screen 
    name="editCourse" 
    options={{
      headerShown: false
    }}
    component={editCourse} />
  </CourseStack.Navigator>
);

const TaskStack = createStackNavigator();
const TaskStackScreen = ({navigation}) => (
  <TaskStack.Navigator >
    <TaskStack.Screen 
    name="Tasks"
    options={{
      headerTitle: "Tasks",
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#14b98b',
        
        
        
      },
      headerTitleStyle: {
        color: 'white',
        textAlign: 'center',
    },
      headerLeft: () => (
        <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.toggleDrawer()}
            
          >
            <Icon
              name= "menu"
              size= {32}
              color= "white"
            ></Icon>
          </TouchableOpacity>
      )
    }}
    component={Tasks} />
    <TaskStack.Screen 
    name="newTask"
    options={{
      headerShown: false
    }} 
    component={newTask} />
    <TaskStack.Screen 
    name="taskDetails"
    options={{
      headerShown: false
    }}
    component={taskDetails} />
    <TaskStack.Screen 
    name="editTask" 
    options={{
      headerShown: false
    }}
    component={editTask} />
  </TaskStack.Navigator>
);

const ScheduleStack = createStackNavigator();
const ScheduleStackScreen = ({navigation}) => (
  <ScheduleStack.Navigator >
    <ScheduleStack.Screen 
    name="Schedule"
    options={{
      headerTitle: "Schedule",
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#14b98b',
      },
      headerTitleStyle: {
        color: 'white',
        textAlign: 'center',
    },
      headerLeft: () => (
        <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.toggleDrawer()}
            
          >
            <Icon
              name= "menu"
              size= {32}
              color= "white"
            ></Icon>
          </TouchableOpacity>
      )
    }}
    component={Schedule} />
  </ScheduleStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = ({navigation}) => (
  <SettingsStack.Navigator >
    <SettingsStack.Screen 
    name="Settings"
    options={{
      headerTitle: "Settings",
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#14b98b',
        alignItems: "center",
        
        
      },
      headerTitleStyle: {
        color: 'white',
        textAlign: 'center',
    },
      headerLeft: () => (
        <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.toggleDrawer()}
            
          >
            <Icon
              name= "menu"
              size= {32}
              color= "white"
            ></Icon>
          </TouchableOpacity>
      )
    }}
    component={Settings} />
  </SettingsStack.Navigator>
);


const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
      <Drawer.Screen  name="Dashboard" component={DasboardStackScreen}/>
      <Drawer.Screen  name="Courses" component={CourseStackScreen}/>
      <Drawer.Screen  name="Tasks" component={TaskStackScreen}/>
      <Drawer.Screen  name="Notes" component={Notes}/>
      <Drawer.Screen  name="Schedule" component={ScheduleStackScreen}/>
      <Drawer.Screen  name="Settings" component={SettingsStackScreen}/>
  </Drawer.Navigator>
);

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const authContext = React.useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, );
  }, []);

  state = {
    loggedIn: null,
    data: null,
  };
  
  var firebaseConfig = FirebaseKeys;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
  <PaperProvider theme={theme}>
  <AuthContext.Provider value={authContext}>
  <NavigationContainer theme={theme}>
     {loggedIn ? <DrawerScreen /> : <AuthStackScreen />}
  </NavigationContainer>
  </AuthContext.Provider>
  </PaperProvider>
);
}

export default App;

const styles = StyleSheet.create({
  back: {
    left: 22,
  },
});