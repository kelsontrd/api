class Validator{
    static empty_text (text){
        if(text === ""){
            alert("O campo nome não pode ser vazio!!!");
            return true;
        }
        return false;
    }

    static exist_name(data_base, object_candidate){
        if (data_base.some(person => person.name.toUpperCase() === object_candidate.name.toUpperCase())){
            alert("O nome já existe na lista telefonica");
            return true;
        }
        return false;
    }

    static is_numbers (text) {
        if(!parseInt(text)){
            alert("Digite somente números no campo numero!!!");
            return true;
        }
        return false;
    }


    static verify_number_digits(text){
        if(text.length !== 11){
            alert("Digite exatamente 11 números no campo número!!!");
            return true;
        }
        return false;
    }

    static exist_number(data_base, object_candidate){
        if(data_base.some(person => person.number === object_candidate.number)){
            let filter_obj = data_base.filter(person => person.number === object_candidate.number);
            alert(`Esse numero ja está cadastrado no contato: ${filter_obj[0].name}`);
        return true;
        }
        return false;
    }

    static equals_inputs (data_base, object_candidate){
        const capture = data_base.find(person => person.id === object_candidate.id);
        if(capture.name === object_candidate.name && capture.number === object_candidate.number){
            alert("Altere pelo menos um dos campos!!!");
            return true;
        }
        return false;
    }
    static validate_new(data_base, object_candidate){
        if(
            Validator.empty_text(object_candidate.name) ||
            Validator.exist_name(data_base, object_candidate) ||
            Validator.empty_text(object_candidate.number) ||
            Validator.is_numbers(object_candidate.number) ||
            Validator.verify_number_digits(object_candidate.number) ||
            Validator.exist_number(data_base, object_candidate)
        ){
            return false;
        }
        return true;
    }

    static validate_update (data_base, object_candidate){
        if(
            Validator.empty_text(object_candidate.name) ||
            Validator.empty_text(object_candidate.number) ||
            Validator.equals_inputs(data_base, object_candidate)
        ){
            return false;
        }else if(data_base.some(person => person.id !== object_candidate.id && person.name === object_candidate.name)){
            alert("Escolha outro nome essa nome ja consta nos contatos!!!");
            return false;
        }else if(data_base.some(person => person.id !== object_candidate.id && person.number === object_candidate.number)){
            alert("Escolha outro numero esse numero ja consta nos contatos!!!");
            return false;
        }else if (
            Validator.verify_number_digits(object_candidate.number) ||
            Validator.is_numbers(object_candidate.number)
        ){
            return false;
        }
        return true;
    }
}

export default Validator;