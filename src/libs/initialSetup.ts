import Role from '../models/Role';
import Brand from "../models/Brand";
import Category from "../models/ProductCategory"
import Workstation from '../models/Workstation';
import StatusDocument from '../models/StatusDocument';
import ProcessDocument from '../models/ProcessDocument';
import TypeDocument from '../models/TypeDocument';


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

export const createBrands = async () => {

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

export const createCategories = async () => {

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

export const createWorkstation = async () => {

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

export const createStatusDocument = async () => {

    try {
        const count = await StatusDocument.estimatedDocumentCount()
        if (count > 0) {
            return
        } else {

            const status = await Promise.all([
                new StatusDocument({ name: 'Current' }).save(),
                new StatusDocument({ name: 'Redesing' }).save(),
            ])


        }
    } catch (error) {
        console.error(error);

    }

}

export const createProcessDocument = async () => {

    try {
        const count = await ProcessDocument.estimatedDocumentCount()
        if (count > 0) {
            return
        } else {

            const process = await Promise.all([
                new ProcessDocument({ name: 'Investigacion y desarrollo', priority: 82 }).save(),
                new ProcessDocument({ name: 'Alianzas estratégicas', priority: 78 }).save(),
                new ProcessDocument({ name: 'Gestión de calidad', priority: 68 }).save(),
                new ProcessDocument({ name: 'Gestión de pedidos', priority: 77 }).save(),
                new ProcessDocument({ name: 'Envío de pedidos a empresas aliadas', priority: 64 }).save(),
                new ProcessDocument({ name: 'Seguimiento y monitoreo de pedidos', priority: 63 }).save(),
                new ProcessDocument({ name: 'Distribución de pedidos segun usuarios', priority: 68 }).save(),
                new ProcessDocument({ name: 'Marketing', priority: 64 }).save(),
                new ProcessDocument({ name: 'Tecnologías de la información', priority: 62 }).save(),
                new ProcessDocument({ name: 'Administracion de finanzas', priority: 49 }).save(),
                new ProcessDocument({ name: 'Atención al cliente', priority: 63 }).save(),
            ])


        }
    } catch (error) {
        console.error(error);

    }
}

export const createTypeDocument = async () => {
    try {
        const count = await TypeDocument.estimatedDocumentCount()
        if (count > 0) {
            return
        } else {

            const type = await Promise.all([
                new TypeDocument({ name: 'Characterization' }).save(),
                new TypeDocument({ name: 'Flow' }).save(),
                new TypeDocument({ name: 'Tracking' }).save(),
            ])


        }
    } catch (error) {
        console.error(error);

    }
}
