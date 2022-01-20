import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';

import giveClassesBbImage from '../../assets/images/give-classes-background.png';

import styles from './styles';


const GiveClasses = () =>{
    const { goBack } = useNavigation();

    function handleNavigateBack(){
        goBack();
    }

    return(
        <>      
            <View style={styles.container}>
                <ImageBackground
                    resizeMode="contain"
                    source={giveClassesBbImage}
                    style={styles.content}>

                        <Text style={styles.title}>
                            Quer ser um proffy?
                        </Text>

                        <Text style={styles.description}>
                            Para começar, você precisa se cadastrar como professor na nossa plataforma Web.
                        </Text>
                </ImageBackground>

                <TouchableOpacity style={styles.okButton} onPress={handleNavigateBack}>
                    <Text style={styles.okButtonText}>
                        Tudo bem
                    </Text>
                </TouchableOpacity>
            </View>  
        </>
    );
}

export default GiveClasses;