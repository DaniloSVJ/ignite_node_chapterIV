import "reflect-metadata"
import { app } from '@shared/infra/http/app'
import request from 'supertest'
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm"
import {hash} from "bcrypt"
import {v4 as uuidV4} from "uuid"
let connection: Connection
describe("List Categories", ()=>{
    beforeAll(async()=>{
        connection = await createConnection()
        await connection.runMigrations()
        const id = uuidV4()
        const password= await hash('admin',5)
        await connection.query(`
        INSERT INTO USERS(id,name,email,password,"isAdmin",create_at,driver_license)
        VALUES ('${id}','admin','admin@rentx22.com','${password}',true, 'now()','XXXXX')
        `)
    })
    afterAll(async()=>{
        await connection.dropDatabase()
        await connection.close()

    })
    it("should be able to list all categories",async()=>{
        const responseToken = await request(app).post("/sessions")
        .send({
            email:"admin@rentx22.com",
            password: "admin"	
        })
        const {token} = responseToken.body


        await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest"
            })
            .set({
                Authorization: `Bearer ${token}`
            })

        const response = await request(app).get("/categories")

        expect(response.status).toBe(200)
       // expect(response.body.length).toBe(1)
    })

    
})