import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import AddPost from '../AddPost/AddPost';

const AddPostNoDrag = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Añadir nuevo post 
      </Button>
      <Modal
       footer={[
        <Button key="back" onClick={handleCancel}>
          Volver
        </Button>
      ]} title="Añadir post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <AddPost/>
      </Modal>
    </>
  );
};

export default AddPostNoDrag;