export interface RoleStat {
  readonly value: string;
  readonly unit: string;
  readonly label: string;
}

export interface Achievement {
  readonly text: string;
  readonly stat?: RoleStat;
}

export interface Role {
  readonly id: string;
  readonly title: string;
  readonly period: string;
  readonly current?: boolean;
  readonly achievements: readonly Achievement[];
}

export const company = {
  name: 'LRN',
  location: 'Mumbai, India',
  startedOn: '2023-10-01',
} as const;

export const roles: readonly Role[] = [
  {
    id: 'associate',
    title: 'Software Developer Associate',
    period: 'Mar 2025 - Present',
    current: true,
    achievements: [
      {
        text: 'Replaced a manual Excel-to-PostgreSQL sync process with an AWS Lambda pipeline, cutting processing time from over 1 hour to seconds.',
        stat: { value: '99', unit: '%', label: 'Faster processing' },
      },
      { text: 'Architected a scalable micro-frontend layer in Angular, enabling parallel team development.' },
      { text: 'Designed a Node.js synchronization service for real-time course state updates across distributed services.' },
      { text: 'Delivered a multi-tenant licensing system with client-specific access control across thousands of courses.' },
    ],
  },
  {
    id: 'trainee',
    title: 'Trainee',
    period: 'Oct 2023 - Mar 2025',
    achievements: [{ text: 'Enhanced the existing website, fixed bugs, and contributed to APIs consumed by other developers.' }],
  },
];

export const currentRole = roles.find((role) => role.current) ?? roles[0];

export function yearsOfExperience(now: Date = new Date()): number {
  const start = new Date(company.startedOn);
  const years = (now.getTime() - start.getTime()) / (365.2425 * 24 * 60 * 60 * 1000);
  return Math.max(1, Math.floor(years));
}
