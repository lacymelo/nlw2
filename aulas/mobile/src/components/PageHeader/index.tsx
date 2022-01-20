import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

import styles from './styles';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import { Header } from "react-native/Libraries/NewAppScreen";

export type RootStackParamList = {
    Landing: undefined;
};

type NavigateProp = NativeStackNavigationProp<
  RootStackParamList
>;

interface PageHeaderTitle {
    title: string;
    headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderTitle> = ({ title, children, headerRight }) => {
    const { navigate } = useNavigation<NavigateProp>();

    function handleGoBack(){
        navigate('Landing');
    }

    return(
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={handleGoBack}>
                    {/* resiseMode para ficar contido no tamanho do elemento por volta dele */}
                    <Image source={backIcon} resizeMode="contain" />
                </TouchableOpacity>

                <Image source={logoImg} resizeMode="contain" />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>
                    {title}
                </Text>

                {headerRight}
            </View>


            {children}
        </View>
    );
}

export default PageHeader;

