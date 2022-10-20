import { AccessControlList, FileDeleteOrDuplicateParams } from '.';

export interface FileUploadParams extends FileDeleteOrDuplicateParams {
  filePath: string;
  mimetype: string;
  ACL?: AccessControlList;
}
