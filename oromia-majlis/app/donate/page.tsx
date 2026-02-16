"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Exchange rate: 1 USD = 55 ETB (approximate)
const EXCHANGE_RATE = 155;

const donationAmountsUSD = [10, 25, 50, 100, 250, 500];
const donationAmountsETB = [100, 250, 500, 1000, 2500, 5000];

export default function DonatePage() {
  const searchParams = useSearchParams();
  const [currency, setCurrency] = useState<"USD" | "ETB">("ETB");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const donationAmounts = currency === "USD" ? donationAmountsUSD : donationAmountsETB;
  const currencySymbol = currency === "USD" ? "$" : "";
  const currencyCode = currency === "USD" ? "USD" : "ETB";

  const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  const isDonorFormValid = finalAmount > 0 && donorName.trim() && donorEmail.trim();
  const paymentStatus = searchParams.get("payment");
  const paymentProvider = searchParams.get("provider");

  useEffect(() => {
    if (paymentStatus !== "success") {
      setShowSuccessBanner(false);
      return;
    }

    setShowSuccessBanner(true);
    const timer = setTimeout(() => {
      setShowSuccessBanner(false);

      const url = new URL(window.location.href);
      url.searchParams.delete("payment");
      url.searchParams.delete("provider");
      window.history.replaceState({}, "", url.toString());
    }, 60000);

    return () => clearTimeout(timer);
  }, [paymentStatus]);

  const finalAmountInOtherCurrency = useMemo(() => {
    if (currency === "USD") {
      return Math.round(finalAmount * EXCHANGE_RATE);
    } else {
      return Math.round(finalAmount / EXCHANGE_RATE);
    }
  }, [finalAmount, currency]);

  const handleDonate = async (method: string) => {
    setSelectedMethod(method);
    setPaymentError(null);

    if (!isDonorFormValid) return;

    if (method !== "stripe" && method !== "chapa") {
      return;
    }

    try {
      setIsProcessingPayment(true);
      const endpoint =
        method === "stripe" ? "/api/payments/stripe" : "/api/payments/chapa";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: currencyCode,
          donorName,
          donorEmail,
          donorPhone,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "Unable to start checkout session.");
      }

      window.location.href = data.url;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Payment initialization failed.";
      setPaymentError(message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleCurrencyChange = (newCurrency: "USD" | "ETB") => {
    setCurrency(newCurrency);
    setSelectedAmount(null);
    setCustomAmount("");
    setSelectedMethod(null);
    setPaymentError(null);
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
              <span className="text-sm font-semibold">🤲 Support the Work of Islam</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Support Oromia Majlis
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Contribute your Zakat, Sadaqah, and Waqf to strengthen our Ummah
            </p>
            <p className="text-lg text-white/80 mt-4 italic">
              “The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes…” (Qur’an 2:261)
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {showSuccessBanner && (
            <div className="mb-8 rounded-xl border border-green-200 bg-green-50/90 p-4 text-green-800 shadow-sm text-sm md:text-base">
              Payment was completed successfully via{" "}
              <strong className="capitalize">{paymentProvider || "gateway"}</strong>.
              May Allah reward you for your generous sadaqah.
            </div>
          )}
          {paymentStatus === "cancelled" && (
            <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              Payment was cancelled. You can update details and try again any time.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
            {/* Main Donation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
                {/* Currency Selector */}
                <div className="mb-8">
                  <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Select Currency
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCurrencyChange("USD")}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                        currency === "USD"
                          ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-100"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="text-xl mb-1">💵</div>
                      <div>USD ($)</div>
                    </button>
                    <button
                      onClick={() => handleCurrencyChange("ETB")}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                        currency === "ETB"
                          ? "bg-red-600 text-white shadow-lg ring-2 ring-red-100"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="text-xl mb-1">🇪🇹</div>
                      <div>ETB (Birr)</div>
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  Make a Sadaqah / Zakat / Waqf
                </h2>

                {/* Amount Selection */}
                <div className="mb-8">
                  <label className="block text-base font-semibold text-gray-900 mb-4">
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
                        className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                          selectedAmount === amount
                            ? "bg-red-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                      className="w-full px-4 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                      {currencyCode}
                    </span>
                  </div>
                  {finalAmount > 0 && (
                    <div className="mt-3 text-xs md:text-sm text-gray-600">
                      ≈ {currency === "USD" ? "ETB" : "USD"} {finalAmountInOtherCurrency.toLocaleString()} {currency === "USD" ? "ETB" : "USD"}
                    </div>
                  )}
                </div>

                {/* Donor Information */}
                <div className="mb-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Information
                  </h3>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Choose Payment Method
                  </h3>
                  <div className="space-y-6">
                    {/* Show methods based on currency */}
                    {currency === "USD" ? (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-600 uppercase mb-4 tracking-wide">
                          International Payment Methods
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {internationalMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => handleDonate(method.id)}
                              disabled={!isDonorFormValid || isProcessingPayment}
                              className="p-4 border-2 border-gray-300 rounded-xl hover:border-blue-600 hover:bg-blue-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left group"
                            >
                              <div className="text-3xl mb-2">{method.icon}</div>
                              <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-700">
                                {method.name}
                              </div>
                              <div className="text-xs text-gray-600">{method.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-600 uppercase mb-4 tracking-wide">
                          Local Payment Methods
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {localMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => handleDonate(method.id)}
                              disabled={!isDonorFormValid || isProcessingPayment}
                              className="p-4 border-2 border-gray-300 rounded-xl hover:border-red-600 hover:bg-red-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left group"
                            >
                              <div className="text-3xl mb-2">{method.icon}</div>
                              <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-red-700">
                                {method.name}
                              </div>
                              <div className="text-xs text-gray-600">{method.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {isProcessingPayment && (
                  <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-xs md:text-sm text-blue-800">
                    Redirecting to secure checkout...
                  </div>
                )}

                {paymentError && (
                  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-xs md:text-sm text-red-700">
                    {paymentError}
                  </div>
                )}

                {/* Payment Instructions */}
                {selectedMethod && (
                  <div className={`border-l-4 p-5 rounded-r-xl mb-6 text-sm ${
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
                          You will be redirected to Stripe&apos;s secure payment page to
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
                  Why Your Donation/Sadaqah Matters
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🏗️</span>
                    <span className="pt-1">
                      Support mosque construction, renovation, and maintenance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📚</span>
                    <span className="pt-1">Fund Qur’an education, madrasahs, and Islamic studies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🤝</span>
                    <span className="pt-1">Support da’wah activities and religious guidance programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💼</span>
                    <span className="pt-1">Help poor families, orphans, and vulnerable Muslims</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🌙</span>
                    <span className="pt-1">
                      Support Ramadan, Eid, and community welfare programs
                    </span>
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

