import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "../components/ui/Button";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  const error = useRouteError();
  let message = "Something unexpected happened.";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className={styles.page}>
      <p className="label-caps">Error</p>
      <h1 className="display-heading">We hit a snag</h1>
      <p className={styles.message}>{message}</p>
      <Link to="/">
        <Button variant="primary">Return home</Button>
      </Link>
    </div>
  );
}

export { ErrorPage };
