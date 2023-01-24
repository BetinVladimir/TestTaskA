import { Injectable } from '@nestjs/common';
import { IUser } from './types';
import { DB } from '../app.db';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

@Injectable()
export class UserService {

  constructor(private readonly db: DB) {}

  public async createUser(email, password): Promise<string> {
    const con = await this.db.getConnection()
    try {
      const { rows } = await con.query('select user_id from users where email = $1', [email])
      if (rows.length) {
        return rows[0].user_id
      }
      const id = uuidv4()
      const pass = uuidv5(password, MY_NAMESPACE)
      await con.query('insert into users (user_id, email, password) values ($1, $2, $3)', [id, email, pass])
      return id
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      con.release()
    } 
  }

  public async loginUser(email: string, password: string): Promise<string> {
    const pass = uuidv5(password, MY_NAMESPACE)
    const con = await this.db.getConnection()
    try {
      const { rows } = await con.query('select user_id from users where email = $1 and password=$2', [email, pass])
      if (rows.length) {
        return rows[0].user_id
      }
      else throw Error(`User not found`)
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      con.release()
    } 
  }
  
  public async getUser(userId: string): Promise<string> {
    const con = await this.db.getConnection()
    try {
      const { rows } = await con.query('select user_id from users where user_id = $1', [userId])
      if (rows.length) {
        return rows[0].user_id
      }
      else throw Error(`User not found`)
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      con.release()
    } 
  }

}
