import { type BasicInfo,BasicInfoRepository } from '@infrastructures/BasicInfoRepository';
import { useQuery } from '@tanstack/react-query';
import { type ChangeEvent,useMemo, useState } from 'react';

import { type WizardState } from './WizardStore';

interface Step1Props {
  useStore: () => WizardState;
}

const Step1: React.FC<Step1Props> = ({ useStore }) => {
  const { fullName, email, department, role } = useStore();
  const [formRole, setFormRole] = useState(role ?? 'Ops');

  const { data } = useQuery<BasicInfo[], Error>({
    queryKey: [formRole],
    queryFn: () => BasicInfoRepository.getBasicInfoByRole(formRole),
  });

  const generatedEmployeeID = useMemo(() => {
    if(data) {
      return `${formRole.substring(0,3).toUpperCase()}-${(data.length + 1).toString().padStart(3, '0')}`;
    }
  }, [formRole, data]);

  const OnRoleChangeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    setFormRole(evt.target.value);
  };

  return (
    <div>
      <h3>Basic Information</h3>
      <form>
        <div className="form-group">
          <label htmlFor='fullName'>
            Full Name
          </label>
          <input type='text' id='fullName' name='fullName' defaultValue={fullName} />
        </div>
        <div className="form-group">
          <label htmlFor='email'>
            Email
          </label>
          <input type='email' id='email' name='email' defaultValue={email} />
        </div>
        <div className="form-group">
          <label htmlFor='department'>
            Department
          </label>
          <input type='text' id='department' name='department' defaultValue={department} />
        </div>
        <div className="form-group">
          <label htmlFor='role'>
            Role
          </label>
          <select id="role" name="role" defaultValue={formRole} onChange={OnRoleChangeHandler}>
            <option value={'Ops'}>Ops</option>
            <option value={'Admin'}>Admin</option>
            <option value={'Engineer'}>Engineer</option>
            <option value={'Finance'}>Finance</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor='employeeID'>
            Employee ID
          </label>
          <input type='text' id='employeeID' name='employeeID' value={generatedEmployeeID} disabled />
        </div>
      </form>
    </div>
  );
};

export default Step1;
