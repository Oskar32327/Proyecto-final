

export class roleValidator{
    isEmpleado(user:any):boolean{
        return user.role === 'EMPLEADO';
    }

    isAdmin(user:any):boolean{
        return user.role === 'ADMIN';
    }

    isEditor(user:any):boolean{
        return user.role === 'EDITOR';
    }

}