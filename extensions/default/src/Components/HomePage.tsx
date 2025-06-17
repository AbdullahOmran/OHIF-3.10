import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission (e.g., send to API or email service)
    console.log('Contact form submitted:', { firstName, lastName, email, organization, message });
    setFirstName('');
    setLastName('');
    setEmail('');
    setOrganization('');
    setMessage('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3 seconds
  };

  // Scroll handler for in-page navigation
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-gray-200">
      {/* Navigation */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <Link
            to="/"
            className="flex items-center space-x-2"
          >
            <svg
              className="h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              />
            </svg>
            <span className="text-xl font-bold">TherAInostics</span>
          </Link>
          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              to="/home#features"
              className="text-sm font-medium transition-colors hover:text-blue-600"
              onClick={() => scrollToSection('features')}
            >
              Features
            </Link>
            <Link
              to="/home#pricing"
              className="text-sm font-medium transition-colors hover:text-blue-600"
              onClick={() => scrollToSection('pricing')}
            >
              Pricing
            </Link>
            <Link
              to="/home#contact"
              className="text-sm font-medium transition-colors hover:text-blue-600"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-800 hover:text-blue-600">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-black py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  AI-based Assessment and Prediction of Lutetium Treatment Efficacy using PET/CT
                  Images
                </h1>
                <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-400">
                  TherAInostics uses advanced AI to assess and predict Lutetium-PSMA treatment
                  efficacy for prostate cancer patients through PET/CT image analysis.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/signup">
                    <button className="flex transform items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-transform hover:scale-105 hover:bg-blue-700">
                      Get Started
                    </button>
                  </Link>
                  <Link
                    to="/home#features"
                    onClick={() => scrollToSection('features')}
                  >
                    <button className="transform rounded-md border border-gray-600 px-6 py-3 font-medium text-gray-200 transition-transform hover:scale-105 hover:bg-gray-800 hover:text-blue-600">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto lg:mx-0">
                <img
                  src="https://eu-images.contentstack.com/v3/assets/blt14ac89070d5e4751/bltd22643ea2f01cfa6/65f454ae7410c5040aeccc78/AI_photo_illustration.png?width=1280&auto=webp&quality=95&format=jpg&disable=upscale"
                  alt="AI-based PET/CT image analysis"
                  className="rounded-lg object-cover shadow-xl"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="bg-black py-20"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-800 px-3 py-1 text-sm text-blue-200">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Advanced AI for Personalized Cancer Care
                </h2>
                <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[900px] text-gray-400">
                  Our platform combines cutting-edge AI with medical expertise to deliver precise
                  treatment assessment and prediction.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="rounded-full bg-blue-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-blue-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Treatment Assessment</h3>
                <p className="text-center text-gray-400">
                  Evaluate Lutetium treatment efficacy through advanced PET/CT image analysis.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="rounded-full bg-indigo-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Predictive Analytics</h3>
                <p className="text-center text-gray-400">
                  Forecast treatment effectiveness based on imaging features and clinical data.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="rounded-full bg-indigo-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Personalized Medicine</h3>
                <p className="text-center text-gray-400">
                  Tailor treatment plans based on individual patient data and AI insights.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="rounded-full bg-yellow-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-yellow-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Real-time Monitoring</h3>
                <p className="text-center text-gray-400">
                  Track treatment progress with continuous assessment and feedback.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="rounded-full bg-red-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-red-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Research Integration</h3>
                <p className="text-center text-gray-400">
                  Incorporate the latest research findings into our AI models for continuous
                  improvement.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="rounded-full bg-green-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Secure Data Handling</h3>
                <p className="text-center text-gray-400">
                  HIPAA-compliant platform with advanced encryption for patient data protection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Packages Section */}
        <section
          id="pricing"
          className="bg-gray-800 py-20"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-800 px-3 py-1 text-sm text-blue-200">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Subscription Packages
                </h2>
                <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[900px] text-gray-400">
                  Choose the plan that best fits your clinical needs and budget.
                </p>
              </div>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {/* Basic Plan */}
              <div className="flex flex-col rounded-lg border border-gray-700 bg-gray-900 shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Private Cloud (Dedicated PVC)</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-bold">$499</span>
                    <span className="text-sm text-gray-400">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/signup">
                      <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Professional Plan */}
              <div className="relative flex flex-col rounded-lg border border-blue-600 bg-gray-900 shadow-sm">
                <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Managed Cloud (Shared PVC)</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-bold">$999</span>
                    <span className="text-sm text-gray-400">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/signup">
                      <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="flex flex-col rounded-lg border border-gray-700 bg-gray-900 shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-bold">On Premises</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5 text-blue-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>feature</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/signup">
                      <button className="w-full rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-800 hover:text-blue-600">
                        Contact Sales
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section
          id="contact"
          className="bg-black py-20"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-blue-800 px-3 py-1 text-sm text-blue-200">
                  Contact Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get in Touch
                </h2>
                <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-400">
                  Have questions about TherAInostics? Our team is here to help you implement
                  AI-powered precision medicine in your practice.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-gray-400">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-400">info@therainostics.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-gray-400">123 Medical Center</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-sm">
                {isSubmitted && (
                  <div className="animate-fade-in mb-4 rounded-md bg-blue-800 p-4 text-center text-blue-200">
                    Thank you! Your message has been sent.
                  </div>
                )}
                <form
                  className="space-y-4"
                  onSubmit={handleContactSubmit}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium"
                      >
                        First name
                      </label>
                      <input
                        id="first-name"
                        className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="John"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium"
                      >
                        Last name
                      </label>
                      <input
                        id="last-name"
                        className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Doe"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="john.doe@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="organization"
                      className="text-sm font-medium"
                    >
                      Organization
                    </label>
                    <input
                      id="organization"
                      className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Medical Center Name"
                      value={organization}
                      onChange={e => setOrganization(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="w-full rounded-md border border-gray-600 bg-gray-900 p-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="How can we help you?"
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-800">
        <div className="container mx-auto flex flex-col gap-4 py-10 px-4 md:flex-row md:gap-8 md:px-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
              <span className="text-lg font-bold">TherAInostics</span>
            </div>
            <p className="text-sm text-gray-400">
              AI-based Assessment and Prediction of Lutetium Treatment Efficacy using PET/CT Images
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="text-sm font-medium text-gray-200">Company</p>
            <nav className="flex flex-col gap-2 text-sm text-gray-400">
              <Link
                to="#"
                className="transition-colors hover:text-blue-600"
              >
                About
              </Link>
              <Link
                to="#"
                className="transition-colors hover:text-blue-600"
              >
                Careers
              </Link>
              <Link
                to="#"
                className="transition-colors hover:text-blue-600"
              >
                News
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="text-sm font-medium text-gray-200">Resources</p>
            <nav className="flex flex-col gap-2 text-sm text-gray-400">
              <Link
                to="#"
                className="transition-colors hover:text-blue-600"
              >
                Blog
              </Link>
              <Link
                to="#"
                className="transition-colors hover:text-blue-600"
              >
                Documentation
              </Link>
              <Link
                to="#"
                className="transition-colors hover:text-blue-600"
              >
                Research
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="text-sm font-medium text-gray-200">Legal</p>
            <nav className="flex flex-col gap-2 text-sm text-gray-400">
              <Link
                to="#"
                className="transition-colors hover:text-blue-600"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="transition-colors hover:text-blue-600"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="transition-colors hover:text-blue-600"
              >
                HIPAA Compliance
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-t bg-gray-800 py-6">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
            <p className="text-center text-sm text-gray-400">
              © 2025 TherAInostics. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  {/* Replace with your custom Facebook SVG path if needed */}
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  {/* Replace with your custom Twitter/X SVG path if needed */}
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect
                    width="20"
                    height="20"
                    x="2"
                    y="2"
                    rx="5"
                    ry="5"
                  ></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line
                    x1="17.5"
                    x2="17.51"
                    y1="6.5"
                    y2="6.5"
                  ></line>
                  {/* Replace with your custom Instagram SVG path if needed */}
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect
                    width="4"
                    height="12"
                    x="2"
                    y="9"
                  ></rect>
                  <circle
                    cx="4"
                    cy="4"
                    r="2"
                  ></circle>
                  {/* Replace with your custom LinkedIn SVG path if needed */}
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Tailwind Animation Keyframes */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};
