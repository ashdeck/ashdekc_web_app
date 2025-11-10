import { useState, useEffect } from "react";
import Background from "../../components/common/Background";
import { subscribe } from "../../api/subscribe";
import { toast } from "react-toastify";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    // If email param or localStorage email exists, skip form
    if (emailParam || storedEmail) {
      const finalEmail = emailParam || storedEmail!;
      setEmail(finalEmail);
      setName(storedName || "");
      if (!emailParam) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("email", finalEmail);
        window.history.replaceState({}, "", newUrl.toString());
      }
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, []);

  const handleToggle = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "annual" : "monthly"));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    // Save to localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);

    // Update URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("email", email);
    window.history.replaceState({}, "", newUrl.toString());

    setShowForm(false);
  };

  const handleSubscribe = async (pkg: "lifetime" | "monthly" | "annual") => {
    try {
      if (!email || !name) {
        toast.error("Please provide your name and email first.");
        setShowForm(true);
        return;
      }

      const data = {
        name,
        email,
        package: pkg,
      };

      const res = await subscribe(data);
      console.log("Subscription response:", res);
      toast.success(`Redirecting to checkout for ${pkg} plan...`);

      if (res?.checkout_url) {
        window.location.href = res.checkout_url; // redirect to checkout
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to initialize checkout. Please try again.");
    }
  };

  return (
    <div className="bg-white">
      <Background background={"/images/9.jpg"} />
      <div className="flex flex-col justify-center xl:flex-row items-center h-screen">
        {/* ===== LEFT PANEL (Form) ===== */}
        {showForm ? (
          <div className="bg-primary h-full w-[30%] flex items-center justify-center">
            <div className="flex flex-col justify-center items-center h-1/2 gap-4">
              <div className="text-white max-w-72 mb-8 flex justify-center items-center">
                <div className="h-full flex items-center pr-4 justify-center border-r border-black">
                  <img
                    width={100}
                    src="/images/ashdeck-logo-2.png"
                    alt="Ashdeck Logo"
                  />
                </div>
                <h1 className="font-semibold text-2xl text-center pl-4 text-black">
                  Enter Your Info
                </h1>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="mb-2 flex flex-col gap-8 w-[16rem] sm:w-[20rem] lg:w-[24rem]">
                  <div className="w-full">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-md py-2 w-full text-black px-2 outline-none bg-transparent border placeholder:text-black/50"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-md py-2 w-full text-black px-2 outline-none bg-transparent border placeholder:text-black/50"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 text-white bg-green-500 rounded py-2 px-2 outline-none w-full"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        ) : (
          // ===== PRICING SECTION =====
          <div className="flex flex-col justify-center items-center py-24 px-4 relative z-10">
            <div className="text-white max-w-[24rem] mb-8 flex justify-center items-center">
              <div className="h-full md:flex items-center pr-4 justify-center border-r border-black hidden">
                <img
                  width={100}
                  src="/images/ashdeck-logo-2.png"
                  alt="Ashdeck Logo"
                />
              </div>
              <h1 className="font-semibold text-2xl text-center md:text-left pl-4 text-black">
                Choose your Plan
              </h1>
            </div>

            <p className="text-black/70 mb-10 text-center max-w-xl">
              Whether you need a one-time boost or ongoing access, pick the plan that suits you best.
            </p>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* === LIFETIME DEAL === */}
              <div className="bg-white/80 backdrop-blur-md border border-black/10 shadow-md rounded-2xl py-4 px-6 w-[350px] flex flex-col items-center relative">
                <div className="flex justify-between items-center w-full mb-4">
                  <h2 className="text-2xl font-semibold">Lifetime Deal</h2>
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Limited Time Offer
                  </span>
                </div>
                <p className="text-black/60 mb-4 text-center">
                  Pay once and enjoy lifetime access to premium tools.
                </p>
                <p className="text-5xl font-bold text-black mb-2">$25</p>
                <p className="text-black/60 mb-6">One payment. No renewals.</p>
                <button
                  onClick={() => handleSubscribe("lifetime")}
                  className="py-2 bg-green-500 hover:bg-green-600 absolute right-6 left-6 bottom-4 text-white rounded-md transition-all"
                >
                  Get Lifetime Access
                </button>
              </div>

              {/* === PREMIUM PLAN === */}
              <div className="bg-primary/90 border relative border-black/10 shadow-md rounded-2xl py-4 px-6 w-[350px] flex flex-col items-center text-black">
                <div className="flex justify-between items-center w-full mb-4">
                  <h2 className="text-2xl font-semibold">Premium Plan</h2>
                  {billingCycle === "annual" && (
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Save 50%
                    </span>
                  )}
                </div>
                <p className="text-black/70 mb-6 text-center">
                  Unlock all features and continuous updates.
                </p>

                {/* Toggle switch */}
                <div className="flex items-center justify-center mb-6">
                  <span
                    className={`cursor-pointer font-semibold ${
                      billingCycle === "monthly" ? "text-black" : "text-black/40"
                    }`}
                    onClick={() => setBillingCycle("monthly")}
                  >
                    Monthly
                  </span>

                  <div
                    onClick={handleToggle}
                    className={`mx-3 w-12 h-6 rounded-full relative cursor-pointer transition-all ${
                      billingCycle === "annual" ? "bg-green-500" : "bg-black/20"
                    }`}
                  >
                    <div
                      className={`absolute top-[2px] left-[2px] w-5 h-5 bg-black rounded-full transition-transform duration-300 ${
                        billingCycle === "annual" ? "translate-x-6 bg-white" : ""
                      }`}
                    ></div>
                  </div>

                  <span
                    className={`cursor-pointer font-semibold ${
                      billingCycle === "annual" ? "text-black" : "text-black/40"
                    }`}
                    onClick={() => setBillingCycle("annual")}
                  >
                    Annual
                  </span>
                </div>

                <p className="text-5xl font-bold text-black mb-2">
                  {billingCycle === "monthly" ? "$6" : "$3"}
                </p>
                <p className="text-black/60 mb-16">per month</p>

                <button
                  onClick={() => handleSubscribe(billingCycle)}
                  className="bottom-4 right-6 left-6 absolute py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-all"
                >
                  Choose {billingCycle === "monthly" ? "Monthly" : "Annual"} Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
