export interface IFile {
    fileName: string
    data: string
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