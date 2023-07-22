import fetch from "node-fetch";
import { Cardapio } from "../models/cardapio";
import { APIError } from "../models/api_error";
// import { APIError } from "../models/api_error";

const map = new Map<number, string[]>();

export async function getHolidays(year: number) {
  let holidays = map.get(year);

  if (!holidays) {
    const response = await fetch(
      `https://brasilapi.com.br/api/feriados/v1/${year}`
    );

    const body = await response.json();

    if (response.ok && Array.isArray(body))
      holidays = body.map((holiday) => holiday.date);
    else throw new APIError("Erro ao buscar feriados", { status: 500 });

    map.set(year, holidays);
  }

  return holidays;
}

export async function isHoliday(date: Date) {
  const year = date.getFullYear();
  const [dateStr] = date.toISOString().split("T");

  const holidays = await getHolidays(year);
  return holidays.includes(dateStr);
}

async function getInterval(from: Date, to: Date) {
  const interval =
    Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const dates: Array<undefined | "feriado"> = Array(interval);

  for (let year = from.getFullYear(); year <= to.getFullYear(); year++) {
    const holidays = await getHolidays(year);

    holidays.forEach((feriado) => {
      const feriadoDate = new Date(feriado);

      if (feriadoDate >= from && feriadoDate <= to) {
        const day = Math.floor(
          (feriadoDate.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
        );
        dates[day] = "feriado";
      }
    });
  }

  return dates;
}

async function addToInterval(cardapios: Cardapio[], from: Date, to: Date) {
  const dates: Array<Cardapio[] | "feriado" | undefined> = await getInterval(
    from,
    to
  );

  for (const cardapio of cardapios) {
    const day = Math.floor(
      (cardapio.data.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
    );

    const date = (dates[day] ??= []);
    if (date === "feriado") continue;
    date.push(cardapio);
  }

  return dates;
}

export async function addToYear(cardapios: Cardapio[]) {
  const firstDay = new Date(cardapios[0].data.getFullYear(), 0, 1);
  const lastDay = new Date(firstDay.getFullYear() + 1, 0, 0);

  return addToInterval(cardapios, firstDay, lastDay);
}

export async function addToMonth(cardapios: Cardapio[]) {
  const firstDay = new Date(
    cardapios[0].data.getFullYear(),
    cardapios[0].data.getMonth(),
    1
  );
  const lastDay = new Date(
    cardapios[0].data.getFullYear(),
    cardapios[0].data.getMonth() + 1,
    0
  );

  return addToInterval(cardapios, firstDay, lastDay);
}

export async function addToWeek(cardapios: Cardapio[]) {
  const monday = new Date(
    cardapios[0].data.getFullYear(),
    cardapios[0].data.getMonth(),
    cardapios[0].data.getDate() - cardapios[0].data.getDay() + 1
  );
  const friday = new Date(
    monday.getFullYear(),
    monday.getMonth(),
    monday.getDate() + 4
  );

  return addToInterval(cardapios, monday, friday);
}
