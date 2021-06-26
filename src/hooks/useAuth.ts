import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAUth() {
    return  useContext(AuthContext);
}
