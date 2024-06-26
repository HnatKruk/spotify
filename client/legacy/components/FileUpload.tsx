
import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { ChangeEvent, FC, useRef } from 'react'

interface FileUploadProps {
  setFile: Function;
  accept: string;
}

const FileUpload: FC<FileUploadProps> = ({ setFile, accept, children }) => {
  const ref = useRef<HTMLInputElement>()
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }
  return (
    <div
      onClick={() => ref.current?.click()}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%'
      }}
    >
      <input
        type='file'
        accept={accept}
        style={{ display: 'none' }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  )
}

export default FileUpload