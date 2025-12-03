"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { 
  ArrowLeft, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Shield,
  Check,
  ChevronRight,
  Plus,
  Trash2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { CustomerFormData, customerFormSchema } from '@/lib/validations/customer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { INDUSTRIES, COUNTRIES } from '@/lib/constants/customer';

const steps = [
  { id: 1, name: 'Customer Details', icon: User },
  { id: 2, name: 'Contacts', icon: Mail },
  { id: 3, name: 'Addresses', icon: MapPin },
  { id: 4, name: 'Review & Submit', icon: Check }
];

export default function CreateCustomerPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      type: 'Individual',
      firstName: '',
      lastName: '',
      companyName: '',
      primaryEmail: '',
      primaryPhone: '',
      website: '',
      portalAccess: false,
    },
    mode: 'onChange'
  });

  const { control, watch, handleSubmit, formState: { errors, isValid }, trigger, setValue } = methods;
  
  const customerType = watch('type');
  
  // Contact management
  const { fields: contactFields, append: appendContact, remove: removeContact } = useFieldArray({
    control,
    name: 'contacts'
  });

  // Address management  
  const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
    control,
    name: 'addresses'
  });

  // Initialize default contact and address
  useEffect(() => {
    if (contactFields.length === 0) {
      appendContact({
        type: 'Primary',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredContactMethod: 'Email',
        marketingOptIn: false,
        portalAccess: false,
        isActive: true
      });
    }
    
    if (addressFields.length === 0) {
      appendAddress({
        type: 'Registered',
        addressLine1: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'United States',
        isPrimary: true,
        isBilling: true,
        isMailing: true,
        isActive: true
      });
    }
  }, [contactFields.length, addressFields.length, appendContact, appendAddress]);

  // Auto-populate primary contact from customer details
  useEffect(() => {
    if (contactFields.length > 0) {
      const primaryEmail = watch('primaryEmail');
      const primaryPhone = watch('primaryPhone');
      const firstName = watch('firstName');
      const lastName = watch('lastName');
      
      if (primaryEmail) setValue(`contacts.0.email`, primaryEmail);
      if (primaryPhone) setValue(`contacts.0.phone`, primaryPhone);
      if (firstName) setValue(`contacts.0.firstName`, firstName);
      if (lastName) setValue(`contacts.0.lastName`, lastName);
    }
  }, [watch('primaryEmail'), watch('primaryPhone'), watch('firstName'), watch('lastName'), contactFields.length, setValue]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof CustomerFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = customerType === 'Individual' 
          ? ['type', 'firstName', 'lastName', 'primaryEmail', 'primaryPhone']
          : ['type', 'companyName', 'registrationNumber', 'industry', 'primaryEmail', 'primaryPhone', 'taxId'];
        break;
      case 2:
        fieldsToValidate = ['contacts'];
        break;
      case 3:
        fieldsToValidate = ['addresses'];
        break;
    }
    
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create customer');
      }
      
      const customer = await response.json();
      router.push(`/customers/${customer.id}`);
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create customer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Customer Type */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Type</CardTitle>
                <CardDescription>Select whether this is an individual or corporate customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setValue('type', 'Individual')}
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
                    onClick={() => setValue('type', 'Corporate')}
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

            {/* Customer Details */}
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
                        {...methods.register('firstName')}
                        error={errors.firstName?.message}
                        required
                      />
                      <Input
                        label="Last Name"
                        placeholder="Enter last name"
                        {...methods.register('lastName')}
                        error={errors.lastName?.message}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Date of Birth"
                        type="date"
                        {...methods.register('dateOfBirth')}
                        error={errors.dateOfBirth?.message}
                      />
                      <Select
                        label="Nationality"
                        options={COUNTRIES.map(country => ({ value: country, label: country }))}
                        value={watch('nationality') || ''}
                        onValueChange={(value) => setValue('nationality', value)}
                      />
                    </div>
                    
                    <Input
                      label="Tax ID / SSN"
                      placeholder="Enter tax identification number"
                      {...methods.register('taxId')}
                      error={errors.taxId?.message}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      label="Company Name"
                      placeholder="Enter company name"
                      {...methods.register('companyName')}
                      error={errors.companyName?.message}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Registration Number"
                        placeholder="Enter company registration number"
                        {...methods.register('registrationNumber')}
                        error={errors.registrationNumber?.message}
                        required
                      />
                      <Input
                        label="Incorporation Date"
                        type="date"
                        {...methods.register('incorporationDate')}
                        error={errors.incorporationDate?.message}
                      />
                    </div>
                    
                    <Select
                      label="Industry"
                      options={INDUSTRIES.map(industry => ({ value: industry, label: industry }))}
                      value={watch('industry') || ''}
                      onValueChange={(value) => setValue('industry', value)}
                      error={errors.industry?.message}
                      required
                    />
                    
                    <Textarea
                      label="Business Description"
                      placeholder="Describe the nature of the business"
                      {...methods.register('businessDescription')}
                      error={errors.businessDescription?.message}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Annual Revenue (USD)"
                        type="number"
                        placeholder="Enter annual revenue"
                        {...methods.register('annualRevenue', { valueAsNumber: true })}
                        error={errors.annualRevenue?.message}
                      />
                      <Input
                        label="Number of Employees"
                        type="number"
                        placeholder="Enter number of employees"
                        {...methods.register('employeeCount', { valueAsNumber: true })}
                        error={errors.employeeCount?.message}
                      />
                    </div>
                    
                    <Input
                      label="Tax ID / EIN"
                      placeholder="Enter tax identification number"
                      {...methods.register('taxId')}
                      error={errors.taxId?.message}
                      required
                    />
                  </>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
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
                    {...methods.register('primaryEmail')}
                    error={errors.primaryEmail?.message}
                    required
                  />
                  <Input
                    label="Primary Phone"
                    type="tel"
                    placeholder="Enter primary phone number"
                    {...methods.register('primaryPhone')}
                    error={errors.primaryPhone?.message}
                    required
                  />
                </div>
                
                <Input
                  label="Website"
                  type="url"
                  placeholder="https://www.example.com"
                  {...methods.register('website')}
                  error={errors.website?.message}
                />
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="portalAccess"
                    {...methods.register('portalAccess')}
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

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Add contact persons for this customer</CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendContact({
                      type: 'Secondary',
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      preferredContactMethod: 'Email',
                      marketingOptIn: false,
                      portalAccess: false,
                      isActive: true
                    })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactFields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">
                          Contact {index + 1}
                        </Badge>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeContact(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          label="Contact Type"
                          options={[
                            { value: 'Primary', label: 'Primary' },
                            { value: 'Secondary', label: 'Secondary' },
                            { value: 'Emergency', label: 'Emergency' },
                            { value: 'Billing', label: 'Billing' },
                            { value: 'Technical', label: 'Technical' }
                          ]}
                          value={watch(`contacts.${index}.type`) || 'Primary'}
                          onValueChange={(value) => setValue(`contacts.${index}.type`, value as any)}
                        />
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            label="First Name"
                            placeholder="First name"
                            {...methods.register(`contacts.${index}.firstName`)}
                            error={errors.contacts?.[index]?.firstName?.message}
                          />
                          <Input
                            label="Last Name"
                            placeholder="Last name"
                            {...methods.register(`contacts.${index}.lastName`)}
                            error={errors.contacts?.[index]?.lastName?.message}
                          />
                        </div>
                        
                        <Input
                          label="Email"
                          type="email"
                          placeholder="contact@example.com"
                          {...methods.register(`contacts.${index}.email`)}
                          error={errors.contacts?.[index]?.email?.message}
                        />
                        
                        <Input
                          label="Phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          {...methods.register(`contacts.${index}.phone`)}
                          error={errors.contacts?.[index]?.phone?.message}
                        />
                        
                        {customerType === 'Corporate' && (
                          <>
                            <Input
                              label="Job Title"
                              placeholder="CEO, Manager, etc."
                              {...methods.register(`contacts.${index}.designation`)}
                            />
                            <Input
                              label="Department"
                              placeholder="Finance, HR, IT, etc."
                              {...methods.register(`contacts.${index}.department`)}
                            />
                          </>
                        )}
                        
                        <Select
                          label="Preferred Contact Method"
                          options={[
                            { value: 'Email', label: 'Email' },
                            { value: 'Phone', label: 'Phone' },
                            { value: 'SMS', label: 'SMS' },
                            { value: 'WhatsApp', label: 'WhatsApp' }
                          ]}
                          value={watch(`contacts.${index}.preferredContactMethod`) || 'Email'}
                          onValueChange={(value) => setValue(`contacts.${index}.preferredContactMethod`, value as any)}
                        />
                        
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              {...methods.register(`contacts.${index}.marketingOptIn`)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">Marketing emails</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              {...methods.register(`contacts.${index}.portalAccess`)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">Portal access</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Address Information</CardTitle>
                    <CardDescription>Add addresses for this customer</CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendAddress({
                      type: 'Billing',
                      addressLine1: '',
                      city: '',
                      state: '',
                      postalCode: '',
                      country: 'United States',
                      isPrimary: false,
                      isBilling: false,
                      isMailing: false,
                      isActive: true
                    })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {addressFields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">
                          Address {index + 1}
                        </Badge>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAddress(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          label="Address Type"
                          options={[
                            { value: 'Registered', label: 'Registered' },
                            { value: 'Billing', label: 'Billing' },
                            { value: 'Mailing', label: 'Mailing' },
                            { value: 'Risk_Location', label: 'Risk Location' },
                            { value: 'Branch', label: 'Branch' }
                          ]}
                          value={watch(`addresses.${index}.type`) || 'Registered'}
                          onValueChange={(value) => setValue(`addresses.${index}.type`, value as any)}
                        />
                        
                        <Input
                          label="Label (Optional)"
                          placeholder="Head Office, Branch 1, etc."
                          {...methods.register(`addresses.${index}.label`)}
                        />
                        
                        <div className="md:col-span-2">
                          <Input
                            label="Address Line 1"
                            placeholder="Street address"
                            {...methods.register(`addresses.${index}.addressLine1`)}
                            error={errors.addresses?.[index]?.addressLine1?.message}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Input
                            label="Address Line 2 (Optional)"
                            placeholder="Apartment, suite, etc."
                            {...methods.register(`addresses.${index}.addressLine2`)}
                          />
                        </div>
                        
                        <Input
                          label="City"
                          placeholder="City"
                          {...methods.register(`addresses.${index}.city`)}
                          error={errors.addresses?.[index]?.city?.message}
                        />
                        
                        <Input
                          label="State/Province"
                          placeholder="State or Province"
                          {...methods.register(`addresses.${index}.state`)}
                          error={errors.addresses?.[index]?.state?.message}
                        />
                        
                        <Input
                          label="Postal Code"
                          placeholder="ZIP or Postal Code"
                          {...methods.register(`addresses.${index}.postalCode`)}
                          error={errors.addresses?.[index]?.postalCode?.message}
                        />
                        
                        <Select
                          label="Country"
                          options={COUNTRIES.map(country => ({ value: country, label: country }))}
                          value={watch(`addresses.${index}.country`) || 'United States'}
                          onValueChange={(value) => setValue(`addresses.${index}.country`, value)}
                        />
                        
                        <div className="md:col-span-2 flex items-center space-x-6">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              {...methods.register(`addresses.${index}.isPrimary`)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">Primary address</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              {...methods.register(`addresses.${index}.isBilling`)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">Billing address</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              {...methods.register(`addresses.${index}.isMailing`)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">Mailing address</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        const formData = watch();
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Customer Information</CardTitle>
                <CardDescription>Please review the information before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Customer Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <span className="ml-2 font-medium">{formData.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <span className="ml-2 font-medium">
                          {formData.type === 'Individual' 
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
                      {formData.type === 'Corporate' && (
                        <>
                          <div>
                            <span className="text-gray-500">Industry:</span>
                            <span className="ml-2 font-medium">{formData.industry}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Registration:</span>
                            <span className="ml-2 font-medium">{formData.registrationNumber}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contacts */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Contacts ({contactFields.length})</h4>
                  <div className="space-y-2">
                    {contactFields.map((contact, index) => (
                      <div key={contact.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm">
                          <span className="font-medium">
                            {watch(`contacts.${index}.firstName`)} {watch(`contacts.${index}.lastName`)}
                          </span>
                          <span className="text-gray-500 ml-2">({watch(`contacts.${index}.type`)})</span>
                          <div className="text-gray-600">
                            {watch(`contacts.${index}.email`)} • {watch(`contacts.${index}.phone`)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Addresses */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Addresses ({addressFields.length})</h4>
                  <div className="space-y-2">
                    {addressFields.map((address, index) => (
                      <div key={address.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm">
                          <span className="font-medium">{watch(`addresses.${index}.type`)}</span>
                          {watch(`addresses.${index}.label`) && (
                            <span className="text-gray-500 ml-2">({watch(`addresses.${index}.label`)})</span>
                          )}
                          <div className="text-gray-600">
                            {watch(`addresses.${index}.addressLine1`)}, {watch(`addresses.${index}.city`)}, {watch(`addresses.${index}.state`)} {watch(`addresses.${index}.postalCode`)}, {watch(`addresses.${index}.country`)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <p className="text-sm text-red-800">{submitError}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isValid}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Customer...
                    </>
                  ) : (
                    <>
                      Create Customer
                      <Check className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}