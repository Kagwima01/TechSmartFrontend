import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ProductsScreen from "./screens/ProductsScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import CheckOutScreen from "./screens/CheckoutScreen";
import CancelScreen from "./screens/CancelScreen";
import SuccessScreen from "./screens/SuccessScreen";
import YourOrdersScreen from "./screens/YourOrdersScreen";
import AdminConsoleScreen from "./screens/AdminConsoleScreen";
import Footer from "./components/Footer";

import axios from "axios";
import { VStack, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const [googleClient, setGoogleClient] = useState(null);

  useEffect(() => {
    const googleKey = async () => {
      const { data: googleId } = await axios.get("/api/config/google");
      setGoogleClient(googleId);
    };
    googleKey();
  }, [googleClient]);

  return (
    <ChakraProvider>
      {!googleClient ? (
        <VStack pt="37vh">
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="cyan.500"
            size="xl"
          />
        </VStack>
      ) : (
        <GoogleOAuthProvider clientId={googleClient}>
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<LandingScreen />} />
                <Route path="/products" element={<ProductsScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/registration" element={<RegistrationScreen />} />
                <Route path="/checkout" element={<CheckOutScreen />} />
                <Route path="/cancel" element={<CancelScreen />} />
                <Route path="/success" element={<SuccessScreen />} />
                <Route path="/success" element={<SuccessScreen />} />
                <Route path="/order-history" element={<YourOrdersScreen />} />

                <Route path="/admin-console" element={<AdminConsoleScreen />} />
                <Route
                  path="/email-verify/:token"
                  element={<EmailVerificationScreen />}
                />
                <Route
                  path="/password-reset/:token"
                  element={<PasswordResetScreen />}
                />
              </Routes>
            </main>
            <Footer />
          </Router>
        </GoogleOAuthProvider>
      )}
    </ChakraProvider>
  );
};

export default App;
