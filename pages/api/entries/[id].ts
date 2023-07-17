
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { EntryBack, IEntry } from '@/models';
import mongoose from 'mongoose';
import { Entry } from '@/interfaces';

type Data =
    { message: string }
    | IEntry
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido' })
    }

    switch (req.method) {
        case 'GET':
            return getEntryById(req, res);
        case 'PUT':
            return updateEntry(req, res);
        default:
            return res.status(400).json({ message: 'Enpoint no existe' })
    }

}


const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entry = await EntryBack.findById(id);
    await db.disconnect();
    if (!entry) {
        return res.status(400).json({ message: 'El id no existe' })
    }
    return res.status(200).json(entry);
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entryToUpdate = await EntryBack.findById(id);
    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: 'El id no existe' })
    }
    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;
    try {
        const updatedEntry = await EntryBack.findByIdAndUpdate<Entry>(id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        return res.status(200).json(updatedEntry!);
    } catch (error:any) {
        await db.disconnect();
        return res.status(400).json({message:error.errors.status.message});
    }

}