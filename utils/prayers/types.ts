export type Zone = {
  jakimCode: string;
  negeri: string;
  daerah: string;
};

export type PrayerTime = {
  hijri: string;
  date: string;
  day: string;
  fajr: string;
  syuruk: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

export type PrayerTimesDayResponse = {
  prayerTime: PrayerTime;
  status: string;
  serverTime: string;
  periodType: string;
  lang: string;
  zone: string;
  bearing: string;
};

export type SinglePrayerTime = {
  name: string;
  time: string;
};

export type PrayerLog = {
  id: string;
  date: string;
  prayer_name: string;
  completed: boolean;
};
