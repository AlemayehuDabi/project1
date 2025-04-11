import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ZimanyHome } from "./pages/MainPage";
// import { HostAccommodation } from "./pages/HostAccomodationPage";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/LoginPage";
// import AddPropertyPage from "./pages/AddPropertyPage";
// import DetailPropertyPage from "./pages/DetailPropertyPage";
// import ChatPage from "./pages/ChatPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { FavoritesPage } from "./pages/FavoritesPage";
// import { getUserChats } from "../src/redux/slices/chatSlice";
// import { AppDispatch, RootState } from "../src/redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import EventListPage from "./pages/eventList";

const App = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const user = useSelector((state: RootState) => state.auth.user)
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ZimanyHome />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/event-list" element={<EventListPage />} />

        {/* protected  route */}
        {/* <Route element={<ProtectedRoute />}> */}
        {/* Add other routes as needed */}
        {/* <Route path="/accommodations" element={<HostAccommodation />} />
          <Route path="/earnings" element={<div>Earnings Page</div>} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route
            path="/addproperty"
            element={
              <AddPropertyPage
                isOpen={false}
                onClose={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route path="/property-detail" element={<DetailPropertyPage />} />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
