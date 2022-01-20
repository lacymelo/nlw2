import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from "./styles";

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
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
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
                        <TouchableOpacity style={[styles.favoriteButton, styles.favorited]}>
                            {/* <Image source={heartOutlineIcon}/>  */}
                            <Image source={unfavoriteIcon}/> 
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