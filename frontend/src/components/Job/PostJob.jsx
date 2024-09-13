import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        `${BACKEND_URL}/api/v1/job/post`,
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW JOB</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;



// import React, { useContext, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../../main";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import './PostJob.css'; // Import the CSS file

// const stripePromise = loadStripe('your-stripe-public-key');

// const PostJob = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [country, setCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [location, setLocation] = useState("");
//   const [salaryFrom, setSalaryFrom] = useState("");
//   const [salaryTo, setSalaryTo] = useState("");
//   const [fixedSalary, setFixedSalary] = useState("");
//   const [salaryType, setSalaryType] = useState("default");
//   const [amount, setAmount] = useState(50); // Set the amount to be paid

//   const { isAuthorized, user } = useContext(Context);
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigateTo = useNavigate();

//   const handleJobPost = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return; // Stripe.js hasn't loaded yet

//     try {
//       const { data: clientSecret } = await axios.post(
//         ${BACKEND_URL}/api/v1/payment/create-payment-intent",
//         { amount }
//       );

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message);
//       } else if (result.paymentIntent.status === 'succeeded') {
//         await axios.post(
//           ${BACKEND_URL}/api/v1/job/post",
//           {
//             title,
//             description,
//             category,
//             country,
//             city,
//             location,
//             salaryFrom,
//             salaryTo,
//             fixedSalary,
//           },
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         toast.success("Job posted successfully!");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Payment failed");
//     }
//   };

//   if (!isAuthorized || (user && user.role !== "Employer")) {
//     navigateTo("/");
//   }

//   return (
//     <div className="job_post page">
//       <div className="container">
//         <h3 className="title">Post a New Job</h3>
//         <form onSubmit={handleJobPost} className="post-job-form">
//           <div className="form-group">
//             <label htmlFor="title">Job Title</label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter job title"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="category">Category</label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="Graphics & Design">Graphics & Design</option>
//               <option value="Mobile App Development">Mobile App Development</option>
//               <option value="Frontend Web Development">Frontend Web Development</option>
//               <option value="MERN Stack Development">MERN Stack Development</option>
//               <option value="Account & Finance">Account & Finance</option>
//               <option value="Artificial Intelligence">Artificial Intelligence</option>
//               <option value="Video Animation">Video Animation</option>
//               <option value="MEAN Stack Development">MEAN Stack Development</option>
//               <option value="MEVN Stack Development">MEVN Stack Development</option>
//               <option value="Data Entry Operator">Data Entry Operator</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="country">Country</label>
//             <input
//               type="text"
//               id="country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               placeholder="Enter country"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="city">City</label>
//             <input
//               type="text"
//               id="city"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               placeholder="Enter city"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="location">Location</label>
//             <input
//               type="text"
//               id="location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="Enter location"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="salaryType">Salary Type</label>
//             <select
//               id="salaryType"
//               value={salaryType}
//               onChange={(e) => setSalaryType(e.target.value)}
//               required
//             >
//               <option value="default">Select Salary Type</option>
//               <option value="Fixed Salary">Fixed Salary</option>
//               <option value="Ranged Salary">Ranged Salary</option>
//             </select>
//           </div>
//           {salaryType === "Fixed Salary" && (
//             <div className="form-group">
//               <label htmlFor="fixedSalary">Fixed Salary</label>
//               <input
//                 type="number"
//                 id="fixedSalary"
//                 value={fixedSalary}
//                 onChange={(e) => setFixedSalary(e.target.value)}
//                 placeholder="Enter fixed salary"
//                 required
//               />
//             </div>
//           )}
//           {salaryType === "Ranged Salary" && (
//             <div className="salary-range">
//               <div className="form-group">
//                 <label htmlFor="salaryFrom">Salary From</label>
//                 <input
//                   type="number"
//                   id="salaryFrom"
//                   value={salaryFrom}
//                   onChange={(e) => setSalaryFrom(e.target.value)}
//                   placeholder="Enter salary from"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="salaryTo">Salary To</label>
//                 <input
//                   type="number"
//                   id="salaryTo"
//                   value={salaryTo}
//                   onChange={(e) => setSalaryTo(e.target.value)}
//                   placeholder="Enter salary to"
//                   required
//                 />
//               </div>
//             </div>
//           )}
//           <div className="payment_wrapper">
//             <h4>Payment Information</h4>
//             <CardElement />
//           </div>
//           <button type="submit" className="submit-button">Pay & Post Job</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const PostJobWrapper = () => (
//   <Elements stripe={stripePromise}>
//     <PostJob />
//   </Elements>
// );

// export default PostJobWrapper;
