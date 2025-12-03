'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Building2, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { INDUSTRIES, COUNTRIES } from '@/lib/constants/customer';

const steps = [
  { id: 1, name: 'Customer Details', icon: User },
  { id: 2, name: 'Contacts', icon: User },
  { id: 3, name: 'Addresses', icon: User },
  { id: 4, name: 'Review & Submit', icon: Check },
];

export default function CreateCustomerPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [customerType, setCustomerType] = useState<'Individual' | 'Corporate'>('Individual');
  const [formData, setFormData] = useState({
    type: 'Individual',
    firstName: '',
    lastName: '',
    companyName: '',
    primaryEmail: '',
    primaryPhone: '',
    website: '',
    industry: '',
    registrationNumber: '',
    taxId: '',
    portalAccess: false
  });

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const customer = await response.json();
        router.push(`/customers/${customer.id}`);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Type</CardTitle>
                <CardDescription>Select whether this is an individual or corporate customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCustomerType('Individual')}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      customerType === 'Individual'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <User className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                    <div className="font-medium">Individual</div>
                    <div className="text-sm text-gray-500">Personal customer</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setCustomerType('Corporate')}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      customerType === 'Corporate'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                    <div className="font-medium">Corporate</div>
                    <div className="text-sm text-gray-500">Business customer</div>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {customerType === 'Individual' ? 'Personal Information' : 'Company Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {customerType === 'Individual' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                      <Input
                        label="Last Name"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <Input
                      label="Tax ID / SSN"
                      placeholder="Enter tax identification number"
                      value={formData.taxId}
                      onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      label="Company Name"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Registration Number"
                        placeholder="Enter company registration number"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                        required
                      />
                      <Select
                        label="Industry"
                        options={INDUSTRIES.map(industry => ({ value: industry, label: industry }))}
                        value={formData.industry}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                      />
                    </div>
                    
                    <Input
                      label="Tax ID / EIN"
                      placeholder="Enter tax identification number"
                      value={formData.taxId}
                      onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                      required
                    />
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Primary Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Primary Email"
                    type="email"
                    placeholder="Enter primary email address"
                    value={formData.primaryEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryEmail: e.target.value }))}
                    required
                  />
                  <Input
                    label="Primary Phone"
                    type="tel"
                    placeholder="Enter primary phone number"
                    value={formData.primaryPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryPhone: e.target.value }))}
                    required
                  />
                </div>
                
                <Input
                  label="Website"
                  type="url"
                  placeholder="https://www.example.com"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                />
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="portalAccess"
                    checked={formData.portalAccess}
                    onChange={(e) => setFormData(prev => ({ ...prev, portalAccess: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="portalAccess" className="text-sm font-medium text-gray-700">
                    Enable customer portal access
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Customer Information</CardTitle>
                <CardDescription>Please review the information before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Customer Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <span className="ml-2 font-medium">{customerType}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <span className="ml-2 font-medium">
                          {customerType === 'Individual' 
                            ? `${formData.firstName} ${formData.lastName}`
                            : formData.companyName
                          }
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <span className="ml-2 font-medium">{formData.primaryEmail}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <span className="ml-2 font-medium">{formData.primaryPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Step {currentStep}</h3>
                <p className="text-gray-600">This step is under construction</p>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/customers')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Customer</h1>
            <p className="text-gray-600">Add a new customer to your system</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep === step.id
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : currentStep > step.id
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button onClick={nextStep}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Create Customer
              <Check className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}