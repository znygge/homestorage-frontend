import React, { FC } from 'react';
import styles from './addForm.module.css';

interface AddFormProps {}

const AddForm: FC<AddFormProps> = () => (
  <div className={styles.AddForm}>
    AddForm Component
  </div>
);

export default AddForm;
