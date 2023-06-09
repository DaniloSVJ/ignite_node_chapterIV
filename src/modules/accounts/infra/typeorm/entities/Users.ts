import {v4 as uuidV4} from "uuid"
import {Entity,PrimaryColumn,Column,CreateDateColumn} from "typeorm"

@Entity("users")
class User{

    @PrimaryColumn()    
    id:string;
    
    @Column()
    name:string
    
       
    @Column()
    password: string;
   
    @Column()
    email:string;
   
    @Column()
    driver_license: string

    @Column()
    isAdmin: boolean

    @Column()
    avatar:string
    
    @CreateDateColumn()
    create_at: Date

    constructor(){
        if(!this.id){
            this.id = uuidV4(),
            this.isAdmin = false
        }
    }

}

export {User}