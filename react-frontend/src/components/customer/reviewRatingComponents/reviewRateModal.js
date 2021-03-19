import React, {useEffect, useState } from 'react';
import { Card, Rate, Modal, Input, Button } from 'antd';

const { TextArea } = Input;

const ReviewRateModal = (props) => {
  const [ rating, setRating ] = useState(props.rating);
  const [ review, setReview ] = useState(props.review);

  useEffect(()=>{
    setRating(props.rating);
  }, [props.rating]);

  useEffect(()=>{
    setReview(props.review);
  }, [props.review]);

  return (
    <>
      <Modal
        title="Rate and Review"
        // visible={visible}
        {...props}
        footer={[
            <Button 
              key="back" 
              onClick={props.onCancel}>
              Return
            </Button>,
            <Button 
                key="submit" 
                type="primary"
                className="button" 
                loading={props.submitButtonLoading} 
                onClick={props.onOk}
            >
              Submit
            </Button>,
        ]}
      >
        <div className="rating-card">
        <Card className="rating-unit">
            <b>Rate: </b><br/>
          <Rate 
            className="rate" 
            allowHalf 
            style={{color: '#bb8c63'}} 
            defaultValue= {rating} 
            onChange={props.onChangeRating}
          />
        </Card>
        <Card className="rating-unit">
            <b>Give your Review:</b>
            <TextArea 
                rows={4} 
                defaultValue={review}
                onChange={props.onChangeReview}
                allowClear
                autoSize={false}
                showCount={true}
            >
            </TextArea>
        </Card>

      </div>
      </Modal>
    </>
  );
};

export default ReviewRateModal;