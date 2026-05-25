import { Navigate, useParams } from "react-router-dom";

function LegacyItemRedirect() {
  const { id } = useParams();
  return <Navigate to={`/product/${id}`} replace />;
}

export { LegacyItemRedirect };
