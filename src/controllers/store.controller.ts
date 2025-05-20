import { Request, Response } from 'express';
import Store from '../models/Stores';

export default class StoreController {
    static async create(req: Request, res: Response) {
        try {
            const store = await Store.create(req.body, {
                fields: ['tradingName', 'ownerName', 'document', 'coverageArea', 'address'],
            });

            res.status(201).json(store);
            return;
        } catch (err) {
            console.error('Erro ao cadastrar loja:', err);

            res.status(400).json({ error: 'Erro ao cadastrar loja' });
            return;
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const stores = await Store.findAll();

            res.status(200).json(stores);
            return;
        } catch (err) {
            console.error('Erro ao listar lojas:', err);

            res.status(400).json({ error: 'Erro ao cadlistarastrar lojas' });
            return;
        }
    }

    static async findById(req: Request, res: Response) {
        const storeId = parseInt(req.params.id, 10);

        if (Number.isNaN(storeId)) {
            res.status(422).json({ erro: 'ID de cliente inválido' });
            return;
        }

        try {
            const store = await Store.findByPk(storeId);

            if (!store) {
                res.status(404).json({ error: 'Loja nao foi encontrada' });
                return;
            }

            res.status(200).json(store);
            return;
        } catch (err) {
            console.error('Erro ao listar lojas:', err);

            res.status(400).json({ error: 'Erro ao listar lojas' });
            return;
        }
    }

    static async findNearests(req: Request, res: Response) {
        const lng = parseFloat(req.body.lng);
        const lat = parseFloat(req.body.lat);

        if (Number.isNaN(lng) || Number.isNaN(lat)) {
            res.status(422).json({ erro: 'Coordenadas devem ser números' });
            return;
        }

        if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
            res.status(400).json({ erro: 'Coordenadas fora do intervalo válido' });
            return;
        }

        const result = await Store.findNearest(lng, lat);

        if (!result) {
            res.status(404).json({ erro: 'Nenhuma parceiro atende esta area' });
            return;
        }

        res.status(200).json(result);
        return;
    }
}
