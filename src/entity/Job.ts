import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import JobStatus from '../entity/JobStatus';
import JoStatus from '../entity/JobStatus';

@Entity()
export default class Job{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    description:string;

    @Column()
    address:string;

    @Column()
    schedule:string;

    @Column()
    startDate:Date;

    @Column()
    days:string;

    @Column({type:'decimal'})
    payDertail:number;

    @Column()
    experience:string;

    @Column({type:'decimal'})
    lat:number;

    @Column({type:'decimal'})
    lng:number;

    @Column()
    jobStatusId:number;
    @ManyToOne(type => JobStatus, jobstatus => jobstatus.job)
    @JoinColumn({name:"jobStatusId"})
    jobstatus:JoStatus; 

    @Column()
    state:boolean;

}