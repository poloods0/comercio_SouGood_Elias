import React, {useState, useEffect} from 'react';
import Route from '../../types/route';
import { getAdminRoutes } from '../../lib/routes';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const ManagementPanel = () => {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    setRoutes(getAdminRoutes());
  }, []);

  return (
    <>
      {routes.map((route, index) => {
        return (
          <li key={index} className={`nav-link fs-4`}>
            <Button className="w-25" onClick={() => router.push(`/${route.href}`)} variant="outline-success">{route.title}</Button>
          </li>
        );
      })}
    </>
  );
}

export default ManagementPanel;
