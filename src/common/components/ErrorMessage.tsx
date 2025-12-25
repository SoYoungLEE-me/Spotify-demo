import Alert from "@mui/material/Alert";

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <Alert security="error">{errorMessage}</Alert>;
};

export default ErrorMessage;
