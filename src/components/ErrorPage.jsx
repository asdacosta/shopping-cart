import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <p>
      Unexpected Error. Kindly click <Link to="/">here</Link> to go back to
      home.
    </p>
  );
}

export { ErrorPage };
