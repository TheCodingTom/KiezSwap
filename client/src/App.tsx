import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import "./styles/LightDarkTheme.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import { ListingsContextProvider } from "./context/ListingsContext";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRouteComponent";
import NewListing from "./pages/NewListing";
import ListingDetails from "./pages/ListingDetails";
import UserListings from "./pages/UserListings";
import Messages from "./pages/Messages";
import Favourites from "./pages/Favourites";
import NavBarProfile from "./components/NavBarProfile";

import { ChatsContextProvider } from "./context/ChatsContext";
import BackButtonThemeContainer from "./components/BackButtonThemeContainer";
import NoMatchPage from "./pages/NoMatchPage";
import SingleChatPage from "./pages/SingleChatPage";

const Root = () => {
  // this route element is the parent of 3 pages, so they all contain the navbar
  return (
    // if I want to add a footer, it will go under outlet
    <>
      <NavBar />
      <BackButtonThemeContainer />
      <Outlet />
    </>
  );
};

const Layout = () => {
  // this route element is the parent of 3 pages, so they all contain the navbar
  return (
    // if I want to add a footer, it will go under outlet
    <>
      <NavBarProfile />
      <Outlet />
    </>
  );
};

function App() {
  console.log("Production or dev mode :>> ", import.meta.env.MODE);
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ListingsContextProvider>
            <ChatsContextProvider>
              <Routes>
                <Route path="/" />
                <Route element={<Root />}>
                  <Route index element={<Home />} />
                  <Route path="/listings" element={<Listings />} />
                  {/* <Route path="/newlisting" element={<NewListing />} /> */}
                  <Route
                    path="/listings/:listingId"
                    element={
                      <ProtectedRoute>
                        <ListingDetails />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/newlisting"
                    element={
                      <ProtectedRoute>
                        <NewListing />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route element={<Layout />}>
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile/userlistings"
                      element={
                        <ProtectedRoute>
                          <UserListings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile/messages"
                      element={
                        <ProtectedRoute>
                          <Messages />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile/messages/:chatId"
                      element={
                        <ProtectedRoute>
                          <SingleChatPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile/favourites"
                      element={
                        <ProtectedRoute>
                          <Favourites />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route path="*" element={<NoMatchPage />} />
                </Route>
              </Routes>
            </ChatsContextProvider>
          </ListingsContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
