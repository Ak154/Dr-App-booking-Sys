import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const BookAppointment = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctors/get-doctor-info-by-id",
        { doctorId: params.doctorId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        setDoctor(response.data.data);
      } else {
        toast.error("Failed to fetch doctor data.");
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Something went wrong.");
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    if (!date || !time) {
      toast.error("Please select a date and time.");
      return;
    }

    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/check-booking-availability",
        { doctorId: params.doctorId, date, time },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error checking availability.");
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    if (!date || !time) {
      toast.error("Please select a date and time.");
      return;
    }

    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/book-appointments",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date,
          time,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      } else {
        toast.error("Booking failed.");
      }
    } catch (error) {
      toast.error("Error booking appointment.");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, [params.doctorId]);

  return (
    <Layout>
      {doctor ? (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://c8.alamy.com/comp/TC9R47/finger-press-book-now-button-booking-and-online-reservation-icon-TC9R47.jpg"
                alt="Book Now"
                width="100%"
                height="400"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h5 className="normal-text">
                <b>Timings:</b> {doctor.timings?.[0]} - {doctor.timings?.[1]}
              </h5>
              <p><b>Phone:</b> {doctor.phoneNumber}</p>
              <p><b>Address:</b> {doctor.address}</p>
              <p><b>Fee:</b> {doctor.feePerConsultation}</p>
              <p><b>Website:</b> {doctor.website || "N/A"}</p>

              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(value ? value.format("DD-MM-YYYY") : null);
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setTime(value ? value.format("HH:mm") : null);
                    setIsAvailable(false);
                  }}
                />

                {!isAvailable ? (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={checkAvailability}
                    disabled={!date || !time}
                  >
                    Check Availability
                  </Button>
                ) : (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <h2>Loading doctor details...</h2>
      )}
    </Layout>
  );
};

export default BookAppointment;
