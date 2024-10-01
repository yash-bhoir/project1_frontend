import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface BloodRequestFormProps {
  userId: string;
}

interface BloodRequestData {
  userId: string;
  bloodTypeId: string;
  quantity: string;
  request_date: string;
  required_by: string;
  status: string;
  delivery_address: string;
  contact_number: string;
  reason_for_request: string;
  hospital_name: string;
  urgent: boolean;
}

const bloodGroups = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

const statuses = ['Pending', 'Approved', 'Rejected', 'Fulfilled'];

const BloodRequestForm: React.FC<BloodRequestFormProps> = ({ userId }) => {
  const initialFormState: BloodRequestData = {
    userId: userId || '',
    bloodTypeId: '',
    quantity: '',
    request_date: '',
    required_by: '',
    status: '',
    delivery_address: '',
    contact_number: '',
    reason_for_request: '',
    hospital_name: '',
    urgent: false,
  };

  const [formData, setFormData] = useState<BloodRequestData>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('/api/userRequest', formData)
      .then(() => {
        toast.success('Blood request submitted successfully');
      })
      .catch(() => {
        toast.error('An error occurred while submitting the blood request.');
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-10 bg-gray-100 shadow-xl rounded-lg"
    >
      <h2 className="text-4xl font-bold text-center mb-6 text-indigo-600">
        Blood Request Form
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Blood Group Dropdown */}
        <div>
          <label className="block text-gray-700 mb-2">Blood Group</label>
          <select
            name="bloodTypeId"
            value={formData.bloodTypeId}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Request Date */}
        <div>
          <label className="block text-gray-700 mb-2">Request Date</label>
          <input
            type="date"
            name="request_date"
            value={formData.request_date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Required By */}
        <div>
          <label className="block text-gray-700 mb-2">Required By</label>
          <input
            type="date"
            name="required_by"
            value={formData.required_by}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>Select Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-gray-700 mb-2">Delivery Address</label>
          <input
            type="text"
            name="delivery_address"
            value={formData.delivery_address}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-gray-700 mb-2">Contact Number</label>
          <input
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Hospital Name */}
        <div>
          <label className="block text-gray-700 mb-2">Hospital Name</label>
          <input
            type="text"
            name="hospital_name"
            value={formData.hospital_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      {/* Reason for Request */}
      <div className="mt-6">
        <label className="block text-gray-700 mb-2">Reason for Request</label>
        <textarea
          name="reason_for_request"
          value={formData.reason_for_request}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Urgent Checkbox */}
      <div className="mt-6 flex items-center">
        <input
          type="checkbox"
          name="urgent"
          checked={formData.urgent}
          onChange={handleChange}
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
        />
        <label className="ml-3 block text-gray-700">Urgent</label>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition duration-200"
      >
        Submit Blood Request
      </button>
    </form>
  );
};

export default BloodRequestForm;
