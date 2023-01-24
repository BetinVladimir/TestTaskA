import { Body, Injectable } from '@nestjs/common';
import { IFile, IFileList } from './types';
import { DB } from '../app.db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  
  constructor(private readonly db: DB) {}

  public async addFile(userId: string, body: IFile): Promise<string> {
    const con = await this.db.getConnection()
    try {
      const { rows } = await con.query(
        'select file_id from files where filename = $1', 
        [body.fileName]
      )
      if (rows.length) {
        return rows[0].file_id
      }
      const id = uuidv4()
      await con.query(
        'insert into files (file_id, user_id, filename, dat_i, data, size) values ($1, $2, $3, now(), $4, $5)', 
        [id, userId, body.fileName, Buffer.from(body.data, 'base64'), body.size]
      )
      return id
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      con.release()
    } 
  }

  public async listFiles(userId: string): Promise<IFileList> {
    const con = await this.db.getConnection()
    try {
      const { rows } = await con.query(
        'select file_id, filename, dat_i, size from files where user_id = $1', 
        [userId]
      )
      return { files: rows.map(row => ({
        id: row.file_id,
        fileName: row.filename,
        size: row.size,
        date: row.dat_i
      }))}
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      con.release()
    } 
  }
  
  public async getFile(userId: string, fileId: string): Promise<Buffer> {
    const con = await this.db.getConnection()
    try {
      const { rows } = await con.query(
        'select data from files where user_id = $1 and file_id = $2', 
        [userId, fileId]
      )
      if (rows.length) {
        console.log('load', rows[0].data.toString('ascii'))
        return rows[0].data
      }
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      con.release()
    } 
  }
}
