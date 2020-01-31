import { Table, Column, Model, AllowNull, NotEmpty, Unique, Default, BeforeCreate, DataType } from 'sequelize-typescript';
import bcrypt from 'bcrypt';

@Table
export class User extends Model<User> {
    @NotEmpty
    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING
    })
    name: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    password: string;

    @Default(0)
    @Column({
        type: DataType.FLOAT
    })
    balance: number;

    @BeforeCreate
    static hashPassword(instance: User) {
        instance.password = bcrypt.hashSync(instance.password, 10);
    }
}
