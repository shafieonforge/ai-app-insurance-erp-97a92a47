'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Save,
  X,
  Plus,
  Upload
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ContactInfo {
  id: string;
  type: 'email' | 'phone' | 'mobile' | 'fax';
  value: string;
  isPrimary: boolean;
}

interface AddressInfo {
  id: string;
  type: 'home' | 'business' | 'mailing' | 'billing';
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isPrimary: boolean;
}

export default function AddCustomerPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [customerType, setCustomerType] = useState<'individual' | 'corporate'>('individual');
  
  // Individual Customer Form
  const [individualData, setIndividualData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    ssn: '',
    maritalStatus: ''
  });

  // Corporate Customer Form
  const [corporateData, setCorporateData] = useState({
    companyName: '',
    businessType: '',
    industry: '',
    registrationNumber: '',
    taxId: '',
    employeeCount: '',
    foundedDate: ''
  });

  // Contacts
  const [contacts, setContacts] = useState<ContactInfo[]>([
    { id: '1', type: 'email', value: '', isPrimary: true },
    { id: '2', type: 'phone', value: '', isPrimary: false }
  ]);

  // Addresses
  const [addresses, setAddresses] = useState<AddressInfo[]>([
    {
      id: '1',
      type: 'home',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: 'USA',
      postalCode: '',
      isPrimary: true
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('Customer created successfully!');
    router.push('/customers');
  };

  const addContact = () => {
    const newContact: ContactInfo = {
      id: Date.now().toString(),
      type: 'phone',
      value: '',
      isPrimary: false
    };
    setContacts([...contacts, newContact]);
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const updateContact = (id: string, field: keyof ContactInfo, value: any) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addAddress = () => {
    const newAddress: AddressInfo = {
      id: Date.now().toString(),
      type: 'business',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: 'USA',
      postalCode: '',
      isPrimary: false
    };
    setAddresses([...addresses, newAddress]);
  };

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const updateAddress = (id: string, field: keyof AddressInfo, value: any) => {
    setAddresses(addresses.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const steps = [
    { number: 1, title: 'Customer Type', description: 'Choose individual or corporate' },
    { number: 2, title: 'Basic Information', description: 'Enter customer details' },
    { number: 3, title: 'Contact Information', description: 'Add contact details' },
    { number: 4, title: 'Address Information', description: 'Add addresses' },
    { number: 5, title: 'Review & Submit', description: 'Review and create customer' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Select Customer Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                  customerType === 'individual'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setCustomerType('individual')}
              >
                <User className="h-8 w-8 mb-4 text-blue-600" />
                <h4 className="text-lg font-semibold mb-2">Individual Customer</h4>
                <p className="text-sm text-gray-600">
                  Personal insurance for individuals and families
                </p>
              </button>

              <button
                type="button"
                className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                  customerType === 'corporate'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setCustomerType('corporate')}
              >
                <Building2 className="h-8 w-8 mb-4 text-purple-600" />
                <h4 className="text-lg font-semibold mb-2">Corporate Customer</h4>
                <p className="text-sm text-gray-600">
                  Business insurance for companies and organizations
                </p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {customerType === 'individual' ? 'Personal Information' : 'Company Information'}
            </h3>

            {customerType === 'individual' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field w-full"
                    value={individualData.firstName}
                    onChange={(e) => setIndividualData({...individualData, firstName: e.target.value})}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field w-full"
                    value={individualData.lastName}
                    onChange={(e) => setIndividualData({...individualData, lastName: e.target.value})}
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="input-field w-full"
                    value={individualData.dateOfBirth}
                    onChange={(e) => setIndividualData({...individualData, dateOfBirth: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    className="input-field w-full"
                    value={individualData.gender}
                    onChange={(e) => setIndividualData({...individualData, gender: e.target.value})}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="input-field w-full"
                    value={individualData.occupation}
                    onChange={(e) => setIndividualData({...individualData, occupation: e.target.value})}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SSN (Optional)
                  </label>
                  <input
                    type="text"
                    className="input-field w-full"
                    value={individualData.ssn}
                    onChange={(e) => setIndividualData({...individualData, ssn: e.target.value})}
                    placeholder="XXX-XX-XXXX"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field w-full"
                    value={corporateData.companyName}
                    onChange={(e) => setCorporateData({...corporateData, companyName: e.target.value})}
                    placeholder="TechCorp Solutions Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select
                    className="input-field w-full"
                    value={corporateData.businessType}
                    onChange={(e) => setCorporateData({...corporateData, businessType: e.target.value})}
                  >
                    <option value="">Select Business Type</option>
                    <option value="LLC">LLC</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    className="input-field w-full"
                    value={corporateData.industry}
                    onChange={(e) => setCorporateData({...corporateData, industry: e.target.value})}
                  >
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Construction">Construction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    className="input-field w-full"
                    value={corporateData.registrationNumber}
                    onChange={(e) => setCorporateData({...corporateData, registrationNumber: e.target.value})}
                    placeholder="TC123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax ID / EIN
                  </label>
                  <input
                    type="text"
                    className="input-field w-full"
                    value={corporateData.taxId}
                    onChange={(e) => setCorporateData({...corporateData, taxId: e.target.value})}
                    placeholder="XX-XXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <select
                    className="input-field w-full"
                    value={corporateData.employeeCount}
                    onChange={(e) => setCorporateData({...corporateData, employeeCount: e.target.value})}
                  >
                    <option value="">Select Range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              <button
                type="button"
                onClick={addContact}
                className="btn-secondary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </button>
            </div>

            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={contact.id} className="card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Contact {index + 1}</h4>
                    {contacts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeContact(contact.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        className="input-field w-full"
                        value={contact.type}
                        onChange={(e) => updateContact(contact.id, 'type', e.target.value)}
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="mobile">Mobile</option>
                        <option value="fax">Fax</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value
                      </label>
                      <input
                        type={contact.type === 'email' ? 'email' : 'text'}
                        className="input-field w-full"
                        value={contact.value}
                        onChange={(e) => updateContact(contact.id, 'value', e.target.value)}
                        placeholder={
                          contact.type === 'email' 
                            ? 'john.doe@example.com'
                            : '+1 (555) 123-4567'
                        }
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={contact.isPrimary}
                          onChange={(e) => updateContact(contact.id, 'isPrimary', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Primary</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
              <button
                type="button"
                onClick={addAddress}
                className="btn-secondary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </button>
            </div>

            <div className="space-y-4">
              {addresses.map((address, index) => (
                <div key={address.id} className="card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Address {index + 1}</h4>
                    {addresses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAddress(address.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        className="input-field w-full"
                        value={address.type}
                        onChange={(e) => updateAddress(address.id, 'type', e.target.value)}
                      >
                        <option value="home">Home</option>
                        <option value="business">Business</option>
                        <option value="mailing">Mailing</option>
                        <option value="billing">Billing</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={address.isPrimary}
                          onChange={(e) => updateAddress(address.id, 'isPrimary', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Primary Address</span>
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        className="input-field w-full"
                        value={address.addressLine1}
                        onChange={(e) => updateAddress(address.id, 'addressLine1', e.target.value)}
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        className="input-field w-full"
                        value={address.addressLine2}
                        onChange={(e) => updateAddress(address.id, 'addressLine2', e.target.value)}
                        placeholder="Apt 4B, Suite 200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="input-field w-full"
                        value={address.city}
                        onChange={(e) => updateAddress(address.id, 'city', e.target.value)}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        className="input-field w-full"
                        value={address.state}
                        onChange={(e) => updateAddress(address.id, 'state', e.target.value)}
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        className="input-field w-full"
                        value={address.country}
                        onChange={(e) => updateAddress(address.id, 'country', e.target.value)}
                      >
                        <option value="USA">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="input-field w-full"
                        value={address.postalCode}
                        onChange={(e) => updateAddress(address.id, 'postalCode', e.target.value)}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Review Customer Information</h3>
            
            <div className="card p-6 bg-green-50 border-green-200">
              <h4 className="font-semibold text-gray-900 mb-4">Customer Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Basic Information</h5>
                  {customerType === 'individual' ? (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Name:</strong> {individualData.firstName} {individualData.lastName}</p>
                      <p><strong>Date of Birth:</strong> {individualData.dateOfBirth || 'Not specified'}</p>
                      <p><strong>Gender:</strong> {individualData.gender || 'Not specified'}</p>
                      <p><strong>Occupation:</strong> {individualData.occupation || 'Not specified'}</p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Company:</strong> {corporateData.companyName}</p>
                      <p><strong>Business Type:</strong> {corporateData.businessType || 'Not specified'}</p>
                      <p><strong>Industry:</strong> {corporateData.industry || 'Not specified'}</p>
                      <p><strong>Employees:</strong> {corporateData.employeeCount || 'Not specified'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    {contacts.filter(c => c.value).map((contact, idx) => (
                      <p key={idx}>
                        <strong>{contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}:</strong> {contact.value}
                        {contact.isPrimary && <span className="text-blue-600"> (Primary)</span>}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-medium text-gray-900 mb-2">Addresses</h5>
                {addresses.filter(a => a.addressLine1).map((address, idx) => (
                  <div key={idx} className="text-sm text-gray-600 mb-2">
                    <p>
                      <strong>{address.type.charAt(0).toUpperCase() + address.type.slice(1)}:</strong> 
                      {address.isPrimary && <span className="text-blue-600"> (Primary)</span>}
                    </p>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} {address.postalCode}</p>
                    <p>{address.country}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return customerType !== '';
      case 2:
        return customerType === 'individual' 
          ? individualData.firstName && individualData.lastName
          : corporateData.companyName;
      case 3:
        return contacts.some(c => c.value);
      case 4:
        return addresses.some(a => a.addressLine1 && a.city);
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push('/customers')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Customer</h1>
            <p className="text-gray-600 mt-1">Create a new customer profile</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="card p-6 mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`btn-secondary ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => router.push('/customers')}
                className="btn-secondary"
              >
                Cancel
              </button>

              {currentStep === 5 ? (
                <button
                  type="submit"
                  disabled={isSubmitting || !canProceed()}
                  className={`btn-primary ${
                    isSubmitting || !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Customer...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Customer
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  disabled={!canProceed()}
                  className={`btn-primary ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}