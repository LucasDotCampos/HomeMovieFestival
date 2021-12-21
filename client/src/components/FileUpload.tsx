import { SyntheticEvent, useState } from 'react';
import {
  validateFileSize,
  validateFileType,
} from '../services/fileValidatorService';
import FileService from '../services/fileService';

function FileUpload() {
  const [uploadFormError, setUploadFormError] = useState<string>('');

  const handleFileUpload = async (element: HTMLInputElement) => {
    const file = element.files;
    console.log(file);

    if (!file || file.length === 0) {
      setUploadFormError('');
      return;
    }

    console.log(file[0].name);

    const validFileSize = await validateFileSize(file[0].size);
    const validFileType = await validateFileType(
      FileService.getFileExtension(file[0].name)
    );

    if (!validFileSize.isValid) {
      setUploadFormError(validFileSize.errorMessage);
    }
    if (!validFileType.isValid) {
      setUploadFormError(validFileType.errorMessage);
    }
    if (uploadFormError && validFileSize.isValid) {
      setUploadFormError('');
    }
    if (uploadFormError && validFileType.isValid) {
      setUploadFormError('');
    }
    const fileService = new FileService(file[0]);
  };

  return (
    <div>
      <div>
        {uploadFormError && <p>{uploadFormError}</p>}
        <div>
          <input
            type="file"
            onChange={(e: SyntheticEvent) =>
              handleFileUpload(e.currentTarget as HTMLInputElement)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
