'use client'

import React, { useState, ChangeEvent } from 'react';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      console.dir(event.target.files)
      console.dir(event.target.files[0])
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // 이 부분에 API 엔드포인트를 넣어주세요
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('파일 업로드에 실패했습니다.');
      }

      console.log('파일 업로드 성공');
      alert('파일 업로드 성공!');
    } catch (error) {
      console.error('파일 업로드 에러:', error);
      alert('파일 업로드 에러!');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>파일 업로드</button>
    </div>
  );
};

export default FileUpload;