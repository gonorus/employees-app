import ImageUpload from '@molecules/ImageUpload';
import { useRef } from 'react';

import { type WizardState } from './WizardStore';

interface Step2Props {
  useStore: () => WizardState;
}

const Step2: React.FC<Step2Props> = ({ useStore }) => {
  const { photo, employmentType, officeLocation, notes } = useStore();
  const photoRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h3>Employment Details</h3>
      <form>
        <div className="form-group">
          <label htmlFor='photo'>
            Photo
          </label>
          <input ref={photoRef} type='text' id='photo' name="photo" defaultValue={photo} hidden />
          <ImageUpload
            value={photo ?? null}
            onImageSelect={(base64) => {
              if(photoRef.current) {
                photoRef.current.value = base64 ?? '';
              }
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor='employmentType'>
            Employment Type
          </label>
          <select id="employmentType" name='employmentType' defaultValue={employmentType}>
            <option value={'Full-time'}>Full-time</option>
            <option value={'Part-time'}>Part-time</option>
            <option value={'Contract'}>Contract</option>
            <option value={'Intern'}>Intern</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor='officeLocation'>
            Office Location
          </label>
          <input type='text' id='officeLocation' name='officeLocation' defaultValue={officeLocation} />
        </div>
        <div className="form-group">
          <label htmlFor='notes'>
            Notes
          </label>
          <textarea id="notes" name="notes">{notes}</textarea>
        </div>
      </form>
    </div>
  );
};

export default Step2;
