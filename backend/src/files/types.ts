export interface IFile {
    fileName: string
    data: Buffer
    size: number
}

export interface IFileWithId { 
    id: string
    fileName: string
    size: number
    date: string
}

export interface IFileList {
    files: IFileWithId[]
}

export interface Status{
    status: 'OK',
    token: string
}