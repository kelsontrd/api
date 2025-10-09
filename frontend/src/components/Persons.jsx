import Ul from "./Ul";

const Persons = (props) => {
    const displayPersons = props.search_phonebook.length > 0 
        ? props.search_phonebook 
        : props.phonebook;

    return (
        <div>
            {displayPersons.length > 0 ? (
                <Ul 
                    toggle={props.toggle} 
                    delet={props.delet} 
                    persons={displayPersons}
                />
            ) : (
                <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-gray-500 text-lg font-medium">
                        Nenhum contato cadastrado
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        Adicione seu primeiro contato acima
                    </p>
                </div>
            )}
        </div>
    );
};

export default Persons;