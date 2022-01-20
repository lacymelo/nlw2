import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import TeacherList from "../pages/TeacherList";
import Favorites from "../pages/Favorites";

export default function StudyTabs(){
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: '#f0f0f5' },

                tabBarStyle: { 
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64,
                }, 

                tabBarItemStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },

                tabBarIconStyle: {
                    flex: 0,
                    width: 29,
                    height: 28,
                    marginRight: 10,
                },

                tabBarLabelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 1,
                },

                tabBarInactiveBackgroundColor: '#fafafc',
                tabBarActiveBackgroundColor: '#ebebfc',
                tabBarInactiveTintColor: '#c1bccc',
                tabBarActiveTintColor: '#32264d' 
            }}
        >
            <Tab.Screen
                name="TeacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="easel-outline" size={size} color={focused ? '#8257e5' : color } />
                        );
                    }
                }} />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                    options={{
                        tabBarLabel: 'Favoritos',
                        tabBarIcon: ({ color, size, focused }) => {
                            return (
                                <Ionicons name="md-heart-outline" size={size} color={focused ? '#8257e5' : color } />
                            );
                        }
                    }}
                />
        </Tab.Navigator>
    );
}