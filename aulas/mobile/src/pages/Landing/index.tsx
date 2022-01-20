import React, { useEffect, useState} from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";

import styles from "./styles";
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

export type RootStackParamList = {
    GiveClasses: undefined;
    Study: undefined;
};

type NavigateProp = NativeStackNavigationProp<
  RootStackParamList
>;

function Landing(){
    const { navigate } = useNavigation<NavigateProp>();

    const [totConnections, setTotConnections ] = useState('0');

    useEffect(() => {
        async function countConnections() {
            const response = await api.get('connections');

            const { total } = response.data;
            setTotConnections(total);
        }

        countConnections();
    }, []);

    function handleNavigateToGiveClassesPage(){
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPages(){
        navigate('Study');
    }

    return(
        <>
            <View style={styles.container}>
                <Image source={landingImg} />

                <Text style={styles.title}>
                    Seja bem vindo, {'\n'}
                    <Text style={styles.titleBold}>
                        O que deseja fazer?
                    </Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonPrimary]}
                        onPress={handleNavigateToStudyPages}>
                        <Image source={studyIcon} />

                        <Text style={styles.buttonText}>
                            Estudar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonSecondary]}
                        onPress={handleNavigateToGiveClassesPage}>
                        <Image source={giveClassesIcon} />

                        <Text style={styles.buttonText}>
                            Dar Aulas
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.totalConnections}>
                    Total de {totConnections} conexões {' '}
                    <Image source={heartIcon}/>
                </Text>
            </View>
        </>
    )
}

export default Landing; 