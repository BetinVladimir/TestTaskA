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
      const result = await userController.signIn({ email, password })
      expect(!!result.access_token).toBe(true);
    });

    it('should signUp"', async () => {
      const result = await userController.signUp({ email, password })
      expect(!!result.access_token).toBe(true);
    });

  });
});
