import validators from "./services/Validators.js";
import express from 'express';
import morgan from 'morgan'
import Validators from "./services/Validators.js";
import cors from 'cors';
//const express = require('express');
//const morgan = require('morgan');
//const {json} = require("express");
const app = express();
app.use(cors())
//MONITORAMENTO DE REQUISIÇÕES HTTP!
morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body):'';
});

app.use((req, res, next) => {
    req.method === 'POST' ?
        morgan(':method :url :status :res[content-length] - :body  :response-time ms')(req, res, next):
        morgan('dev')(req, res, next);
});

app.use(express.json());

//OBJETOS DE DADOS
let persons = [
    { id: 1, name: "Afaela", number: "88988988998" },
    { id: 2, name: "Ilivia", number: "86996998965" },
    { id: 3, name: "Naria", number: "86996998965" },
    { id: 4, name: "Xaria", number: "86996998964" }
]

app.get('/', (req, res) => {
    return res.send(`
                        Wellcome to /api/persons! </br>
                        ${new Date().toString()}
                    `)
})

//ROTA GET PARA ALL
app.get('/api/persons', (req, res) => {
    return res.json(persons);
})

//ROTA GET PARA BUSCAS DE UM RECURSO
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id)
    return person ? res.json(person) : res.status(404).json(
        {
            error: "Recurso não encontrado"
        }
    )
})

//ROTA POST PARA EXCLUIR UM RECURSO
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id)

    if(person){
        persons = persons.filter(p => p.id !== id);
        res.status(204).end();
    }
    return res.status(404).json(
        {
            error: "Recurso não encontrado",
            message: 'Não existe usuário com este ID'
        }
    )
})

const gerateId = () => {
    return Math.max(...persons.map(p => p.id)) + 1;
}

//ROTA POST PARA ADICIONAR UM RECURSO
app.post('/api/persons/', (req, res) => {
    const person = {
        id: gerateId(),
        name: validators.valid_name(req.body.name),
        number: validators.valid_number(req.body.number)
    }

    if(!person.name)
        return res.status(400).json({
            error: 'Campos obrigários com problema!',
            message: 'O campo nome não pode ser vazio, e deve conter no minimo 3 caracteres'
        })
    else if (Validators.duplicate_name(person.name, persons))
        return res.status(409).json({
            error: 'Dados duplicados',
            message: 'o nome deve ser unico, tente outro nome'
        })
    else if (!person.number)
        return res.status(400).json({
            error: 'Campos obrigários com problema!',
            message: 'O campo number não pode ser vazio, e deve conter 11 números'
        })

    persons = persons.concat(person);
    res.status(201).json(person)
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})