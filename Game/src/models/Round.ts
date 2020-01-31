import { Table, Column, Model, AllowNull, NotEmpty, Unique, DataType } from 'sequelize-typescript';

@Table
export class Round extends Model<Round> {
    @NotEmpty
    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING
    })
    username: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    card: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.FLOAT
    })
    betAmount: number;
}
