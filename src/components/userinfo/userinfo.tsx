import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UserInfoFormProps {
  userId: string;
}

interface FormData {
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  bloodType: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  streetAddress: string;
  streetAddressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  weight: string;
  donatedPreviously: boolean;
  lastDonation: string;
  diseases: string;
}

const bloodGroups = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

const genders = ['Male', 'Female', 'Other'];

const UserInfoForm: React.FC<UserInfoFormProps> = ({ userId }) => {
  const initialFormState: FormData = {
    userId: userId || '',
    firstName: '',
    middleName: '',
    lastName: '',
    bloodType: '',
    birthDate: '',
    gender: '',
    phoneNumber: '',
    streetAddress: '',
    streetAddressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    weight: '',
    donatedPreviously: false,
    lastDonation: '',
    diseases: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Fetch user info for edit mode
  useEffect(() => {
    if (userId) {
      setIsEditMode(true);
      axios
        .post('/api/getUserInfoByUserId', { userId })
        .then((response) => {
          setFormData(response.data.data);
        })
        .catch(() => {
          toast.error('Failed to load user data');
        });
    }
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = isEditMode ? '/api/updateUserInfo' : '/api/addUserInfo';

    axios
      .post(apiUrl, formData)
      .then(() => {
        toast.success(isEditMode ? 'User info updated successfully' : 'User info added successfully');
      })
      .catch(() => {
        toast.error('An error occurred. Please try again.');
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {isEditMode ? 'Update Information' : 'Add Information'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          handleChange={handleChange}
          required
        />

        {/* Middle Name */}
        <InputField
          label="Middle Name"
          name="middleName"
          value={formData.middleName}
          handleChange={handleChange}
        />

        {/* Last Name */}
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          handleChange={handleChange}
          required
        />

        {/* Blood Group Dropdown */}
        <DropdownField
          label="Blood Group"
          name="bloodType"
          value={formData.bloodType}
          options={bloodGroups}
          handleChange={handleChange}
          required
        />

        {/* Birth Date */}
        <InputField
          label="Birth Date"
          name="birthDate"
          value={formData.birthDate}
          handleChange={handleChange}
          type="date"
          required
        />

        {/* Gender Dropdown */}
        <DropdownField
          label="Gender"
          name="gender"
          value={formData.gender}
          options={genders}
          handleChange={handleChange}
          required
        />

        {/* Phone Number */}
        <InputField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          handleChange={handleChange}
          required
        />

        {/* Street Address */}
        <InputField
          label="Street Address"
          name="streetAddress"
          value={formData.streetAddress}
          handleChange={handleChange}
          required
        />

        {/* Street Address Line 2 */}
        <InputField
          label="Street Address Line 2"
          name="streetAddressLine2"
          value={formData.streetAddressLine2}
          handleChange={handleChange}
        />

        {/* City */}
        <InputField
          label="City"
          name="city"
          value={formData.city}
          handleChange={handleChange}
          required
        />

        {/* State */}
        <InputField
          label="State"
          name="state"
          value={formData.state}
          handleChange={handleChange}
          required
        />

        {/* Postal Code */}
        <InputField
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          handleChange={handleChange}
          required
        />

        {/* Weight */}
        <InputField
          label="Weight"
          name="weight"
          value={formData.weight}
          handleChange={handleChange}
          type="number"
          required
        />
      </div>

      {/* Donated Previously */}
      <div className="mb-6 mt-4">
        <label className="block text-gray-700">Donated Previously:</label>
        <input
          type="checkbox"
          name="donatedPreviously"
          checked={formData.donatedPreviously}
          onChange={handleChange}
          className="mt-1 h-5 w-5"
        />
      </div>

      {/* Last Donation */}
      <InputField
        label="Last Donation"
        name="lastDonation"
        value={formData.lastDonation}
        handleChange={handleChange}
        type="date"
      />

      {/* Diseases */}
      <div className="mb-6">
        <label className="block text-gray-700">Diseases:</label>
        <textarea
          name="diseases"
          value={formData.diseases}
          onChange={handleChange}
          className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:opacity-90 transition duration-300"
      >
        {isEditMode ? 'Update Info' : 'Add Info'}
      </button>
    </form>
  );
};

// Reusable InputField Component for Form
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}> = ({ label, name, value, handleChange, type = 'text', required = false }) => (
  <div className="mb-6">
    <label className="block text-gray-700 mb-2">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      required={required}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  </div>
);

// Reusable DropdownField Component for Select Options
const DropdownField: React.FC<{
  label: string;
  name: string;
  value: string;
  options: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}> = ({ label, name, value, options, handleChange, required = false }) => (
  <div className="mb-6">
    <label className="block text-gray-700 mb-2">{label}:</label>
    <select
      name={name}
      value={value}
      onChange={handleChange}
      required={required}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default UserInfoForm;
