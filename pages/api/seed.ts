
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '@/database';
import { EntryBack } from '@/models';

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        res.status(401).json({ message: 'No tiene acceso a este servicio' })
    }
    await db.connect();

    await EntryBack.deleteMany();
    console.log(seedData)
    await EntryBack.insertMany(seedData.entries);

    await db.disconnect();
    res.status(200).json({ message: 'Proceso realizado correctamente' })
}
