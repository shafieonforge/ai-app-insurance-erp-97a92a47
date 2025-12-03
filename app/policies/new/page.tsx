'use client';

import { useState } from 'react';
import { 
  Shield, 
  User, 
  DollarSign, 
  Calendar, 
  FileText, 
  ArrowLeft,
  Save,
  Send
} from 'lucide-react';
import DashboardLayout from '../../dashboard/layout';

interface PolicyForm {
  customerType: 'individual' | 'corporate';
  customerId: string;
  customerName: string;
  productType: 'Auto' | 'Home' | 'Life' | 'Health' | 'Commercial' | 'Marine';
  planName: string;
  sumInsured: number;
  premium: number;
  deductible: number;
  startDate: string;
  endDate: string;
  paymentFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
  agent: string;
  notes: string;
}

export default function NewPolicyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PolicyForm>({
    customerType: 'individual',
    customerId: '',
    customerName: '',
    productType: 'Auto',
    planName: '',
    sumInsured: 0,
    premium: 0,
    deductible: 0,
    startDate: '',
    endDate: '',
    paymentFrequency: 'Annual',
    agent: '',
    notes: ''
  });

  const productPlans = {
    Auto: ['Basic Coverage', 'Comprehensive', 'Premium Plus'],
    Home: ['Basic Home', 'Standard Home', 'Premium Home'],
    Life: ['Term Life', 'Whole Life', 'Universal Life'],
    Health: ['Basic Health', 'Premium Health', 'Family Plan'],
    Commercial: ['General Liability', 'Property Insurance', 'Workers Comp'],
    Marine: ['Cargo Insurance', 'Hull Insurance', 'Marine Liability']
  };

  const agents = [
    'Mike Thompson',
    'Lisa Rodriguez', 
    'David Wilson',
    'Jennifer Lee',
    'Amanda Garcia',
    'Carlos Martinez',
    'Steve Johnson',
    'Rachel Kim'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEndDate = (startDate: string) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const end = new Date(start);
    end.setFullYear(start.getFullYear() + 1);
    return end.toISOString().split('T')[0];
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDate = e.target.value;
    setFormData(prev => ({
      ...prev,
      startDate,
      endDate: calculateEndDate(startDate)
    }));
  };

  const calculatePremium = () => {
    // Basic premium calculation logic
    let basePremium = 0;
    const sumInsured = formData.sumInsured;
    
    switch (formData.productType) {
      case 'Auto':
        basePremium = sumInsured * 0.05;
        break;
      case 'Home':
        basePremium = sumInsured * 0.008;
        break;
      case 'Life':
        basePremium = sumInsured * 0.002;
        break;
      case 'Health':
        basePremium = sumInsured * 0.15;
        break;
      case 'Commercial':
        basePremium = sumInsured * 0.012;
        break;
      case 'Marine':
        basePremium = sumInsured * 0.025;
        break;
    }
    
    setFormData(prev => ({
      ...prev,
      premium: Math.round(basePremium)
    }));
  };

  const steps = [
    { number: 1, title: 'Customer Selection', description: 'Choose customer and product type' },
    { number: 2, title: 'Coverage Details', description: 'Configure coverage and premium' },
    { number: 3, title: 'Policy Terms', description: 'Set dates and payment terms' },
    { number: 4, title: 'Review & Submit', description: 'Review and create policy' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-4 border rounded-lg text-left ${
                    formData.customerType === 'individual'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, customerType: 'individual' }))}
                >
                  <User className="h-6 w-6 mb-2" />
                  <div className="font-medium">Individual</div>
                  <div className="text-sm text-gray-500">Personal insurance policy</div>
                </button>
                <button
                  type="button"
                  className={`p-4 border rounded-lg text-left ${
                    formData.customerType === 'corporate'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, customerType: 'corporate' }))}
                >
                  <Shield className="h-6 w-6 mb-2" />
                  <div className="font-medium">Corporate</div>
                  <div className="text-sm text-gray-500">Business insurance policy</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="input-field w-full"
                placeholder="Enter or search customer name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
              </label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="Auto">Auto Insurance</option>
                <option value="Home">Home Insurance</option>
                <option value="Life">Life Insurance</option>
                <option value="Health">Health Insurance</option>
                <option value="Commercial">Commercial Insurance</option>
                <option value="Marine">Marine Insurance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan
              </label>
              <select
                name="planName"
                value={formData.planName}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Select a plan</option>
                {productPlans[formData.productType].map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sum Insured
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="sumInsured"
                  value={formData.sumInsured}
                  onChange={handleInputChange}
                  onBlur={calculatePremium}
                  className="input-field pl-10 w-full"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deductible
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="deductible"
                  value={formData.deductible}
                  onChange={handleInputChange}
                  className="input-field pl-10 w-full"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Premium
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="premium"
                  value={formData.premium}
                  onChange={handleInputChange}
                  className="input-field pl-10 w-full"
                  placeholder="0"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Calculated based on sum insured and product type
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Coverage Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Sum Insured:</span>
                  <span className="font-medium ml-2">${formData.sumInsured.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-blue-700">Deductible:</span>
                  <span className="font-medium ml-2">${formData.deductible.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-blue-700">Annual Premium:</span>
                  <span className="font-medium ml-2">${formData.premium.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-blue-700">Premium Rate:</span>
                  <span className="font-medium ml-2">
                    {formData.sumInsured ? ((formData.premium / formData.sumInsured) * 100).toFixed(2) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleStartDateChange}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="input-field w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Frequency
              </label>
              <select
                name="paymentFrequency"
                value={formData.paymentFrequency}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="Annual">Annual</option>
                <option value="Semi-Annual">Semi-Annual</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Agent
              </label>
              <select
                name="agent"
                value={formData.agent}
                onChange={handleInputChange}
                className="input-field w-full"
              >
                <option value="">Select an agent</option>
                {agents.map(agent => (
                  <option key={agent} value={agent}>{agent}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="input-field w-full"
                placeholder="Additional notes or special conditions"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-green-900 mb-4">Policy Review</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Customer Information</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Name:</strong> {formData.customerName}<br />
                      <strong>Type:</strong> {formData.customerType === 'individual' ? 'Individual' : 'Corporate'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Product Details</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Product:</strong> {formData.productType} Insurance<br />
                      <strong>Plan:</strong> {formData.planName}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Agent</h4>
                    <p className="text-sm text-gray-600 mt-1">{formData.agent}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Coverage Details</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Sum Insured:</strong> ${formData.sumInsured.toLocaleString()}<br />
                      <strong>Deductible:</strong> ${formData.deductible.toLocaleString()}<br />
                      <strong>Annual Premium:</strong> ${formData.premium.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Policy Period</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Start:</strong> {new Date(formData.startDate).toLocaleDateString()}<br />
                      <strong>End:</strong> {new Date(formData.endDate).toLocaleDateString()}<br />
                      <strong>Payment:</strong> {formData.paymentFrequency}
                    </p>
                  </div>
                </div>
              </div>
              
              {formData.notes && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900">Notes</h4>
                  <p className="text-sm text-gray-600 mt-1">{formData.notes}</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.customerName && formData.productType && formData.planName;
      case 2:
        return formData.sumInsured > 0 && formData.premium > 0;
      case 3:
        return formData.startDate && formData.endDate && formData.agent;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle policy submission
    console.log('Policy submitted:', formData);
    alert('Policy created successfully!');
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Policy</h1>
            <p className="text-gray-600 mt-1">Create a new insurance policy</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="card p-6">
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
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="card p-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`btn-secondary ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-3">
            {currentStep === 4 ? (
              <>
                <button className="btn-secondary">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Create Policy
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepComplete(currentStep)}
                className={`btn-primary ${
                  !isStepComplete(currentStep) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}