import { DataTypes, Model, Sequelize, QueryTypes } from 'sequelize';
import { IStore } from '../interfaces/IStore';

type StoreCreationAttributes = Omit<IStore, 'id'>;

class Store extends Model<IStore, StoreCreationAttributes> implements IStore {
    public id!: number;
    public tradingName!: string;
    public ownerName!: string;
    public document!: string;
    public coverageArea!: GeoJSON.MultiPolygon;
    public address!: GeoJSON.Point;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initialize(sequelize: Sequelize) {
        Store.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                tradingName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                ownerName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                document: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                coverageArea: {
                    type: DataTypes.GEOMETRY('MULTIPOLYGON', 4326),
                    allowNull: false,
                },
                address: {
                    type: DataTypes.GEOMETRY('POINT', 4326),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'stores',
                timestamps: true,
                indexes: [
                    { fields: ['coverageArea'], using: 'GIST', name: 'stores_coverage_area_gist' },
                    { fields: ['address'], using: 'GIST', name: 'stores_address_gist' },
                ],
            },
        );
    }

    static async findNearest(lng: number, lat: number) {
        const sequelize = this.sequelize!;

        const [result] = await sequelize.query(`
            SELECT
                id,
                "tradingName",
                "ownerName",
                document,
                ST_AsText("coverageArea") AS coverage_area_wkt,
                ST_AsText("address") AS address_wkt,
                -- Ponto de teste DENTRO do polígono (${lng}, ${lat} é um vértice do MultiPolygon)
                ST_Covers(
                    "coverageArea",
                    ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
                ) AS ponto_dentro_coverage,
                -- Distância entre o endereço e o ponto de teste (em metros)
                ST_Distance(
                    "address"::geography,
                    ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography
                ) AS distancia_metros
            FROM
                stores
            WHERE
                ST_Covers(
                    "coverageArea",
                    ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
                )
            ORDER BY
                distancia_metros ASC
            LIMIT 1;
        `,
            {
                replacements: { lng, lat },
                type: QueryTypes.SELECT,
            },
        );

        return result as IStore & { distance: number };
    }
}

export default Store;
