import fetch from "node-fetch";

type Feriado = {
  date: string
}

const map = new Map<number, Feriado[]>()

export async function isHoliday(date: Date) {
    const year = date.getFullYear();

    const dateStr = date.toISOString().split("T")[0];

    if (!map.has(year)) {
      const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);
      const holidays = await response.json();
      map.set(year, holidays as Feriado[]);
    }

    return map.get(year)!.some((holiday) => holiday.date == dateStr);
  }