import database from "../database";

export async function getCardapio(data: String){
    const [cardapio] = await database.execute('SELECT principal,guarnicao,salada,sobremesa,suco,periodo,vegetariano FROM Cardapio WHERE data = ?',[data])
    if(!cardapio[0]) {
        throw new Error('Cardápio indisponível!')
    }
    return cardapio;
}
