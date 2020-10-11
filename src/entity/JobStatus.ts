import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Job from '../entity/Job';
@Entity()
export default class JobStatus{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;

    
    @OneToMany(type => Job, job => job.jobstatus) 
    job:Job[];

}