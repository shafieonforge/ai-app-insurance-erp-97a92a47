'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  User, 
  Building2, 
  Car,
  Home,
  Heart,
  Ship,
  Plus,
  Save,
  CheckCircle,
  Calendar,
  DollarSign
} from 'lucide-react';

const productTypes = [
  {
    id: 'auto',
    name: 'Auto Insurance',
    description: 'Vehicle coverage for cars, trucks, and motorcycles',
    icon: Car,
    color: 'blue'
  },
  {
    id: 'home',
    name: 'Home Insurance',
    description: 'Property coverage for homes and personal belongings',
    icon: Home,
    color: 'green'
  },
  {
    id: 'life',
    name: 'Life Insurance',
    description: 'Life coverage and financial protection',
    icon: Heart,
    color: 'red'
  },
  {
    id: 'health',
    name: 'Health Insurance',
    description: 'Medical coverage and healthcare benefits',
    icon: Plus,
    color: 'pink'
  },
  {
    id: 'commercial',
    name: 'Commercial Insurance',
    description: 'Business coverage for commercial enterprises',
    icon: Building2,
    color: 'indigo'
  },
  {
    id: 'marine',
    name: 'Marine Insurance',
    description: 'Coverage for maritime and shipping risks',
    icon: Ship,
    color: 'teal'
  }
];

const mockCustomers = [
  { id: 'CUST-001', name: 'Sarah Johnson', type: 'Individual' },
  { id: 'CUST-002', name: 'TechCorp Solutions Inc.', type: 'Corporate' },
  { id: 'CUST-003', name: 'Michael Chen', type: 'Individual' },
  { id: 'CUST-004', name: 'Global Manufacturing Ltd.', type: 'Corporate' },
  { id: 'CUST-005', name: 'Emily Rodriguez', type: 'Individual' }
];

export default function NewPolicyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [policyDetails, setPolicyDetails] = useState({
    policyNumber: `POL-${Date.now()}`,
    effectiveDate: '',
    expirationDate: '',
    premium: 0,
    sumInsured: 0,
    paymentFrequency: 'annual',
    agent: 'John Smith'
  });
  const [coverageDetails, setCoverageDetails] = useState({
    deductible: 0,
    limits: {
      liability: 0,
      comprehensive: 0,
      collision: 0
    },
    additionalCoverages: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: 'Product Selection', description: 'Choose insurance product' },
    { number: 2, title: 'Customer Selection', description: 'Select or create customer' },
    { number: 3, title: 'Policy Details', description: 'Configure policy terms' },
    { number: 4, title: 'Coverage Configuration', description: 'Set coverage options' },
    { number: 5, title: 'Review & Submit', description: 'Review and create policy' }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Policy created successfully!');
    setIsSubmitting(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedProduct !== '';
      case 2: return selectedCustomer !== '';
      case 3: return policyDetails.effectiveDate && policyDetails.expirationDate && policyDetails.premium > 0;
      case 4: return policyDetails.sumInsured > 0;
      case 5: return true;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Select Insurance Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productTypes.map((product) => {
                const IconComponent = product.icon;
                return (
                  <button
                    key={product.id}
                    type="button"
                    className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                      selectedProduct === product.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedProduct(product.id)}
                  >
                    <IconComponent className={`h-8 w-8 mb-4 text-${product.color}-600`} />
                    <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Select Customer</h3>
              <button className="btn-secondary text-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Customer
              </button>
            </div>
            
            <div className="space-y-3">
              {mockCustomers.map((customer) => (
                <button
                  key={customer.id}
                  type="button"
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                    selectedCustomer === customer.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedCustomer(customer.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      {customer.type === 'Corporate' ? (
                        <Building2 className="h-5 w-5 text-white" />
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.id} • {customer.type}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Policy Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Number
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={policyDetails.policyNumber}
                  onChange={(e) => setPolicyDetails({...policyDetails, policyNumber: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  value={policyDetails.agent}
                  onChange={(e) => setPolicyDetails({...policyDetails, agent: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effective Date *
                </label>
                <input
                  type="date"
                  className="input-field w-full"
                  value={policyDetails.effectiveDate}
                  onChange={(e) => setPolicyDetails({...policyDetails, effectiveDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Date *
                </label>
                <input
                  type="date"
                  className="input-field w-full"
                  value={policyDetails.expirationDate}
                  onChange={(e) => setPolicyDetails({...policyDetails, expirationDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Premium *
                </label>
                <input
                  type="number"
                  className="input-field w-full"
                  value={policyDetails.premium}
                  onChange={(e) => setPolicyDetails({...policyDetails, premium: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Frequency
                </label>
                <select
                  className="input-field w-full"
                  value={policyDetails.paymentFrequency}
                  onChange={(e) => setPolicyDetails({...policyDetails, paymentFrequency: e.target.value})}
                >
                  <option value="annual">Annual</option>
                  <option value="semi-annual">Semi-Annual</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Coverage Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sum Insured *
                </label>
                <input
                  type="number"
                  className="input-field w-full"
                  value={policyDetails.sumInsured}
                  onChange={(e) => setPolicyDetails({...policyDetails, sumInsured: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deductible
                </label>
                <input
                  type="number"
                  className="input-field w-full"
                  value={coverageDetails.deductible}
                  onChange={(e) => setCoverageDetails({...coverageDetails, deductible: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Coverage Limits</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Liability Limit
                  </label>
                  <input
                    type="number"
                    className="input-field w-full"
                    value={coverageDetails.limits.liability}
                    onChange={(e) => setCoverageDetails({
                      ...coverageDetails,
                      limits: { ...coverageDetails.limits, liability: parseInt(e.target.value) || 0 }
                    })}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comprehensive Limit
                  </label>
                  <input
                    type="number"
                    className="input-field w-full"
                    value={coverageDetails.limits.comprehensive}
                    onChange={(e) => setCoverageDetails({
                      ...coverageDetails,
                      limits: { ...coverageDetails.limits, comprehensive: parseInt(e.target.value) || 0 }
                    })}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collision Limit
                  </label>
                  <input
                    type="number"
                    className="input-field w-full"
                    value={coverageDetails.limits.collision}
                    onChange={(e) => setCoverageDetails({
                      ...coverageDetails,
                      limits: { ...coverageDetails.limits, collision: parseInt(e.target.value) || 0 }
                    })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        const selectedProductInfo = productTypes.find(p => p.id === selectedProduct);
        const selectedCustomerInfo = mockCustomers.find(c => c.id === selectedCustomer);
        
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Review Policy Details</h3>
            
            <div className="card p-6 bg-green-50 border-green-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Policy Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Product:</strong> {selectedProductInfo?.name}</div>
                    <div><strong>Policy Number:</strong> {policyDetails.policyNumber}</div>
                    <div><strong>Customer:</strong> {selectedCustomerInfo?.name}</div>
                    <div><strong>Agent:</strong> {policyDetails.agent}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Coverage & Premium</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Effective Date:</strong> {policyDetails.effectiveDate}</div>
                    <div><strong>Expiration Date:</strong> {policyDetails.expirationDate}</div>
                    <div><strong>Annual Premium:</strong> ${policyDetails.premium.toLocaleString()}</div>
                    <div><strong>Sum Insured:</strong> ${policyDetails.sumInsured.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Policy</h1>
        <p className="text-gray-600 mt-1">Follow the steps to create a new insurance policy</p>
      </div>

      <div className="max-w-4xl mx-auto">
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
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
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

        {/* Step Content */}
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
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          <div className="flex space-x-3">
            <button className="btn-secondary">
              Cancel
            </button>

            {currentStep === 5 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !canProceed()}
                className={`btn-primary ${
                  isSubmitting || !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Policy...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Policy
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
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}