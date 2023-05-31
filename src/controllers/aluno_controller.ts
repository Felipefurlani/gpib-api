import database from "../database";

export async function getSaldo(ra: String, senha: String){
    const [saldo] = await database.execute('SELECT saldo FROM Saldo_RU WHERE ra = ? AND senha = ?', [ra, senha])

    if(!saldo[0]) {
        throw new Error('RA ou senha inválidos!')
    }

    return saldo[0]
}