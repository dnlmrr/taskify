import { Inbox, CalendarClock, CalendarDays, Tag } from 'lucide-react';

export const config = {
  metadata: {
    title: {
      default: 'Taskify',
      template: `%s | Taskify`,
    },
    description:
      'Collaborate, manage projects, and reach new productivity peaks',
    icons: [
      {
        url: '/vercel.svg',
        href: '/vercel.svg',
      },
    ],
  },
  marketing: {
    links: [],
    docsLinks: [],
  },
  platform: {
    links: [
      {
        id: 'inbox',
        label: 'Inbox',
        icon: Inbox,
        href: '/inbox',
      },
      {
        id: 'today',
        label: 'Today',
        icon: CalendarDays,
        href: '/today',
      },
      {
        id: 'upcoming',
        label: 'Upcoming',
        icon: CalendarClock,
        href: '/upcoming',
      },
      {
        id: 'labels',
        label: 'Labels',
        icon: Tag,
        href: '/labels',
      },
    ],
  },
};
