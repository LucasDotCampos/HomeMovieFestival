import { useState, useEffect } from 'react';
import { useUpload } from 'react-use-upload';

const getUrl = async (files: any) => {
  let response = await fetch('http://localhost:3000/get-url');
  let { url } = await response.json();

  return url;
};

const NormalUpload = () => {
  let [files, setFiles] = useState<files>();

  let { loading, progress, error, done } = useUpload(files, {
    getUrl,
    name: 'test',
  });

  useEffect(() => {
    if (!done) return;
    console.log('done uploading, send something to your server if you need to');
  }, [done]);

  return (
    <div style={{ marginBottom: 50 }}>
      <div>Signed upload</div>

      {loading ? (
        <div>Progress: {progress}</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
      )}
    </div>
  );
};
