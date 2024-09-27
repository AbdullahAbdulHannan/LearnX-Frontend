import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message, Upload } from 'antd';
import axios from 'axios';
import './button.css';
import toast from "react-hot-toast";
import { useState } from 'react';

const LectureFormModal = ({ courseId, isOpen, onClose }) => {
  const [videoFile, setVideoFile] = useState(null); // State for video file
  const [btnLoading, setBtnLoading] = useState(false);

  const handleUploadChange = (info) => {
    const file = info.file.originFileObj;
    setVideoFile(file);
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file selected successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file selection failed.`);
    }
  };

  const handleFormSubmit = async (values) => {
    if (!videoFile) {
      message.error("Please upload a video file");
      return;
    }
    
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("file", videoFile); // Adjust 'file' if your backend expects another key

    try {
      const { data } = await axios.post(`http://localhost:5000/api/course/${courseId}`, formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      
      message.success('Lecture submitted successfully');
      onClose();
    } catch (error) {
      console.error('Submission failed:', error);
      message.error(error.response?.data?.message || 'Submission failed, please try again');
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <ModalForm
      title="Add New Lecture"
      visible={isOpen}
      onFinish={handleFormSubmit}
      modalProps={{
        destroyOnClose: true,
        onCancel: onClose,
        okText: 'Submit',
        cancelText: 'Cancel',
        okButtonProps: {
          className: 'custom-ok-button',
          loading: btnLoading,
        },
        cancelButtonProps: {
          className: 'custom-cancel-button',
        },
      }}
      submitTimeout={2000}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="title"
          label="Lecture Title"
          tooltip="Up to 24 characters"
          placeholder="Enter title"
          rules={[{ required: true, message: 'Please enter the lecture title' }]}
        />
        
        <ProFormText
          width="md"
          name="description"
          label="Lecture Description"
          placeholder="Enter description"
          rules={[{ required: true, message: 'Please enter the lecture description' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <Upload
          name="video"
          beforeUpload={() => false} // Prevent auto upload by Upload component
          onChange={handleUploadChange}
          accept="video/*"
          maxCount={1}
        >
          <Button icon={<PlusOutlined />}>Select Video</Button>
        </Upload>
      </ProForm.Group>
    </ModalForm>
  );
};

export default LectureFormModal;
