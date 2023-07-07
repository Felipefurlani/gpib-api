import { sql } from "../database";
import { APIError } from "../models/api_error";
import { Cardapio } from "../models/cardapio";
import { addToMonth, addToWeek, addToYear } from "./date_controller";

export async function cardapioHoje() {
  const [cardapio] = await sql<Cardapio>`
    SELECT principal,guarnicao,salada,sobremesa,suco,periodo,vegetariano
    FROM Cardapio
    WHERE data = CURDATE()
  `;

  if (!cardapio) {
    throw new APIError("Não há cardápios para hoje", {
      status: 404
    });
  }

  return cardapio;
}

export async function cardapiosSemana() {
  const cardapios = await sql<Cardapio>`
    SELECT data,principal,guarnicao,salada,sobremesa,suco,periodo,vegetariano
    FROM Cardapio
    WHERE WEEK(data) = WEEK(CURDATE())
    AND YEAR(data) = YEAR(CURDATE())
    ORDER BY data ASC
  `;

  if (!cardapios?.length)
    throw new APIError("Não há cardápios nessa semana", { status: 404 });

  return addToWeek(cardapios);
}

export async function cardapiosMes() {
  const cardapios = await sql<Cardapio>`
    SELECT * FROM Cardapio
    WHERE MONTH(data) = MONTH(CURDATE())
    AND YEAR(data) = YEAR(CURDATE())
    ORDER BY data ASC
  `;

  if (!cardapios?.length) {
    throw new APIError("Não há cardápios nesse mês", {
      status: 404
    });
  }

  return addToMonth(cardapios);
}

export async function cardapiosAno() {
  const cardapios = await sql<Cardapio>`
    SELECT * FROM Cardapio
    WHERE YEAR(data) = YEAR(CURDATE())
    ORDER BY data ASC
  `;

  if (!cardapios?.length) {
    throw new APIError("Não há cardápios nesse ano", {
      status: 404
    });
  }

  return addToYear(cardapios);
}

export async function bySemana(date: Date) {
  const [dateStr] = date.toISOString().split("T");

  const cardapios = await sql<Cardapio>`
    SELECT * FROM Cardapio
    WHERE WEEK(data) = WEEK(${dateStr})
    AND YEAR(data) = YEAR(${dateStr})
    ORDER BY data ASC
  `;

  if (!cardapios?.length) {
    throw new APIError("Cardápios não encontrados", {
      status: 404
    });
  }

  return addToWeek(cardapios);
}

export async function findByWeek(week: number) {
  const cardapios = await sql<Cardapio>`
    SELECT * FROM Cardapio
    WHERE WEEK(data) = ${week}
    AND YEAR(data) = YEAR(CURDATE())
    ORDER BY data ASC
  `;

  if (!cardapios?.length)
    throw new APIError("Cardápios não encontrados", { status: 404 });

  return addToWeek(cardapios);
}

export async function findByDate(date: Date) {
  const [dateStr] = date.toISOString().split("T");

  const [cardapio] = await sql<Cardapio>`
    SELECT * FROM Cardapio
    WHERE data = ${dateStr}
  `;

  if (!cardapio) throw new APIError("Cardápio não encontrado", { status: 404 });

  return cardapio;
}

export async function findByDay(day: number) {
  const [cardapio] = await sql<Cardapio>`
    SELECT * FROM Cardapio
    WHERE DAY(data) = ${day}
    AND MONTH(data) = MONTH(CURDATE())
    AND YEAR(data) = YEAR(CURDATE())
  `;

  if (!cardapio) {
    throw new APIError("Cardápio não encontrado", {
      status: 404
    });
  }

  return cardapio;
}

export async function findByMonth(month: number) {
  const cardapios = await sql<Cardapio>`
    SELECT * FROM Cardapio
    WHERE MONTH(data) = ${month}
    AND YEAR(data) = YEAR(CURDATE())
    ORDER BY data ASC
  `;

  if (!cardapios?.length)
    throw new APIError("Cardápios não encontrados", { status: 404 });

  return addToMonth(cardapios);
}

export async function findByYear(year: number) {
  const cardapios = await sql<Cardapio>`
    SELECT * FROM Cardapio
    WHERE YEAR(data) = ${year}
    ORDER BY data ASC
  `;

  if (!cardapios?.length)
    throw new APIError("Cardápios não encontrados", { status: 404 });

  return addToYear(cardapios);
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
      ${cardapio.data}
    )`;
  } catch (error) {
    if (!(error && typeof error === "object" && "code" in error)) throw error;

    if (error.code === "ER_DUP_ENTRY")
      throw new APIError("Cardápio já cadastrado", { status: 409 });
    else throw error;
  }
}
