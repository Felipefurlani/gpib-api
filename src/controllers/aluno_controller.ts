import { sql } from "../database";
import { APIError } from "../models/api_error";

type Auth = {
  ra: number;
  senha: string;
};

export async function getSaldo({ ra, senha }: Auth) {
  const [aluno] = await sql<{ saldo: number, senha: string }>`
    SELECT senha, saldo FROM Saldo_RU WHERE ra = ${ra}
  `;

  if (!aluno) throw new APIError("Aluno não encontrado", { status: 404 });
  if (aluno.senha !== senha) throw new APIError("Senha incorreta", { status: 401 });

  return { saldo: aluno.saldo };
}

export async function setSaldo({ ra, senha }: Auth, saldo: number) {
  await sql`
    UPDATE Saldo_RU SET saldo = ${saldo} WHERE ra = ${ra} AND senha = ${senha}
  `;
}

export async function addSaldo({ ra, senha }: Auth, saldo: number) {
  await sql`
    UPDATE Saldo_RU SET saldo = saldo + ${saldo} WHERE ra = ${ra} AND senha = ${senha}
  `;
}

export async function addAluno({ ra, senha }: Auth) {
  await sql`
    INSERT INTO Saldo_RU (ra, senha, saldo) VALUES (${ra}, ${senha}, 0)
  `;
}

export async function checkRA(ra: string) {
  const [aluno] = await sql<Auth>`
    SELECT ra FROM Saldo_RU WHERE ra = ${ra}
  `;

  return !!aluno;
}
