import {useEffect, useState} from "react";
import Filter from "./Filter.jsx";
import Form from "./Form.jsx";
import Persons from "./Persons.jsx";
import validations from "./services/Validations.js";
import useAxios from "./services/personsService.js";
import Notification from "./Notification.jsx";


const AppPhoneBook = () => {

    const [persons, setPersons] = useState([]);
    const [seletcEdit, setSelectEdit] = useState(false);
    const [newPerson, setNewPerson] = useState({
        name: "",
        number: "",
    });
    const [personsSearch, setPersonsSearch] = useState([]);
    const [search, setSearch] = useState("");
    const [toggle, setToggle] = useState({
        name: "",
        number: ""
    });
    const [erroMessage, setErroMessage] = useState('some error happene...');

    useEffect(() => {
            useAxios("get")
                .then((res) =>{
                    setPersons(res)
                })
    }, []);

    const addPerson = (e) => {
        e.preventDefault();
          const newPersonn = {
            ...newPerson,
            name: newPerson.name.trim(),
            number: newPerson.number.trim(),
            id: newPerson.id
        }

        if(validations.validate_new(persons, newPerson)){
                useAxios("post", newPersonn)
                    .then(res => {
                        setPersons(persons.concat(res));
                        setNewPerson({
                            ...newPerson,
                            name: "",
                            number: "",
                        })
                        setSearch("");
                        setPersonsSearch([]);
                    })
        }

    }

    const handle_form = (e) => {
        const {name, value} = e.target;
        setNewPerson({
                ...newPerson,
                [name]: value,
            }
        );
    }

    const handle_search = (e) => {
        setSearch(e.target.value);
        setPersonsSearch([]);
        if(e.target.value.trim() !== ""){
            const personsFilter = persons.filter(person => person.name.toUpperCase().startsWith(e.target.value.toUpperCase()));
            setPersonsSearch(personsFilter);
        }
    };

    const idCapture = id => {
        const capture = persons.find(person => person.id === id)
        setToggle({
            ...toggle,
            id:capture.id,
            name: capture.name,
            number: capture.number
        });
        setSelectEdit(true);
    }

    const togglePerson = (e) => {
        e.preventDefault();

        if(validations.validate_update(persons, toggle)){
            useAxios("put", toggle).then((() => {
                setPersons(persons.map(person => toggle.id === person.id ? toggle : person));
                reset_toggle();
            })).catch(err => {
                            reset_toggle();
                            alert(
                                `nota não encontrada no servidor erro ${err}`
                            )
                            setPersons(persons.filter(person => person.id !== toggle.id));

                    })
        }
    };

    const toggle_form = (e) => {
        const {name, value} = e.target;
        setToggle({
                    ...toggle,
                    [name]: value,
                }
        );
    };
    const reset_toggle = () => {
        setToggle({
            ...toggle,
            name: "",
            number: ""
        })
        setSelectEdit(false);
    }

    const delete_person = (id) =>{
        const obj = persons.find(person => person.id === id);
        useAxios("delete", obj).then(() =>{
            setPersons(persons.filter(person => person.id !== id));
        }).catch(err => {
                            setPersons(persons.filter(person => person.id !== id));
                            alert(
                                `nota não encontrada no servidor erro ${err}`
                            )
                            console.error(err)

                    })
    }
    return(
        <div>
            <h1>Agenda Telefonica</h1>
            <Notification message={erroMessage}/>
            <Filter onChange={handle_search} search={personsSearch} value={search}/>
            <h2>{ !seletcEdit ? "Cadastrar Novo" : `Editar Contato => ${persons.find(person => person.id === toggle.id).name}`}</h2>
            {
                !seletcEdit?
                <Form onSubmit={addPerson} value={newPerson} onChange={handle_form} text_button={"Cadastrar"}/> :
                <Form onSubmit={togglePerson} value={toggle} onChange={toggle_form} text_button={"Editar"} reset={reset_toggle} />
            }
            <h2>NUMEROS</h2>
            <Persons search_phonebook={personsSearch} phonebook={persons} toggle={idCapture} delet={delete_person}/>
        </div>
    );
}

export default AppPhoneBook;