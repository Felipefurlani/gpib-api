import { sql } from "../database";
import { APIError } from "../models/api_error";

type Auth = {
  ra: number;
  senha: string;
};

export async function getSaldo({ ra, senha }: Auth) {
  const [saldo] = await sql<{ saldo: number }>`
    SELECT saldo FROM Aluno WHERE ra = ${ra} AND senha = ${senha}
  `;

  if (!saldo) throw new APIError("Aluno não encontrado", { status: 404 });

  return saldo;
}

export async function setSaldo({ ra, senha }: Auth, saldo: number) {
  await sql`
    UPDATE Aluno SET saldo = ${saldo} WHERE ra = ${ra} AND senha = ${senha}
  `;
}

export async function addSaldo({ ra, senha }: Auth, saldo: number) {
  await sql`
    UPDATE Aluno SET saldo = saldo + ${saldo} WHERE ra = ${ra} AND senha = ${senha}
  `;
}

export async function addAluno({ ra, senha }: Auth) {
  await sql`
    INSERT INTO Aluno (ra, senha, saldo) VALUES (${ra}, ${senha}, 0)
  `;
}

export async function checkRA(ra: string) {
  const [aluno] = await sql<Auth>`
    SELECT ra FROM Aluno WHERE ra = ${ra}
  `;

  return !!aluno;
}
