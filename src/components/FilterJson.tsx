export const filterOptions = [
    {
        id: 'odds',
        label: 'Odds',
        type: 'range' as const,
        min: 0,
        max: 1000
    },
    {
        id: 'bettingCompany',
        label: 'Betting Company',
        type: 'checkbox' as const,
        options: [
            { id: 'sportybet', label: 'Sportybet' },
            { id: '1xbet', label: '1xbet' },
            { id: 'betway', label: 'Betway' },
            { id: 'bet9ja', label: 'Bet9ja' }
        ]
    },
    {
        id: 'winRate',
        label: 'Win Rate',
        type: 'range' as const,
        min: 0,
        max: 100
    },
    {
        id: 'category',
        label: 'Category',
        type: 'checkbox' as const,
        options: [
            { id: 'football', label: 'Football' },
            { id: 'basketball', label: 'Basketball' },
            { id: 'tennis', label: 'Tennis' },
            { id: 'hockey', label: 'Hockey' }
        ]
    }
];