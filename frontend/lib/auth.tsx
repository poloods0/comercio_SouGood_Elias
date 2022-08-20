import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserContext } from '../contexts/userContext';

export default function UseAuth(Component: any, authRoles: string[]) {
  const Auth = (props: any) => {
    
    const {role} = useUserContext();
    const router = useRouter();

    useEffect(() => {
      if (!authRoles.includes(role)) router.push('login');
    }, []);

    return <Component {...props}/>;

  };

  return Auth;
}