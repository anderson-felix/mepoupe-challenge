import {
  FileDeleteOrDuplicateParams,
  FileUploadParams,
  GetFileLinkParams,
  GetUploadLinkParams,
  UploadLinkResponse,
} from '../interfaces';

export default interface IStorageProvider {
  getUploadLink(data: GetUploadLinkParams): Promise<UploadLinkResponse>;
  getFileLink(data: GetFileLinkParams): Promise<string>;
  saveFile(data: FileUploadParams): Promise<string>;
  deleteFile(data: FileDeleteOrDuplicateParams): Promise<void>;
}
