import React from "react";
import { Text, View, ScrollView } from "react-native";
import PageHeader from "../../components/PageHeader";

import styles from "./styles";
import TeacherItem from "../../components/TeacherItem";

const Favorites = () => {
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
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />

            </ScrollView>
        </>
    );
}

export default Favorites;