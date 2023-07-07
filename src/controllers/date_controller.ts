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

/**
 * Returns the number of the day within the year
 * @example dayOfYear(new Date("2021-01-01")) // 1
 * @example dayOfYear(new Date("2021-12-31")) // 365
 * @param date
 */
function dayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();

  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

async function getInterval(from: Date, to: Date) {
  const interval = Math.ceil(
    (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
  );
  const dates: Array<undefined | "feriado"> = Array(interval + 1);

  for (let year = from.getFullYear(); year <= to.getFullYear(); year++) {
    const holidays = await getHolidays(year);

    holidays.forEach((feriado) => {
      const feriadoDate = new Date(feriado);

      if (feriadoDate >= from && feriadoDate <= to) {
        const day = Math.ceil(
          (feriadoDate.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
        );
        dates[day] = "feriado";
      }
    });
  }

  return dates;
}

export async function addToYear(cardapios: Cardapio[]) {
  const firstDay = new Date(cardapios[0].data.getFullYear(), 0, 1);
  const lastDay = new Date(firstDay.getFullYear() + 1, 0, 0);

  const yearArr: Array<Cardapio | "feriado" | undefined> = await getInterval(
    firstDay,
    lastDay
  );

  for (const cardapio of cardapios) {
    yearArr[dayOfYear(cardapio.data) - 1] ??= cardapio;
  }

  return yearArr;
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

  const monthArr: Array<Cardapio | "feriado" | undefined> = await getInterval(
    firstDay,
    lastDay
  );

  for (const cardapio of cardapios) {
    monthArr[cardapio.data.getDate() - 1] ??= cardapio;
  }

  return monthArr;
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

  const weekArr: Array<Cardapio | "feriado" | undefined> = await getInterval(
    monday,
    friday
  );

  for (const cardapio of cardapios) {
    weekArr[cardapio.data.getDay() - 1] ??= cardapio;
  }

  return weekArr;
}
