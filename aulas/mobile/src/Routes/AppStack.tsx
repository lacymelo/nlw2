import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Landing from "../pages/Landing";
import GiveClasses from "../pages/GiveClasses";
import StudyTabs from "./StudyTabs";

export default function AppStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    headerStyle: { backgroundColor: '#f0f0f5' }
                }}
            >
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="GiveClasses" component={GiveClasses} />
                <Stack.Screen name="Study" component={StudyTabs} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}