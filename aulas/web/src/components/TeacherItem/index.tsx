import React from "react";
import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from "../../services/api";

interface TeacherItem{
    teacher: Array<{
        id: number;
        subject: string;
        cost: number;
        user_id: number;
        name: string;
        avatar: string;
        avatar_url: string;
        whatsapp: string;
        bio: string;
    }>
}

const TeacherItem: React.FC<TeacherItem> = ({ teacher }) => {

    async function createNewConnection(user_id: number){
        await api.post('connections', { user_id })
        .then((response) => {
            alert(response.data.message);
        }).catch((err) => {
            alert(err.data.message);
        });
    }

    return(
        <>        
            {teacher.map(teacherItem => (
                <article className="teacher-item" key={teacherItem.id}>
                    <header>
                        <img src={teacherItem.avatar_url} alt={teacherItem.name} />

                        <div>
                            <strong>{teacherItem.name}</strong>
                            <span>{teacherItem.subject}</span>
                        </div>
                    </header>

                    <p>
                        {teacherItem.bio}
                    </p>

                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ {teacherItem.cost}</strong>
                        </p>

                        <a onClick={() => createNewConnection(Number(teacherItem.id))} href={`https://wa.me/${teacherItem.whatsapp}`} target="_blank">
                            <img src={whatsappIcon} alt="Entrar em contato" />

                            Entrar em contato
                        </a>
                    </footer>
                </article>
            ))}
        </>
    );
}

export default TeacherItem;