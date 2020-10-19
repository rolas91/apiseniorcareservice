import {Entity, Column, PrimaryGeneratedColumn} from'typeorm';


@Entity()
export default class User{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column('timestamp')
    date: Date;
}