// components/LoadingSpinner.tsx
import { PropagateLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div style={styles.container}>
      <PropagateLoader color="#F43F5E" size={15} speedMultiplier={1} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px 0",
  },
};

export default LoadingSpinner;
