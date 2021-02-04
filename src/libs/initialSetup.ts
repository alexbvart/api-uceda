import Role from '../models/Role';

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()
        if (count > 0) {
            return
        } else {

            const roles = await Promise.all([
                new Role({ name: 'admin' }).save(),
                new Role({ name: 'ventas' }).save(),
                new Role({ name: 'rrhh' }).save(),
            ])
            console.log(roles);

        }
    } catch (error) {
        console.error(error);

    }



}