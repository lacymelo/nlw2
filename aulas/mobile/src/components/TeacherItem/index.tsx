import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from "./styles";
import api from "../../services/api";

export interface Teacher{
    id: number;
    subject: string;
    cost: number;
    user_id: number;
    name: string;
    avatar: string;
    avatar_url: string;
    whatsapp: string;
    bio: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited?: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isfavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id
        });

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoriteArray = [];

        // adicionar aos favoritos
        if(favorites){
            //limpando o array de posições com true ou false
            favoriteArray = JSON.parse(favorites).filter((teacher: Teacher) => {
                return teacher.id;   
            })
        }

        if(isfavorited){
            // remover dos favoritos
            if(favorites){

                const newArray = favoriteArray.filter((teacherItem: Teacher) => {
                    return teacherItem.id != teacher.id
                });
                
                setIsFavorited(false);
                await AsyncStorage.setItem('favorites', JSON.stringify(newArray));
            }
        }else{
            favoriteArray.push(teacher);
            setIsFavorited(true);
            await AsyncStorage.setItem('favorites', JSON.stringify(favoriteArray));
        }

    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image 
                        style={styles.avatar}
                        source={{ uri: teacher.avatar_url }} 
                    />
    
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{teacher.name}</Text>
    
                        <Text style={styles.subject}>{teacher.subject}</Text>
                    </View>
                </View>
    
                <Text style={styles.bio}>
                    {teacher.bio}
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.price}>
                        Preço/hora {' '}
    
                        <Text style={styles.priceValue}>
                            R$ {teacher.cost}
                        </Text>
                    </Text>
    
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.favoriteButton, isfavorited ? styles.favorited : {}]} onPress={handleToggleFavorite}>
                            { isfavorited ? <Image source={unfavoriteIcon}/> : <Image source={heartOutlineIcon}/> }                            
                        </TouchableOpacity>
    
                        <TouchableOpacity style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                            <Image source={whatsappIcon}/>
    
                            <Text style={styles.contactButtonText}>
                                Entrar em contato
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

export default TeacherItem;