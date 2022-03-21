export class User {
    id?: string;
    email?: string = '';
    password?: string = '';
    fullName?: string = '';
    uid?: string;
    verify?: boolean = false;
    phone?: number;
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleteFlag?: string;
    // MASTER || BUSINESS || MANAGER || WAITER
    /**
     @MASTER
     Will have less access only able to Create,Activate,Disable Business 
      */
}