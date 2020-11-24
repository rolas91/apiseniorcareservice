import _ from 'lodash';
import {getRepository} from 'typeorm';
import Job from '../entity/Job';

const register = async(data:{
    title:string,
    description:string;
    address:string;
    schedule:string;
    startDate:string;
    days:string;
    payDertail:number;
    experience:string;
    lat:number;
    lng:number;
    state:boolean;
}):Promise<any> => {
    const {title, description, address,schedule, startDate, days, payDertail, experience, lat,lng,state} = data;
    const newJobs = getRepository(Job).create({
        title,
        description,
        address,
        schedule, 
        startDate, 
        days, 
        payDertail, 
        experience, 
        lat,
        lng,
        state
    });
    const result = await getRepository(Job).save(newJobs);
    return _.omit(result);
}

const getAllJobs = async () => {
    const result = await getRepository(Job).find();
    
    return _.omit({result});
}

const getJobsByParams = async(name:string, state:boolean):Promise<any> => {
    const result = await getRepository(Job).find({
        relations:["jobstatus"],
        where:(qb:any) =>{
            qb.where({
                state:state
            }).andWhere('name =:name',{name:name});
        }
    });
    
    return _.omit({result});
}

export{getJobsByParams, register, getAllJobs};
        