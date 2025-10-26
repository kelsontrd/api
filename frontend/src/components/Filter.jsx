const Filter = ({onChange, value, search}) => {
    return (
        <div className="space-y-3 bg-">
            <div className="flex flex-col gap-2">
                <label htmlFor="search" className="text-sm font-semibold text-gray-700">
                    🔍 Buscar Contato:
                </label>
                <input
                    id="search"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Digite o nome..."
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
            </div>

            {search.length < 1 && value.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-700 text-sm font-medium">
                        ⚠️ Nenhum contato encontrado!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Filter;