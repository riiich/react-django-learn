import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";

const Logout = () => {
	localStorage.clear();
	return <Navigate to="/login" />;
};

const RegisterAndLogout = () => {
	localStorage.clear();
	return <Register />;
};

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/register" element={<RegisterAndLogout />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
