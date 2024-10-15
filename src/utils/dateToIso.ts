interface TDate {
  calendar: {
    identifier: string;
  };
  day: number;
  era: string;
  month: number;
  year: number;
}

export const dateToIso = (date: TDate) => {
  if (!date) {
    return new Date().toISOString();
  }

  return new Date(`${date?.month}-${date?.day}-${date?.year}`).toISOString();
};
