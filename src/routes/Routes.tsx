import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./protected";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import SignupOfficeX from "../pages/Auth/SignUpOfficeX";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassowrd";
import Pricing from "../pages/Subscription/Pricing";
import PaymentSuccess from "../pages/Subscription/PaymentSuccess";
import SignupSuccess from "../pages/Auth/SignUpSuccess";
import VerificationSuccess from "../pages/Auth/VerificationSuccess";

// Import all your components here (same as before)
function AppRoutes() {

    return (
        <Router>
            <Routes>
                {/* add signup, change password, recover password */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup_office_x" element={<SignupOfficeX />} />
                <Route path="/signup_success" element={<SignupSuccess />} />
                <Route path="/verification_success" element={<VerificationSuccess />} />
                <Route path="/forgot_password" element={<ForgotPassword />} />
                <Route path="/reset_password" element={<ResetPassword />} />
                <Route path="/subscribe" element={<Pricing />} />
                <Route path="/payment_successful" element={<PaymentSuccess />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Profile />} />
                    {/* <Route path="/upgrade" element={<Upgrade />} /> */}
                </Route>

                <Route path="*" element={<div>Page not found</div>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;