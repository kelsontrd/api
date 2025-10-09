import {useEffect, useState} from "react";
import Filter from "./Filter.jsx";
import Form from "./Form.jsx";
import Persons from "./Persons.jsx";
import validations from "./services/Validations.js";
import useAxios from "./services/personsService.js";



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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                        📱 Agenda Telefônica
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Gerencie seus contatos de forma simples e organizada
                    </p>
                </div>

                {/* Filtro de Busca */}
                <div className="flex justify-center">
                    <div className="w-full max-w-md">
                        <Filter 
                            onChange={handle_search} 
                            search={personsSearch} 
                            value={search}
                        />
                    </div>
                </div>

                {/* Formulário de Cadastro/Edição */}
                <div className="flex justify-center">
                    <div className="w-full max-w-md border-2 border-gray-200 rounded-xl p-6 bg-white shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 text-center">
                            {!seletcEdit 
                                ? "➕ Cadastrar Novo Contato" 
                                : `✏️ Editar: ${persons.find(person => person.id === toggle.id)?.name}`
                            }
                        </h2>
                        {!seletcEdit ? (
                            <Form 
                                onSubmit={addPerson} 
                                value={newPerson} 
                                onChange={handle_form} 
                                text_button={"Cadastrar"}
                            />
                        ) : (
                            <Form 
                                onSubmit={togglePerson} 
                                value={toggle} 
                                onChange={toggle_form} 
                                text_button={"Salvar"} 
                                reset={reset_toggle}
                            />
                        )}
                    </div>
                </div>
                
                {/* Lista de Contatos */}
                <div className="space-y-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            📋 Meus Contatos
                        </h2>
                        <p className="text-gray-600">
                            {(personsSearch.length > 0 ? personsSearch : persons).length} 
                            {' '}
                            {(personsSearch.length > 0 ? personsSearch : persons).length === 1 
                                ? 'contato encontrado' 
                                : 'contatos encontrados'
                            }
                        </p>
                    </div>
                    
                    <Persons 
                        search_phonebook={personsSearch} 
                        phonebook={persons} 
                        toggle={idCapture} 
                        delet={delete_person}
                    />
                </div>

            </div>
        </div>
    );
}

export default AppPhoneBook;