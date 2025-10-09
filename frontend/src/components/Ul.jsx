const Ul = ({persons, toggle, delet}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {persons.map((person) => (
                <div 
                    key={person.id}
                    className="border-2 border-gray-200 rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                                {person.name}
                            </h3>
                            <p className="text-gray-600 flex items-center gap-2">
                                <span className="text-blue-500">📞</span>
                                {person.number}
                            </p>
                        </div>
                        <div className="text-3xl">
                            👤
                        </div>
                    </div>
                    
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                        <button 
                            onClick={() => toggle(person.id)}
                            className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 active:scale-95 transition"
                        >
                            ✏️ Editar
                        </button>
                        <button 
                            onClick={() => delet(person.id)}
                            className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 active:scale-95 transition"
                        >
                            🗑️ Excluir
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Ul;