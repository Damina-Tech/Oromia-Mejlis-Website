"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// Exchange rate: 1 USD = 55 ETB (approximate)
const EXCHANGE_RATE = 55;

const donationAmountsUSD = [10, 25, 50, 100, 250, 500];
const donationAmountsETB = [100, 250, 500, 1000, 2500, 5000];

export default function DonatePage() {
  const [currency, setCurrency] = useState<"USD" | "ETB">("ETB");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  const donationAmounts = currency === "USD" ? donationAmountsUSD : donationAmountsETB;
  const currencySymbol = currency === "USD" ? "$" : "";
  const currencyCode = currency === "USD" ? "USD" : "ETB";

  const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  const finalAmountInOtherCurrency = useMemo(() => {
    if (currency === "USD") {
      return Math.round(finalAmount * EXCHANGE_RATE);
    } else {
      return Math.round(finalAmount / EXCHANGE_RATE);
    }
  }, [finalAmount, currency]);

  const handleDonate = (method: string) => {
    setSelectedMethod(method);
    // TODO: Implement payment processing
    console.log("Processing donation via:", method);
    console.log("Currency:", currency);
    console.log("Amount:", finalAmount, currencyCode);
    console.log("Donor:", { donorName, donorEmail, donorPhone });
  };

  const handleCurrencyChange = (newCurrency: "USD" | "ETB") => {
    setCurrency(newCurrency);
    setSelectedAmount(null);
    setCustomAmount("");
    setSelectedMethod(null);
  };

  // Payment methods based on currency
  const internationalMethods = [
    { id: "stripe", name: "Card Payment", icon: "💳", description: "Via Stripe" },
    { id: "paypal", name: "PayPal", icon: "💰", description: "Secure payment" },
    { id: "bank-transfer", name: "Bank Transfer", icon: "🏦", description: "International" },
  ];

  const localMethods = [
    { id: "chapa", name: "Chapa", icon: "📱", description: "Mobile & Card" },
    { id: "telebirr", name: "Telebirr", icon: "📲", description: "Mobile Money" },
    { id: "cbe", name: "CBE", icon: "🏛️", description: "Bank Transfer" },
    { id: "other-banks", name: "Other Banks", icon: "🏦", description: "Local Banks" },
  ];

  return (
    < main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-semibold">💝 Make a Difference Today</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Support Oromia Majlis Development
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Your contribution helps us build a better future for our community
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Together, we can create lasting positive change through infrastructure,
              education, healthcare, and community programs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Donation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 border border-gray-100">
                {/* Currency Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Select Currency
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCurrencyChange("USD")}
                      className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
                        currency === "USD"
                          ? "bg-blue-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="text-2xl mb-1">💵</div>
                      <div>USD ($)</div>
                    </button>
                    <button
                      onClick={() => handleCurrencyChange("ETB")}
                      className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
                        currency === "ETB"
                          ? "bg-red-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="text-2xl mb-1">🇪🇹</div>
                      <div>ETB (Birr)</div>
                    </button>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Make a Donation
                </h2>

                {/* Amount Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Select Amount ({currencyCode})
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          selectedAmount === amount
                            ? "bg-red-600 text-white shadow-md scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                        }`}
                      >
                        {currencySymbol}
                        {amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder={`Enter custom amount in ${currencyCode}`}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      min="1"
                      step="0.01"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                      {currencyCode}
                    </span>
                  </div>
                  {finalAmount > 0 && (
                    <div className="mt-3 text-sm text-gray-600">
                      ≈ {currency === "USD" ? "ETB" : "USD"} {finalAmountInOtherCurrency.toLocaleString()} {currency === "USD" ? "ETB" : "USD"}
                    </div>
                  )}
                </div>

                {/* Donor Information */}
                <div className="mb-8 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Your Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Choose Payment Method
                  </h3>
                  <div className="space-y-6">
                    {/* Show methods based on currency */}
                    {currency === "USD" ? (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 uppercase mb-4 tracking-wide">
                          International Payment Methods
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {internationalMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => handleDonate(method.id)}
                              disabled={!finalAmount || !donorName || !donorEmail}
                              className="p-5 border-2 border-gray-300 rounded-xl hover:border-blue-600 hover:bg-blue-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left group"
                            >
                              <div className="text-3xl mb-2">{method.icon}</div>
                              <div className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700">
                                {method.name}
                              </div>
                              <div className="text-sm text-gray-600">{method.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 uppercase mb-4 tracking-wide">
                          Local Payment Methods
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {localMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => handleDonate(method.id)}
                              disabled={!finalAmount || !donorName || !donorEmail}
                              className="p-5 border-2 border-gray-300 rounded-xl hover:border-red-600 hover:bg-red-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left group"
                            >
                              <div className="text-3xl mb-2">{method.icon}</div>
                              <div className="font-semibold text-gray-900 mb-1 group-hover:text-red-700">
                                {method.name}
                              </div>
                              <div className="text-sm text-gray-600">{method.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Instructions */}
                {selectedMethod && (
                  <div className={`border-l-4 p-6 rounded-r-xl mb-6 ${
                    currency === "USD" 
                      ? "bg-blue-50 border-blue-600" 
                      : "bg-red-50 border-red-600"
                  }`}>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span>📋</span>
                      Payment Instructions
                    </h4>
                    {selectedMethod === "stripe" && (
                      <div className="text-sm text-gray-700 space-y-3">
                        <p>
                          You will be redirected to Stripe's secure payment page to
                          complete your donation of <strong className="text-blue-700">{currencySymbol}{finalAmount.toLocaleString()} {currencyCode}</strong>.
                        </p>
                        <p>
                          After successful payment, you will receive a confirmation email
                          with your donation receipt.
                        </p>
                      </div>
                    )}
                    {selectedMethod === "paypal" && (
                      <div className="text-sm text-gray-700 space-y-3">
                        <p>
                          You will be redirected to PayPal to complete your donation of{" "}
                          <strong className="text-blue-700">{currencySymbol}{finalAmount.toLocaleString()} {currencyCode}</strong>.
                        </p>
                        <p>
                          You can pay with your PayPal account or credit/debit card.
                        </p>
                      </div>
                    )}
                    {selectedMethod === "bank-transfer" && (
                      <div className="text-sm text-gray-700 space-y-3">
                        <p>
                          Please transfer <strong className="text-blue-700">{currencySymbol}{finalAmount.toLocaleString()} {currencyCode}</strong> to:
                        </p>
                        <div className="font-mono bg-white p-4 rounded-lg border border-gray-200">
                          Bank: Commercial Bank of Ethiopia
                          <br />
                          Account: 1234567890
                          <br />
                          SWIFT: CBETETAA
                          <br />
                          Reference: DON-{Date.now()}
                        </div>
                        <p>
                          After transfer, please email the receipt to
                          <a href="mailto:donations@oromiamajlis.com" className="text-blue-600 hover:underline ml-1">
                            donations@oromiamajlis.com
                          </a>
                        </p>
                      </div>
                    )}
                    {selectedMethod === "chapa" && (
                      <div className="text-sm text-gray-700 space-y-3">
                        <p>
                          You will be redirected to Chapa to complete your donation of{" "}
                          <strong className="text-red-700">{finalAmount.toLocaleString()} {currencyCode}</strong>.
                        </p>
                        <p>
                          You can pay using mobile money, bank card, or bank account.
                        </p>
                      </div>
                    )}
                    {selectedMethod === "telebirr" && (
                      <div className="text-sm text-gray-700 space-y-3">
                        <p>
                          Complete your donation of <strong className="text-red-700">{finalAmount.toLocaleString()} {currencyCode}</strong>{" "}
                          using Telebirr.
                        </p>
                        <p>
                          Dial *809# and follow the prompts, or use the Telebirr app.
                        </p>
                        <div className="font-mono bg-white p-4 rounded-lg border border-gray-200">
                          Merchant Code: 123456
                          <br />
                          Reference: DON-{Date.now()}
                        </div>
                      </div>
                    )}
                    {(selectedMethod === "cbe" || selectedMethod === "other-banks") && (
                      <div className="text-sm text-gray-700 space-y-3">
                        <p>
                          Please transfer <strong className="text-red-700">{finalAmount.toLocaleString()} {currencyCode}</strong> to:
                        </p>
                        <div className="font-mono bg-white p-4 rounded-lg border border-gray-200">
                          {selectedMethod === "cbe"
                            ? "Bank: Commercial Bank of Ethiopia"
                            : "Bank: Your Preferred Local Bank"}
                          <br />
                          Account Name: Oromia Majlis Administration
                          <br />
                          Account Number: 1234567890
                          <br />
                          Reference: DON-{Date.now()}
                        </div>
                        <p>
                          After transfer, please email the receipt to
                          <a href="mailto:donations@oromiamajlis.com" className="text-red-600 hover:underline ml-1">
                            donations@oromiamajlis.com
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Donation Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>💳</span>
                  Donation Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-semibold text-gray-900 px-3 py-1 bg-white rounded-md">
                      {currencyCode}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-gray-900">
                      {finalAmount > 0 
                        ? `${currencySymbol}${finalAmount.toLocaleString()} ${currencyCode}` 
                        : "Select amount"}
                    </span>
                  </div>
                  {finalAmount > 0 && (
                    <div className="text-xs text-gray-500 text-center pt-2 border-t">
                      ≈ {currency === "USD" ? "ETB" : "USD"} {finalAmountInOtherCurrency.toLocaleString()} {currency === "USD" ? "ETB" : "USD"}
                    </div>
                  )}
                  <div className="border-t-2 border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className={`text-2xl font-bold ${
                        currency === "USD" ? "text-blue-600" : "text-red-600"
                      }`}>
                        {finalAmount > 0 
                          ? `${currencySymbol}${finalAmount.toLocaleString()} ${currencyCode}` 
                          : `0 ${currencyCode}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Donate */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span>💝</span>
                  Why Your Donation Matters
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🏗️</span>
                    <span className="pt-1">
                      Support infrastructure development and city improvements
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📚</span>
                    <span className="pt-1">Fund education and healthcare initiatives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🤝</span>
                    <span className="pt-1">Enable community programs and social services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💼</span>
                    <span className="pt-1">Create job opportunities and economic growth</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span>📞</span>
                  Need Help?
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✉️</span>
                    <div>
                      <strong className="text-gray-900">Email:</strong>
                      <br />
                      <a href="mailto:donations@oromiamajlis.com" className="text-blue-600 hover:underline">
                        donations@oromiamajlis.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📱</span>
                    <div>
                      <strong className="text-gray-900">Phone:</strong>
                      <br />
                      <a href="tel:+251911111111" className="text-blue-600 hover:underline">
                        +251911111111
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🕐</span>
                    <div>
                      <strong className="text-gray-900">Hours:</strong>
                      <br />
                      Mon - Sat 8:00 am - 6:00 pm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

