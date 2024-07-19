import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../styles/RegisterForm.css";
import RegisterImage from "../assets/images/signup.png";
import Footer from "./Footer";
import NavBar from "./NavBar";

const RegisterForm = () => {
  const [registrationType, setRegistrationType] = useState("organization");
  // const [registrationType, setRegistrationType] = useState("freelancer");
  const [companyName, setCompanyName] = useState("");
  const [companyEstablishmentDate, setCompanyEstablishmentDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [branchLocation, setBranchLocation] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [freelancerName, setFreelancerName] = useState("");
  const [freelancerDOB, setFreelancerDOB] = useState("");
  const [freelancerContactNumber, setFreelancerContactNumber] = useState("");
  const [freelancerEmail, setFreelancerEmail] = useState("");
  const [freelancerPassword, setFreelancerPassword] = useState("");
  const [freelancerConfirmPassword, setFreelancerConfirmPassword] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerContactNumber, setCustomerContactNumber] = useState("");
  const [customerPassword, setCustomerPassword ] = useState("");
  const [customerConfirmPassword, setCustomerConfirmPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState("");



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const isEmailValid = await checkemail(email, freelancerEmail, customerEmail, registrationType);


      if (!isEmailValid) {
        alert("Invalid email address");
        return;
      }
      //  const userExists = await checkUserExists(email,branchLocation);
      //  if (userExists) {
      //    alert('User with this email already exists. Please use a different email.');
      //    return;
      //  }

          // Password validation
    // const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!passwordRegExp.test(password)) {
    //   alert('Invalid password. Please follow the password criteria.');
    //   return;
    // }

      let dataToSend = {
        registrationType,
      };
      
      if (registrationType === 'organization') {
        dataToSend = {
          ...dataToSend,
          companyName,
          companyEstablishmentDate,
          phoneNumber,
          email,
          companyAddress,
          branchLocation, // Include branch location here
          password,
          confirmPassword,
        };
      } else if (registrationType === 'freelancer') {
        dataToSend = {
          ...dataToSend,
          freelancerName,
          freelancerDOB,
          freelancerContactNumber,
          freelancerEmail,
          password: freelancerPassword,
          confirmPassword: freelancerConfirmPassword,
        };
        
      }else if (registrationType === 'customer') {
        // Customer-specific fields
        dataToSend = {
          ...dataToSend,
          customerName,
          customerEmail,
          customerContactNumber,
          password: customerPassword,
          confirmPassword: customerConfirmPassword,
        };
      }
      // console.log(dataToSend);
    
      const response = await axios.post('http://localhost:5000/register', dataToSend);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  const checkemail = async (email, freelancerEmail, customerEmail, registrationType) => {
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    switch (registrationType) {
      case 'organization':
        if (!emailRegExp.test(email)) {
          setEmailMessage("Invalid Company email address");
          return false;
        }
        break;
  
      case 'freelancer':
        if (!emailRegExp.test(freelancerEmail)) {
          setEmailMessage("Invalid Freelancer email address");
          return false;
        }
        break;
  
      case 'customer':
        if (!emailRegExp.test(customerEmail)) {
          setEmailMessage("Invalid Customer email address");
          return false;
        }
        break;
  
      default:
        // Handle other registration types if needed
    }
  
    setEmailMessage("");
    return true;
  };
  
  
  const checkUserExists = async (email,branchLocation) => {
    try {
      // Make an API request to check if the user with the given email already exists
      const response = await axios.get(`http://localhost:5000/checkUserExists?email=${email}`);
      return response.data.exists; // Assuming the response has a property 'exists' indicating whether the user exists
    } catch (error) {
      console.error(error);
      // Handle the error, you can either show a generic error message or handle it based on the specific error response.
      return false; // Assuming the user doesn't exist in case of an error
    }
  };

  return (
    <>
    
    <div className="register-page">
    <img src={RegisterImage} alt="Phone" height="600px" width="700px" />
    <div className={`container ${registrationType === 'organization' ? '' : 'taller-form'}`}>
      
      <form onSubmit={handleRegister}>
        <h2>Registration</h2>

        {/* Registration Type Dropdown */}
        <div className="input-box">
          <label htmlFor="registrationtype">Registration Type</label>
          <select
            name="registrationtype"
            value={registrationType}
            onChange={(e) => {
              console.log("Selected value:", e.target.value);
              setRegistrationType(e.target.value);
            }}
            required
          >
            
            <option value="organization">Organization</option>
            <option value="freelancer">Freelancer</option>
            <option value="customer">Customer</option>
          </select>
          
        </div>

        {/* Common Fields for Both Types */}
        <div className="content">
          {/* ... Common fields for both organization and freelancer */}

          {/* Organization Fields */}
          {registrationType === "organization" && (
            <>
             
                <div className="input-box company-name">
                  <label htmlFor="companyname">Company Name</label>
                  <input
                    type="text"
                    placeholder="Enter your Company name"
                    name="companyname"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    style={{ textTransform: "none" }}
                  />
                </div>
                <div className="side-by-side">
                
              
          {/* Pair 2: Company Establishment Date and Telephone Number */}
          <div className="input-box">
            <label htmlFor="companyestablishmentdate">Company Establishment Date</label>
            <input
              type="date"
              placeholder="Enter your Company Establishment Date"
              name="companyestablishmentdate"
              value={companyEstablishmentDate}
              onChange={(e) => setCompanyEstablishmentDate(e.target.value)} // Use onChange to set the date from the calendar
              required
              max="2025-12-31"
            />
          </div>
                {/* <div className="side-by-side"> */}
                <div className="input-box">
                  <label htmlFor="phonenumber">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="Enter Contact number"
                    name="phonenumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                </div>
               {/* Pair 3: Email, Company Address, Company Tax No, Fax No */}
               <div className="input-box">
                <label htmlFor="branchlocation">Branch Location</label>
                <input
                    type="text"
                    placeholder="Enter your branch location"
                    name="branchlocation"
                    value={branchLocation}
                    onChange={(e) => setBranchLocation(e.target.value)}
                    required
                    style={{ textTransform: "none" }}
                  />
                </div>
                
            <div className="input-box">
          <label htmlFor="email">Company Email Address</label>
          <input 
            type="email"
            placeholder="Enter valid Company email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
            style={{ textTransform: "none" }}
          />
          {emailMessage && <p className="error-message">{emailMessage}</p>}
        </div>
        

        
      
        <div className="input-box">
          <label htmlFor="companyaddress">Company Address</label>
          <input
            type="text"
            placeholder="Enter your Company Address"
            name="companyaddress"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            required
            style={{ textTransform: "none" }}
          />
        </div>
      
      <div>
      <div className="input-box">
          <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ textTransform: "none" }}
            />
      </div>
      <div className="input-box">
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ textTransform: "none" }}
        />
      </div>
      </div>

 
   
              {/* ... Continue with more pairs as needed */}
            </>
          )}

          {/* Freelancer Fields */}
          {registrationType === "freelancer" && (
            <>
              <div className="input-box company-name ">
                <label htmlFor="freelancername">Freelancer Name</label>
                <input
                  type="text"
                  placeholder="Enter freelancer name"
                  name="freelancername"
                  value={freelancerName}
                  onChange={(e) => setFreelancerName(e.target.value)}
                  required
                 
                />
              </div>
              <div className="side-by-side">
                  <div className="input-box">
                    <label htmlFor="freelancerdob">Date of Birth</label>
                    <input
                      type="date"
                      placeholder="Enter Date of Birth"
                      name="freelancerdob"
                      value={freelancerDOB}
                      onChange={(e) => setFreelancerDOB(e.target.value)}
                      required
          
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="freelancercontactnumber">Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      name="freelancercontactnumber"
                      value={freelancerContactNumber}
                      onChange={(e) => setFreelancerContactNumber(e.target.value)}
                      required
              
                    />
                  </div>
                </div>
                
                <div className="input-box">
                    <label htmlFor="freelanceremail">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your valid email"
                      name="freelanceremail"
                      value={freelancerEmail}
                      onChange={(e) => setFreelancerEmail(e.target.value.toLowerCase())}
                      required
                      style={{ textTransform: "none" }}
                    />
                 
                  {/* {emailMessage && <p className="error-message">{emailMessage}</p>} */}
        </div>

                  <div className="input-box">
                    <label htmlFor="freelancerpassword">Password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      name="freelancerpassword"
                      value={freelancerPassword}
                      onChange={(e) => setFreelancerPassword(e.target.value)}
                      required
                    />
                  </div>
                
                <div className="input-box">
                  <label htmlFor="freelancerconfirmpassword">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    name="freelancerconfirmpassword"
                    value={freelancerConfirmPassword}
                    onChange={(e) => setFreelancerConfirmPassword(e.target.value)}
                    required
                    style={{ textTransform: "none" }}
                  />
                </div>
              </>
            )}
            {registrationType === "customer" && (
                <>
                  <div className="input-box company-name">
                    <label htmlFor="customername">Customer Name</label>
                    <input
                      type="text"
                      placeholder="Enter customer name"
                      name="customername"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      style={{ textTransform: "none" }}
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="customeremail">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your valid email"
                      name="customeremail"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value.toLowerCase())}
                      required
                      style={{ textTransform: "none" }}
                    />
                  {/* {emailMessage && <p className="error-message">{emailMessage}</p>} */}
       
                  </div>
                  <div className="input-box">
                    <label htmlFor="customercontactnumber">Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      name="customercontactnumber"
                      value={customerContactNumber}
                      onChange={(e) => setCustomerContactNumber(e.target.value)}
                      required
                     
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="customerpassword">Password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      name="customerpassword"
                      value={customerPassword}
                      onChange={(e) => setCustomerPassword(e.target.value)}
                      required
                      style={{ textTransform: "none" }}
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="customerconfirmpassword">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      name="customerconfirmpassword"
                      value={customerConfirmPassword}
                      onChange={(e) => setCustomerConfirmPassword(e.target.value)}
                      required
                      style={{ textTransform: "none" }}
                    />
                  </div>
                </>
              )}
            </div>
          {/* <div className="button-container">
              <button type="submit">Register</button>
              <script> console.log("Register Button clicked");</script>
            </div> */}
            <div className="button-container">
  <button type="submit" onClick={() => console.log("Register Button clicked")}>
    Register
  </button>
</div>
            <p className="text-right">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    
    </>
  );
};

export default RegisterForm;

//////////////////////////////////////////////////////////////////////


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import "../styles/RegisterForm.css";
// import RegisterImage from "../assets/images/signup.png";
// import Footer from "./Footer";
// import NavBar from "./NavBar";

// const RegisterForm = () => {
//   const [registrationType, setRegistrationType] = useState("organization");
//   // const [registrationType, setRegistrationType] = useState("freelancer");
//   const [companyName, setCompanyName] = useState("");
//   const [companyEstablishmentDate, setCompanyEstablishmentDate] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [branchLocation, setBranchLocation] = useState("");
//   const [companyAddress, setCompanyAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [freelancerName, setFreelancerName] = useState("");
//   const [freelancerDOB, setFreelancerDOB] = useState("");
//   const [freelancerContactNumber, setFreelancerContactNumber] = useState("");
//   const [freelancerEmail, setFreelancerEmail] = useState("");
//   const [freelancerPassword, setFreelancerPassword] = useState("");
//   const [freelancerConfirmPassword, setFreelancerConfirmPassword] = useState("");

//   const [customerName, setCustomerName] = useState("");
//   const [customerEmail, setCustomerEmail] = useState("");
//   const [customerContactNumber, setCustomerContactNumber] = useState("");
//   const [customerPassword, setCustomerPassword ] = useState("");
//   const [customerConfirmPassword, setCustomerConfirmPassword] = useState("");


//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       let dataToSend = {
//         registrationType,
//       };
      
//       if (registrationType === 'organization') {
//         dataToSend = {
//           ...dataToSend,
//           companyName,
//           companyEstablishmentDate,
//           phoneNumber,
//           email,
//           companyAddress,
//           branchLocation, // Include branch location here
//           password,
//           confirmPassword,
//         };
//       } else if (registrationType === 'freelancer') {
//         dataToSend = {
//           ...dataToSend,
//           freelancerName,
//           freelancerDOB,
//           freelancerContactNumber,
//           freelancerEmail,
//           password: freelancerPassword,
//           confirmPassword: freelancerConfirmPassword,
//         };
//       }else if (registrationType === 'customer') {
//         // Customer-specific fields
//         dataToSend = {
//           ...dataToSend,
//           customerName,
//           customerEmail,
//           customerContactNumber,
//           password: customerPassword,
//           confirmPassword: customerConfirmPassword,
//         };
//       }
      
  
//       const response = await axios.post('http://localhost:5000/register', dataToSend);
//       alert(response.data.message);
//     } catch (error) {
//       console.error(error);
//       alert('Registration failed. Please try again.');
//     }
//   };
  
//   const checkUserExists = async (email,branchLocation) => {
//     try {
//       // Make an API request to check if the user with the given email already exists
//       const response = await axios.get(`http://localhost:5000/checkUserExists?email=${email}`);
//       return response.data.exists; // Assuming the response has a property 'exists' indicating whether the user exists
//     } catch (error) {
//       console.error(error);
//       // Handle the error, you can either show a generic error message or handle it based on the specific error response.
//       return false; // Assuming the user doesn't exist in case of an error
//     }
//   };

//   return (
//     <>
   
//     <div className="register-page">
//     <img src={RegisterImage} alt="Phone" height="600px" width="700px" />
//     <div className={`container ${registrationType === 'organization' ? '' : 'taller-form'}`}>
//        <form onSubmit={handleRegister}>
//         <h2>Registration</h2>

//         {/* Registration Type Dropdown */}
//         <div className="input-box">
//           <label htmlFor="registrationtype">Registration Type</label>
//           <select
//             name="registrationtype"
//             value={registrationType}
//             onChange={(e) => {
//               console.log("Selected value:", e.target.value);
//               setRegistrationType(e.target.value);
//             }}
//             required
//           >
            
//             <option value="organization">Organization</option>
//             <option value="freelancer">Freelancer</option>
//             <option value="customer">Customer</option>
//           </select>
          
//         </div>

//         {/* Common Fields for Both Types */}
//         <div className="content">
//           {/* ... Common fields for both organization and freelancer */}

//           {/* Organization Fields */}
//           {registrationType === "organization" && (
//             <>
             
//                 <div className="input-box company-name">
//                   <label htmlFor="companyname">Company Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter your Company name"
//                     name="companyname"
//                     value={companyName}
//                     onChange={(e) => setCompanyName(e.target.value)}
//                     required
//                     style={{ textTransform: "none" }}
//                   />
//                 </div>
//                 <div className="side-by-side">
                
              

//               {/* Pair 2: Company Establishment Date and Telephone Number */}
              
//                 <div className="input-box">
//                   <label htmlFor="companyestablishmentdate">Company Establishment Date</label>
//                   <input
//                     type="date"
//                     placeholder="Enter your Company Establishment Date"
//                     name="companyestablishmentdate"
//                     value={companyEstablishmentDate}
//                     onChange={(e) => setCompanyEstablishmentDate(e.target.value)}
//                     required
//                   />
//                 </div>
                

                
//                 {/* <div className="side-by-side"> */}
//                 <div className="input-box">
//                   <label htmlFor="phonenumber">Contact Number</label>
//                   <input
//                     type="tel"
//                     placeholder="Enter Contact number"
//                     name="phonenumber"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     required
//                     style={{ textTransform: "none" }}
//                   />
//                 </div>
//                 </div>
//                {/* Pair 3: Email, Company Address, Company Tax No, Fax No */}
//                <div className="input-box">
//                 <label htmlFor="branchlocation">Branch Location</label>
//                 <input
//                     type="text"
//                     placeholder="Enter your branch location"
//                     name="branchlocation"
//                     value={branchLocation}
//                     onChange={(e) => setBranchLocation(e.target.value)}
//                     required
//                     style={{ textTransform: "none" }}
//                   />
//                 </div>
                
//         <div className="input-box">
//           <label htmlFor="email">Company Email Address</label>
//           <input
//             type="email"
//             placeholder="Enter valid Company email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ textTransform: "none" }}
//           />
//         </div>
        
      
//         <div className="input-box">
//           <label htmlFor="companyaddress">Company Address</label>
//           <input
//             type="text"
//             placeholder="Enter your Company Address"
//             name="companyaddress"
//             value={companyAddress}
//             onChange={(e) => setCompanyAddress(e.target.value)}
//             required
//             style={{ textTransform: "none" }}
//           />
//         </div>
      
//       <div>
//       <div className="input-box">
//           <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ textTransform: "none" }}
//             />
//       </div>
//       <div className="input-box">
//         <label htmlFor="confirmpassword">Confirm Password</label>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           name="confirmpassword"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           style={{ textTransform: "none" }}
//         />
//       </div>
//       </div>

 
   
//               {/* ... Continue with more pairs as needed */}
//             </>
//           )}

//           {/* Freelancer Fields */}
//           {registrationType === "freelancer" && (
//             <>
//               <div className="input-box company-name ">
//                 <label htmlFor="freelancername">Freelancer Name</label>
//                 <input
//                   type="text"
//                   placeholder="Enter freelancer name"
//                   name="freelancername"
//                   value={freelancerName}
//                   onChange={(e) => setFreelancerName(e.target.value)}
//                   required
//                   style={{ textTransform: "none" }}
//                 />
//               </div>
//               <div className="side-by-side">
//                   <div className="input-box">
//                     <label htmlFor="freelancerdob">Date of Birth</label>
//                     <input
//                       type="date"
//                       placeholder="Enter Date of Birth"
//                       name="freelancerdob"
//                       value={freelancerDOB}
//                       onChange={(e) => setFreelancerDOB(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="input-box">
//                     <label htmlFor="freelancercontactnumber">Contact Number</label>
//                     <input
//                       type="tel"
//                       placeholder="Enter contact number"
//                       name="freelancercontactnumber"
//                       value={freelancerContactNumber}
//                       onChange={(e) => setFreelancerContactNumber(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
                
//                   <div className="input-box">
//                     <label htmlFor="freelanceremail">Email Address</label>
//                     <input
//                       type="email"
//                       placeholder="Enter your valid email"
//                       name="freelanceremail"
//                       value={freelancerEmail}
//                       onChange={(e) => setFreelancerEmail(e.target.value)}
//                       required
//                       style={{ textTransform: "none" }}
//                     />
//                   </div>
//                   <div className="input-box">
//                     <label htmlFor="freelancerpassword">Password</label>
//                     <input
//                       type="password"
//                       placeholder="Enter password"
//                       name="freelancerpassword"
//                       value={freelancerPassword}
//                       onChange={(e) => setFreelancerPassword(e.target.value)}
//                       required
//                       style={{ textTransform: "none" }}
//                     />
//                   </div>
                
//                 <div className="input-box">
//                   <label htmlFor="freelancerconfirmpassword">Confirm Password</label>
//                   <input
//                     type="password"
//                     placeholder="Confirm password"
//                     name="freelancerconfirmpassword"
//                     value={freelancerConfirmPassword}
//                     onChange={(e) => setFreelancerConfirmPassword(e.target.value)}
//                     required
//                     style={{ textTransform: "none" }}
//                   />
//                 </div>
//               </>
//             )}
//             {registrationType === "customer" && (
//                 <>
//                   <div className="input-box company-name">
//                     <label htmlFor="customername">Customer Name</label>
//                     <input
//                       type="text"
//                       placeholder="Enter customer name"
//                       name="customername"
//                       value={customerName}
//                       onChange={(e) => setCustomerName(e.target.value)}
//                       required
//                       style={{ textTransform: "none" }}
//                     />
//                   </div>
//                   <div className="input-box">
//                     <label htmlFor="customeremail">Email Address</label>
//                     <input
//                       type="email"
//                       placeholder="Enter your valid email"
//                       name="customeremail"
//                       value={customerEmail}
//                       onChange={(e) => setCustomerEmail(e.target.value)}
//                       required
//                       style={{ textTransform: "none" }}
//                     />
//                   </div>
//                   <div className="input-box">
//                     <label htmlFor="customercontactnumber">Contact Number</label>
//                     <input
//                       type="tel"
//                       placeholder="Enter contact number"
//                       name="customercontactnumber"
//                       value={customerContactNumber}
//                       onChange={(e) => setCustomerContactNumber(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="input-box">
//                     <label htmlFor="customerpassword">Password</label>
//                     <input
//                       type="password"
//                       placeholder="Enter password"
//                       name="customerpassword"
//                       value={customerPassword}
//                       onChange={(e) => setCustomerPassword(e.target.value)}
//                       required
//                       style={{ textTransform: "none" }}
//                     />
//                   </div>
//                   <div className="input-box">
//                     <label htmlFor="customerconfirmpassword">Confirm Password</label>
//                     <input
//                       type="password"
//                       placeholder="Confirm password"
//                       name="customerconfirmpassword"
//                       value={customerConfirmPassword}
//                       onChange={(e) => setCustomerConfirmPassword(e.target.value)}
//                       required
//                       style={{ textTransform: "none" }}
//                     />
//                   </div>
//                 </>
//               )}
//             </div>

          

//           <div className="button-container">
//               <button type="submit">Register</button>
//             </div>
//             <p className="text-right">
//               Already have an account? <Link to="/login">Login</Link>
//             </p>
//           </form>
//         </div>
//       </div>
     
//     </>
//   );
// };

// export default RegisterForm;




