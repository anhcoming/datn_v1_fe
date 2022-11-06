export class Account {
  id!: string;
  phone!: string;
  fullName!: string;
  image!:string;
  address!:string;
  active!: string;
  email!: string;
  password!: string;
  role!:{
    id:string
    name:string
    status:string
  };
}
