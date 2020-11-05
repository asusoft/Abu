import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import{ AuthContext } from '../components/context';
import * as firebase from "firebase";


export function DrawerContent(props) {
    
    const signOutUser = () => {
        firebase.auth().signOut();
      };
    const paperTheme = useTheme();
    const { toggleTheme } = React.useContext(AuthContext);
    const { email } = firebase.auth().currentUser;
    
      

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection:'row',marginTop: 15}}>
                        <Avatar.Image 
                            source={{
                                uri: 'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/s320x320/116722828_103471918091099_9081439456195040386_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_ohc=7dq3-iT9SGYAX-VeLAm&oh=e44cd76d4686bd6e6cdc9c868ec8ef44&oe=5FC2F155'
                            }}
                            size={50}
                        />
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>Asu Soft</Title>
                            <Caption style={styles.caption}>{email}</Caption>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                        
                            icon={({color, size}) => (
                                
                                <Icon 
                                name="view-dashboard-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Dashboard"
                            onPress={() => {props.navigation.navigate('Dashboard')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="book" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Courses"
                            onPress={() => {props.navigation.navigate('Courses')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="checkbox-marked" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Tasks"
                            onPress={() => {props.navigation.navigate('Tasks')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar-month" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Schedule"
                            onPress={() => {props.navigation.navigate('Schedule')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar-month" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Notes"
                            onPress={() => {props.navigation.navigate('Notes')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('Settings')}}
                        />
                        
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => signOutUser()}
                />
            </Drawer.Section>
        </View>
    )
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });