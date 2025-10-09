const Form = (props) => {
    return (
        <div className="space-y-6">
            <form onSubmit={props.onSubmit} className="flex flex-col gap-4">
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                        Nome:
                    </label>
                    <input 
                        id="name"
                        name="name" 
                        value={props.value.name} 
                        onChange={props.onChange}
                        placeholder="Digite o nome completo"
                        className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required 
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="number" className="text-sm font-semibold text-gray-700">
                        Número:
                    </label>
                    <input 
                        id="number"
                        name="number" 
                        value={props.value.number} 
                        onChange={props.onChange}
                        placeholder="(00) 00000-0000"
                        className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                <div className="flex gap-3 mt-4">
                    <button 
                        type="submit"
                        className="flex-1 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition shadow-md"
                    >
                        {props.text_button}
                    </button>
                    
                    {props.reset && (
                        <button 
                            type="button"
                            onClick={props.reset}
                            className="flex-1 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 active:scale-95 transition"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Form;