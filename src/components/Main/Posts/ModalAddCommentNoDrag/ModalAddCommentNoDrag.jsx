import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import AddComment from '../Post/Comments/AddComment/AddComment';
import './ModalAddCommentNoDrag.scss'

const ModalAddCommentNoDrag = ({postId}) => {
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
      <Button type="primary mobileDis" onClick={showModal}>
        Añadir nuevo comentario
      </Button>
      <Modal
       footer={[
        <Button key="back" onClick={handleCancel}>
          Volver
        </Button>
      ]} title="Añadir comentario" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <AddComment postId={postId}/>
      </Modal>
    </>
  );
};

export default ModalAddCommentNoDrag;