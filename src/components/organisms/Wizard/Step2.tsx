import ImageUpload from '@molecules/ImageUpload';

const Step2: React.FC = () => {
  return (
    <div>
      <h3>Employment Details</h3>
      <form>
        <div className="form-group">
          <label htmlFor='photo'>
            Photo
          </label>
          <ImageUpload onImageSelect={(base64) => {
            console.log('[GonoDebug] Selected image (base64):', base64 ? base64.substring(0, 30) + '...' : null);
          }} />
        </div>
        <div className="form-group">
          <label htmlFor='employment-type'>
            Employment Type
          </label>
          <select id="employment-type" name='employment-type'>
            <option value={'Full-time'}>Full-time</option>
            <option value={'Part-time'}>Part-time</option>
            <option value={'Contract'}>Contract</option>
            <option value={'Intern'}>Intern</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor='office-location'>
            Office Location
          </label>
          <input type='text' id='office-location' name='office-location' />
        </div>
        <div className="form-group">
          <label htmlFor='notes'>
            Notes
          </label>
          <textarea id="notes" name="notes" />
        </div>
      </form>
    </div>
  );
};

export default Step2;
