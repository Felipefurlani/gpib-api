import { sql } from "../database";
import { APIError } from "../models/api_error";
import { Cardapio } from "../models/cardapio";

export async function findByDate(date: Date) {
  const [dateStr] = date.toISOString().split("T");

  const [cardapio] = await sql<Cardapio>`
    SELECT principal,guarnicao,salada,sobremesa,suco,periodo,vegetariano
    FROM Cardapio
    WHERE data = ${dateStr}
  `;

  if (!cardapio) throw new APIError("Cardápio não encontrado", { status: 404 });

  return cardapio;
}

export async function findByMonth(month: number, year?: number) {
  const yearVal = year ?? new Date().getFullYear();

  const cardapios = await sql<Cardapio>`
    SELECT * FROM Cardapio
    WHERE MONTH(data) = ${month} AND YEAR(data) = ${yearVal}
    ORDER BY data DESC
  `;

  if (!cardapios?.length)
    throw new APIError("Cardápios não encontrados", { status: 404 });

  return cardapios;
}

export async function findAll() {
  const cardapios = await sql<Cardapio>`
    SELECT * FROM Cardapio ORDER BY data DESC
  `;

  if (!cardapios?.length)
    throw new APIError("Cardápios não encontrados", { status: 404 });

  return cardapios;
}

export async function create(cardapio: Cardapio) {
  try {
    await sql`
    INSERT INTO Cardapio
      (principal, guarnicao, salada, sobremesa, suco, periodo, vegetariano, data)
    VALUES (
      ${cardapio.principal},
      ${cardapio.guarnicao},
      ${cardapio.salada},
      ${cardapio.sobremesa},
      ${cardapio.suco},
      ${cardapio.periodo},
      ${cardapio.vegetariano},
      ${cardapio.date}
    )`;
  } catch (error) {
    if (!(error && typeof error === "object" && "code" in error)) throw error;

    if (error.code === "ER_DUP_ENTRY")
      throw new APIError("Cardápio já cadastrado", { status: 409 });
    else throw error;
  }
}
