import express from "express"
const router = express.Router();
import Doctor from "../models/doctorModels.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import Appointment from "../models/appointmentModel.js"
import User from "../models/userModel.js"

router.post(
  "/get-doctor-info-by-user-id",
  authMiddleware,
  async (req, resp) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.body.userId });
      resp.status(200).send({
        success: true,
        message: "Doctor info fetched successfully",
        data: doctor,
      });
    } catch (error) {
      resp
        .status(500)
        .send({ message: "Error getting doctor info", success: false, error });
    }
  }
);

router.post("/get-doctor-info-by-id", authMiddleware, async (req, resp) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    resp.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    resp
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.post("/update-doctor-profile", authMiddleware, async (req, resp) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    resp.status(200).send({
      success: true,
      message: "Doctor info updated successfully",
      data: doctor,
    });
  } catch (error) {
    resp
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.get(
  "/get-appointments-by-doctor-id",
  authMiddleware,
  async (req, resp) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ doctorId: doctor._id });
      resp.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      resp.status(500).send({
        message: "Error fetching appointments",
        success: false,
        error,
      });
    }
  }
);

router.post('/change-appointment-status', authMiddleware, async(req, resp)=>{
  try {
    const { appointmentId, status, userInfo} = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });
      const user = await User.findOne({_id: appointment.userId});
      const unseenNotifications = user.unseenNotifications
      unseenNotifications.push({
        type: "nappointment-status-changed",
        message: `Your appointment status has been ${status}`,
        onClickPath : '/appointments'
      });
      await user.save();
      resp
        .status(200)
        .send({
          message: 'Appointment status updated successfully',
          success: true,
        })
  }catch(error){
      console.log(error);
      resp
        .status(500)
        .send({
          message: 'Error changing appointment',
          success: false,
          error,
        });
  }
});

export default router