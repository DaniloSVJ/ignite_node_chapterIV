import { Repository,getRepository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpeficationRepository";


class SpecificationRepository implements ISpecificationsRepository{
    private repository: Repository<Specification>;

    constructor(){
        this.repository = getRepository(Specification)
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const  specifications =  await this.repository.findByIds(ids)

        return specifications
    }
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification =  await this.repository.create({
            name,
            description
        })
        await this.repository.save(specification)
        return specification
    }
    
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({name})
        return specification
    }

    
}

export {SpecificationRepository}