interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: "Hacer cafe",
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: "Llamar a Mari",
            status: 'in-progress',
            createdAt: Date.now()
        },
        {
            description: "jugar minecraft",
            status: 'finished',
            createdAt: Date.now()
        }
    ]
}