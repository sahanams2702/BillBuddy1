import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/UserRegistration.css";

const UserRegistration = () => {
  const [organizationDetails, setOrganizationDetails] = useState(null);
  const [freelancerDetails, setFreelancerDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [branchLocations, setBranchLocations] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [displayOrganizationDetails, setDisplayOrganizationDetails] = useState(false);
  const [submitDetails, setSubmitDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  

  const totalPages = Math.ceil((submitDetails?.length || 0) / itemsPerPage);

  
  useEffect(() => {
    // Fetch details based on the selectedType
    if (selectedType === 'freelancer') {
      fetchFreelancerDetails();
    } else if (selectedType === 'customer') {
      fetchCustomerDetails();
    } else if (selectedType === 'organization') {
      // Fetch company names for organization type
      fetchCompanyNames();    
    }
  }, [selectedType]);
  

  const fetchCompanyNames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-company-names');
      console.log('Response from server:', response.data);

      const uniqueCompanyNames = [...new Set(response.data.companyNames || [])];
      console.log('Unique Company Names:', uniqueCompanyNames);

      setCompanyNames(uniqueCompanyNames);
      setDisplayOrganizationDetails(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedCompany('');
    setCompanyLocation('');
    setBranchLocations([]);
    setSubmitDetails(null);

    if (e.target.value === 'organization') {
      fetchCompanyNames();
    }
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
    setCompanyLocation('');
    setSubmitDetails(null);
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/get-details-by-company', {
        company: selectedCompany,
        type: selectedType,
        branch: selectedBranch,
      });

      console.log('Response:', response.data);
      setSubmitDetails(response.data.details || null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCompany) {
      fetchBranchLocations();
    }
  }, [selectedCompany]);

  const fetchBranchLocations = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-branch-locations?company=${selectedCompany}`);
      setBranchLocations(response.data.branchLocations || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFreelancerDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-freelancer-details');
      setFreelancerDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-customer-details');
      setCustomerDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderTable = (details) => {
    if (!details || details.length === 0) {
      return null;
    }
    const columnOrder = ['company_name', 'company_establishment_date', 'phone_number', 'email', 'company_address', 'branch_location'];
    // Calculate paginated details
    const paginatedDetails = details.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    return (
      <div>
        <table>
          <thead>
            <tr>
              {columnOrder.map((key) => (
                <th key={key}>{key.replace(/_/g, ' ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedDetails.map((entry, index) => (
              <tr key={index}>
                {columnOrder.map((key) => (
                  <td key={key}>{entry[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Pagination */}
        {details.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
  

  return (
    <div className="details">
      <h2>User Registration Details</h2>

      <div className="filters">
        <label htmlFor="organizationType">Type of Organization:</label>
        <select id="organizationType" value={selectedType} onChange={handleTypeChange}>
          <option value="">Select Type</option>
          <option value="organization">Organization</option>
          <option value="freelancer">Freelancer</option>
          <option value="customer">Customer</option> 
        </select>

        {selectedType === 'organization' && displayOrganizationDetails && (
          <>
            {Array.isArray(companyNames) && (
              <>
                <select id="companyName" onChange={handleCompanyChange}>
                  <option value="">Select Company</option>
                  {companyNames.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>

                {selectedCompany && (
                  <>
                    <select id="branchLocation" onChange={handleBranchChange}>
                      <option value="">Select Branch Location</option>
                      {branchLocations.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>

                    <button onClick={handleSubmit}>Submit</button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

      {renderTable(organizationDetails)}
      {selectedType === 'freelancer' && freelancerDetails && (
        <div>
          <h3>Freelancer Details</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(freelancerDetails).map((key) => (
                  <th key={key}>{key.replace(/_/g, ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(freelancerDetails).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    {/* </div> */}
      {/* {renderTable(freelancerDetails)} */}
      {selectedType === 'customer' && customerDetails && (
        <div>
          <h3>Customer Details</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(customerDetails).map((key) => (
                  <th key={key}>{key.replace(/_/g, ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(customerDetails).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {renderTable(submitDetails)}
      {/* {renderTable(paginatedDetails)} */}
    </div>
  );
};

export default UserRegistration;