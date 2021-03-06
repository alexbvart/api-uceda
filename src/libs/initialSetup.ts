import Role from '../models/Role';
import Brand from "../models/Brand";
import Category from "../models/ProductCategory" 
import Workstation from '../models/Workstation';
       

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()
        if (count > 0) {
            return
        } else {

            const roles = await Promise.all([
                new Role({ name: 'Administrador' }).save(),
                new Role({ name: 'Ventas' }).save(),
                new Role({ name: 'RR.HH' }).save(),
            ])
        
        }
    } catch (error) {
        console.error(error);

    }
}

export const createBrands = async() =>{

    try {
        const count = await Brand.estimatedDocumentCount()
        if (count > 0) {
            return
        } else {

            const brands = await Promise.all([
                new Brand({ name: 'Pick 2' }).save(),
                new Brand({ name: 'Fronger' }).save(),
                new Brand({ name: 'Redist' }).save(),
            ])
           

        }
    } catch (error) {
        console.error(error);

    }
}

export const createCategories = async() =>{

    try {
        const count = await Category.estimatedDocumentCount()
        if (count > 0) {
            return
        } else {

            const categories = await Promise.all([
                new Category({ name: 'Micro Controlador' }).save(),
                new Category({ name: 'Multi-Tester' }).save(),
                new Category({ name: 'Componentes' }).save(),
            ])
           

        }
    } catch (error) {
        console.error(error);

    }
}

export const createWorkstation = async() =>{

    try {
        const count = await Workstation.estimatedDocumentCount()
        if (count > 0) {
            return
        } else {

            const workstation = await Promise.all([
                new Workstation({ name: 'Ventas' }).save(),
                new Workstation({ name: 'RR.HH' }).save(),
                new Workstation({ name: 'Administrador' }).save(),
            ])
           

        }
    } catch (error) {
        console.error(error);

    }
}