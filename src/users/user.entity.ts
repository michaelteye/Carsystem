import {AfterUpdate,AfterRemove,
    Entity, Column, 
    PrimaryGeneratedColumn, AfterInsert 
} from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    email:string;
    
    @Column()
    @Exclude()
    password:string;
    @AfterInsert()
    loginsert(){
        console.log("User inserted",this.id);
    }
    @AfterRemove()
    accept(){
        console.log(`user with ${this.id} has been deleted succesfully`)
    }
    @AfterUpdate()
    update(){
        console.log(`User with ${this.id} has been updated successfully`)
    }
}