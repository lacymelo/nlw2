import React, { FormEvent, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import PageHeader from "../../components/PageHeader";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



import api from "../../services/api";
import styles from "./styles";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

const TeacherList = () => {
    const [listTeachers, setListTeachers] = useState([]);
    const [isFilterVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeacher = JSON.parse(response);
                const favoritedTeacherIds = favoritedTeacher.map((teacher: Teacher) => {
                    return teacher.id;
                });

                setFavorites(favoritedTeacherIds);
            }
        });
    }

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFilterVisible);
    }

    async function searchTeachers(){
        loadFavorites();

        await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        }).then((response) => {
            setListTeachers(response.data);
        });
    }

    return(
        <>
            <View style={styles.container}>
                <PageHeader title="Proffys Disponíveis"
                    headerRight={(
                        <TouchableOpacity onPress={handleToggleFiltersVisible}>
                            <Feather name="filter" size={24} color="#FFF" />
                        </TouchableOpacity>
                    )}>
                    {isFilterVisible && (    
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>
                                Matéria
                            </Text>

                            <View
                                style={styles.input}
                            >
                                <Picker
                                    selectedValue={subject}
                                    onValueChange={(itemValue) =>
                                        setSubject(itemValue)
                                    }> 
                                    <Picker.Item label="Artes" value="Artes" />
                                    <Picker.Item label="Química" value="Química" />
                                    <Picker.Item label="Biologia" value="Biologia" />
                                    <Picker.Item label="Português" value="Português" />
                                    <Picker.Item label="Geografia" value="Geografia" />
                                    <Picker.Item label="História" value="História" />
                                    <Picker.Item label="Física" value="Física" />
                                    <Picker.Item label="Matemática" value="Matemática" />
                                </Picker>
                            </View>

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>
                                        Dia da semana
                                    </Text>

                                    <View
                                        style={styles.input}
                                    >
                                        <Picker                                     
                                            selectedValue={week_day}
                                            onValueChange={(itemValue) =>
                                                setWeekDay(itemValue)
                                            }>
                                            <Picker.Item label="Domingo" value="0" />
                                            <Picker.Item label="Segunda-feira" value="1" />
                                            <Picker.Item label="Terça-feira" value="2" />
                                            <Picker.Item label="Quarta-feira" value="3" />
                                            <Picker.Item label="Quinta-feira" value="4" />
                                            <Picker.Item label="Sexta-feira" value="5" />
                                            <Picker.Item label="Sábado" value="6" />
                                        </Picker>
                                    </View>
                                </View>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>
                                        Horário
                                    </Text>

                                    <TextInput
                                        style={styles.input}
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                        placeholder="Qual horário?"
                                        />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.submitButton} onPress={searchTeachers}>
                                <Text style={styles.submitButtonText}>
                                    Filtrar
                                </Text>
                            </TouchableOpacity>

                        </View>
                        )
                    }
                </PageHeader>
            </View>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >

            {
                listTeachers.map((teacher: Teacher) => (
                    <TeacherItem 
                        key={teacher.id}
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)} />
                ))
            }
            </ScrollView>
        </>
    );
}

export default TeacherList;