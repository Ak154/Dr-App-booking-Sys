import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import dayjs from "dayjs";

function DoctorForm({ onFinish, initialValues }) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        timings: initialValues?.timings
          ? [dayjs(initialValues.timings[0], "HH:mm"), dayjs(initialValues.timings[1], "HH:mm")]
          : [],
      }}
    >
      <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Website" name="website" rules={[{ required: true }]}>
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Specialization" name="specialization" rules={[{ required: true }]}>
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Experience" name="experience" rules={[{ required: true }]}>
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Fee Per Consultation" name="feePerConsultation" rules={[{ required: true }]}>
            <Input placeholder="Fee Per Consultation" type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Timings" name="timings" rules={[{ required: true }]}>
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
