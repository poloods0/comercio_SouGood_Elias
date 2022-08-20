import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import styles from '../../assets/styles/components/cart.module.css';
import { useState } from 'react';

const OrganizationSelector = () => {
  const [organization, setOrganization] = useState<number>(0);

  const handleChange = (event: SelectChangeEvent) => {
    setOrganization(event.target.value as number);
  };

  return (
    <Select className={styles.selector} id="organization" onChange={handleChange} value={organization}>
      <MenuItem value={0}>Fundación Beata Laura Vicuña</MenuItem>
      <MenuItem value={1}>Sindicato Clínica Alemana</MenuItem>
    </Select>
  );
};

export default OrganizationSelector;
