import { useState, useEffect } from "react";
import Background from "../../components/common/Background";

const PaymentStatus = () => {
  const [paymentStatus, setPaymentStatus] = useState<"loading" | "succeeded" | "failed" | "active">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get("status") ?? "failed";

      setPaymentStatus(status as "succeeded" | "failed" | "active");

      try {
        // Verify payment with your backend API
        // const result = await verify_payment(status, paymentId);
        console.log("payment status")
        
        // if (result.verified && (result.status === "succeeded" || result.status === "active")) {
        //   setPaymentStatus(result.status);
        //   setMessage("Payment verified successfully!");
          
        //   // Store success in localStorage for extension to detect
        //   localStorage.setItem('ashdeck_payment_success', JSON.stringify({
        //     timestamp: Date.now(),
        //     status: 'completed',
        //     paymentId: paymentId
        //   }));

        // } else {
        //   setPaymentStatus("failed");
        //   setMessage(result.message || "Payment verification failed.");
        // }
      } catch (error) {
        console.error("Payment verification error:", error);
        setPaymentStatus("failed");
        setMessage("Unable to verify payment status. Please contact support.");
      }
    };

    verifyPaymentStatus();
  }, []);

  const handleOpenNewTab = () => {
    window.open('', '_blank');
    setTimeout(() => {
      window.close();
    }, 1000);
  };

  const handleRetryPayment = () => {
    // Redirect back to pricing page or specific payment retry flow
    window.location.href = '/pricing';
  };

  if (paymentStatus === "loading") {
    return (
      <div className="bg-white">
        <Background background={"/images/9.jpg"} />
        <div className="flex flex-col justify-center items-center h-screen relative z-10">
          <div className="bg-white/90 backdrop-blur-md border border-black/10 shadow-lg rounded-2xl py-8 px-8 w-full max-w-md mx-4 text-center">
            <div className="flex flex-col items-center mb-6">
              <img
                width={80}
                src="/images/ashdeck-logo-2.png"
                alt="Ashdeck Logo"
                className="mb-4"
              />
              <h1 className="text-2xl font-semibold text-black">Verifying Payment...</h1>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-black/60">Please wait while we confirm your payment.</p>
          </div>
        </div>
      </div>
    );
  }

  const isSuccessful = paymentStatus === "succeeded" || paymentStatus === "active";

  return (
    <div className="bg-white">
      <Background background={"/images/9.jpg"} />
      <div className="flex flex-col justify-center items-center h-screen relative z-10">
        {/* Status Content */}
        <div className="bg-white/90 backdrop-blur-md border border-black/10 shadow-lg rounded-2xl py-8 px-8 w-full max-w-md mx-4">
          {/* Header with Logo */}
          <div className="flex flex-col items-center mb-6">
            <img
              width={80}
              src="/images/ashdeck-logo-2.png"
              alt="Ashdeck Logo"
              className="mb-4"
            />
            <h1 className="text-2xl font-semibold text-black text-center">
              {isSuccessful ? "Payment Successful! 🎉" : "Payment Failed"}
            </h1>
          </div>

          {/* Status Message */}
          <div className="text-center mb-2">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isSuccessful ? "bg-green-100" : "bg-red-100"
            }`}>
              {isSuccessful ? (
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <p className={`mb-2 text-lg font-medium ${
              isSuccessful ? "text-black/70" : "text-red-600"
            }`}>
              {isSuccessful ? "Welcome to Ashdeck Premium!" : "Unable to Process Payment"}
            </p>
            <p className="text-black/60 text-sm mb-6">
              {message || (
                isSuccessful 
                  ? "Your subscription is now active. Open a new tab to start using all premium features."
                  : "There was an issue processing your payment. Please try again or contact support."
              )}
            </p>
          </div>

          {/* Features List (Successful) or Error Details (Failed) */}
          {isSuccessful ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-green-800 font-semibold mb-2 text-sm">You have access to all features including:</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited task management
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited Focus Time
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited website blocking
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All new features
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  And much more!!!
                </li>
              </ul>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="text-red-800 font-semibold mb-2 text-sm">What to do next:</h3>
              <ul className="text-red-700 text-sm space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Check your payment method details and try again
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Ensure your card has sufficient funds
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Contact your bank if issues persist
                </li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {isSuccessful ? (
              <div></div>
            ) : (
              <>
                <button
                  onClick={handleRetryPayment}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200"
                >
                  Try Payment Again
                </button>
              </>
            )}
          </div>
        </div>

        {/* Support Message */}
        <div className="mt-6 text-center">
          <p className="text-black/50 text-sm">
            Need help?{" "}
            <a 
              href="mailto:support@ashdeck.com" 
              className={`hover:underline ${
                isSuccessful ? "text-green-600 hover:text-green-700" : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;