import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { FileController } from './files/files.controller';
import { IFileList, IFileWithId } from './files/types';
import { FileModule } from './files/files.module';
import { UserModule } from './users/user.module';
import { DbModule } from './db.module';


describe('AppController', () => {
  let appController: AppController;

  let userController: UserController;
  let fileController: FileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UserModule, FileModule, DbModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    userController = app.get<UserController>(UserController);
    fileController = app.get<FileController>(FileController);


  });

  describe('ping', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('user flow', () => {
    let userId: string
    const email = 'test@mailforspam.com'
    const password = 'qwerty'

    it('should signIn"', async () => {
      await userController.signIn({ email, password }, { cookie: (name, value) => { userId = value } })
      expect(!!userId).toBe(true);
    });

    it('should signUp"', async () => {
      await userController.signUp({ email, password }, { cookie: (name, value) => { userId = value } })
      expect(!!userId).toBe(true);
    });

    it('should isLogin"', async () => {
      const isLogin = await userController.isLogin({ cookies: {userId: undefined}})
      expect(isLogin.isLogin).toBe(false);
    });

    it('should FileUpload and get', async () => {
      const fileName = 'F1'
      const fileBody = 'file data'

      const { fileId } = await fileController.addFile({ cookies: { userId }}, {
        fileName,
        data: Buffer.from(fileBody, 'ascii').toString('base64'),
        size: fileBody.length
      })

      const { fileId: fileId2 } = await fileController.addFile({ cookies: { userId }}, {
        fileName,
        data: Buffer.from(fileBody, 'ascii').toString('base64'),
        size: fileBody.length
      })

      expect(fileId).toBe(fileId2);

      const files: IFileList = await fileController.listFiles({ cookies: { userId }})

      const file: IFileWithId = files.files.find( f => f.fileName === fileName) 

      expect(!!file).toBe(true);

      const data = await fileController.getFile({ cookies: { userId }}, { fileId: file.id })

      expect(data.toString('ascii')).toBe(fileBody);
    });

  });
});
