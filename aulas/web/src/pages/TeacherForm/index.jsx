import React, { useState } from "react";

//components
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";


import warningIcon from "../../assets/images/icons/warning.svg";
import Dropzone from "../../components/Dropzone";
import './styles.css';

import { FiXCircle } from "react-icons/fi";

const TeacherForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''}
    ]);

    //adiciona um novo campo de schedule
    function addNewSchedule(){
        if(scheduleItems.length <= 6){
            setScheduleItems([
                ...scheduleItems, 
                {week_day: 0, from: '', to: ''}
            ])
        }
    }

    //remove um schedule de horário
    function removeSchedule(position){      
        const filterItems = scheduleItems.filter((item, index) => position !== index);
        setScheduleItems(filterItems);
    }

    function setScheduleItemValue(position, field, value){
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return {
                    ...scheduleItem, [field]: value
                };
            }

            return scheduleItem;
        });

        setScheduleItems(newArray);
    }

    //cria ima nova classe
    async function handleCreateClass(e){
        e.preventDefault();

        const avatar = selectedFile;
        const schedule = scheduleItems;

        const dataForm = new FormData();

        dataForm.append('name', name);
        dataForm.append('avatar', avatar);
        dataForm.append('whatsapp', whatsapp);
        dataForm.append('bio', bio);
        dataForm.append('subject', subject);
        dataForm.append('cost', cost);
        dataForm.append('schedule', JSON.stringify(schedule));

        await api.post('classes', dataForm)
        .then(() => {
            alert('Cadastro realizado com sucesso!');
            return navigate('/');
        }).catch((err) => {
            alert(err.data.error);
        });  
    }

    return(
        <>      
            <div id="page-teacher-form" className="container">
                <PageHeader 
                    title="Que incrível que você quer dar aulas."
                    description="O primeiro passo, é preencher esse formulário de inscrição."
                />


                <main>
                    <form onSubmit={handleCreateClass}>
                        <fieldset>
                            <legend>Seus dados</legend>
                            <Input
                                name="name"
                                label="Nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            
                            <Dropzone onFileUpload={setSelectedFile} />

                            <Input
                            name="WhatsApp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            />

                            <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Sobre a aula</legend>
                            <Select
                                name="subject"
                                label="Matéria"
                                onChange={(e) => setSubject(e.target.value)}
                                options={[
                                    {value: 'Artes', label: 'Artes'},
                                    {value: 'Química', label: 'Química'},
                                    {value: 'Biologia', label: 'Biologia'},
                                    {value: 'Português', label: 'Português'},
                                    {value: 'Geografia', label: 'Geografia'},
                                    {value: 'História', label: 'História'},
                                    {value: 'Física', label: 'Física'},
                                ]}
                                />
                            <Input
                                name="cost"
                                label="Custa da sua hora por aula"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                />
                        </fieldset>

                        <fieldset>
                            <legend>
                                Horários disponíveis
                                <button type="button" onClick={() => addNewSchedule()}>+ Novo Horário</button>
                            </legend>

                            {scheduleItems.map((item, index) => (
                                <div className="schedule"  key={scheduleItems.lastIndexOf(item)}>
                                    <button type="button" onClick={() => removeSchedule(index)}>
                                        <FiXCircle/>
                                    </button>

                                    <div className="schedule-item">
                                        <Select
                                            name="week_day"
                                            label="Dia da semana"
                                            options={[
                                                {value: '0', label: 'Domingo'},
                                                {value: '1', label: 'Segunda-feira'},
                                                {value: '2', label: 'Terça-feira'},
                                                {value: '3', label: 'Quarta-feira'},
                                                {value: '4', label: 'Quinta-feira'},
                                                {value: '5', label: 'Sexta-feira'},
                                                {value: '6', label: 'Sábado'},
                                            ]}
                                            onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        />
                                        <Input
                                            name="from"
                                            label="Das"
                                            type="time"
                                            value={index.from}
                                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                            />
                                        <Input
                                            name="to"
                                            label="Até"
                                            type="time"
                                            value={index.to}
                                            onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                            />
                                    </div>

                                </div>  
                            ))}
                        </fieldset>

                        <footer>
                            <p>
                                <img src={warningIcon} alt="Aviso importante" />
                                Importante!
                                <br />
                                Preencha todos os campos
                            </p>

                            <button type="submit">
                                Salvar cadastro
                            </button>
                        </footer>
                    </form>
                </main>
            </div>
        </>
        
    );
}

export default TeacherForm;