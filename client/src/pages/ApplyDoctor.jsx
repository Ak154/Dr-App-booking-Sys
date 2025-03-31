import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import DoctorForm from "../components/DoctorForm";
import dayjs from "dayjs";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // const onFinish = async (values) => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "/api/users/apply-doctor-account",
  //       {
  //         ...values,
  //         userId: user._id,
  //         timings: values.timings
  //           ? [values.timings[0].format("HH:mm"), values.timings[1].format("HH:mm")]
  //           : [],
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log(response)
  //     dispatch(hideLoading());

  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       navigate("/");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     dispatch(hideLoading());
  //     toast.error("Something went wrong");
  //   }
  // };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
  
      // Ensure values.timings is an array of dayjs objects before formatting
      const formattedTimings = values.timings?.map(time => 
        dayjs(time, "HH:mm").isValid() ? dayjs(time).format("HH:mm") : null
      ).filter(time => time !== null); // Remove invalid values
  
      const response = await axios.post(
        "/api/users/apply-doctor-account",
        {
          ...values,
          userId: user._id,
          timings: formattedTimings,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      dispatch(hideLoading());
  
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor Account</h1>
      <hr />
      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
};

export default ApplyDoctor;
