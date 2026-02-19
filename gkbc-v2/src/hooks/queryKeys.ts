export const memberKeys = {
  all: ['members'] as const,
  filtered: (search: string, businessType: string, marketArea: string) =>
    [...memberKeys.all, { search, businessType, marketArea }] as const,
};

export const connectionKeys = {
  all: ['connections'] as const,
  received: () => [...connectionKeys.all, 'received'] as const,
  sent: () => [...connectionKeys.all, 'sent'] as const,
  friends: () => [...connectionKeys.all, 'friends'] as const,
};