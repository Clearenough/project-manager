interface IError{
  statusCode: number,
  message: string,
}

export interface IUserSignUp{
  name: string,
  login: string,
  password: string,
}

export interface IErrorSignUp{

}

export interface IUserSignIn{
  login: string,
  password: string,
}

export interface IErrorSignIn{
  status: number,
  data: IError,
}
