import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageHeader from "../../components/PageHeader";

import styles from "./styles";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeacher = JSON.parse(response);

                //realiza a validação e remove elemento vazios
                const favoriteArray = favoritedTeacher.filter((teacher: Teacher) => {
                    return teacher.id;
                })
 
                setFavorites(favoriteArray);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    return(
        <>
            <View style={styles.container}>
                <PageHeader title="Meus Proffys favoritos" />

            </View>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
            {
                favorites.map((teacher: Teacher) => (
                    <TeacherItem 
                        key={teacher.id}
                        teacher={teacher}
                        favorited />
                ))
            }

            </ScrollView>
        </>
    );
}

export default Favorites;