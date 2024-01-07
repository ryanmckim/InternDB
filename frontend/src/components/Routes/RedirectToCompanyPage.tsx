import { useParams, Navigate } from 'react-router-dom';

export default function RedirectToCompanyPage() {
  const { id } = useParams();
  return <Navigate to={`/company/${id}/page/1`} replace />;
}
