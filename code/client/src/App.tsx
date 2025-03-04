import { Route, Routes } from "react-router";
import { HomePage } from "./Home";
import { UserPage } from "./UserPage";

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:userId" element={<UserPage />} />
        </Routes>
    );
};

export default App;
