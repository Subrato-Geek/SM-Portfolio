// Stats/Achievements data - Edit this file to change your statistics

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export const stats: Stat[] = [
  {
    value: 20,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    value: 15,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    value: 4,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
  },
];
