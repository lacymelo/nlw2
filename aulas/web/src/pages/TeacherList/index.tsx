import React, { FormEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import api from "../../services/api";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";


import './styles.css';

interface TeacherItemProps {
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

const TeacherList = () => {
    const [listTeachers, setListTeachers] = useState<TeacherItemProps[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();
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
            <div id="page-teacher-list" className="container">

                <PageHeader title="Estes são os proffys disponíveis.">
                    {/* propriedade children */}
                    <form id="search-teachers" onSubmit={(e) => searchTeachers(e)}>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Química', label: 'Química'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Português', label: 'Português'},
                                {value: 'Geografia', label: 'Geografia'},
                                {value: 'História', label: 'História'},
                                {value: 'Física', label: 'Física'},
                                {value: 'Matemática', label: 'Matemática'},
                            ]}
                            />
                        <Select
                            name="week_day"
                            label="Dia da semana"
                            value={week_day}
                            onChange={(e) => setWeekDay(e.target.value)}
                            options={[
                                {value: '0', label: 'Domingo'},
                                {value: '1', label: 'Segunda-feira'},
                                {value: '2', label: 'Terça-feira'},
                                {value: '3', label: 'Quarta-feira'},
                                {value: '4', label: 'Quinta-feira'},
                                {value: '5', label: 'Sexta-feira'},
                                {value: '6', label: 'Sábado'},
                            ]}
                            />
                        <Input
                            type="time"
                            name="time"
                            label="Hora"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            />

                        <button type="submit">
                            <FiSearch/>

                            <span>
                                Buscar
                            </span>
                        </button>
                    </form>
                </PageHeader>

                <main>
                    <TeacherItem teacher={listTeachers}/>
                </main>
            </div>
        </>
    );
}

export default TeacherList;