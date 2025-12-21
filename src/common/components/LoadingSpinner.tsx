// components/LoadingSpinner.tsx
import { PropagateLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div style={styles.container}>
      <PropagateLoader color="#1DB954" size={15} speedMultiplier={1} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212",
  },
};

export default LoadingSpinner;
