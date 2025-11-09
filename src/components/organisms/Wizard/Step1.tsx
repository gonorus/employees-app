const Step1: React.FC = () => {
  return (
    <div>
      <h3>Basic Information</h3>
      <form>
        <div className="form-group">
          <label htmlFor='fullName'>
            Full Name
          </label>
          <input type='text' id='fullName' name='fullName' />
        </div>
        <div className="form-group">
          <label htmlFor='email'>
            Email
          </label>
          <input type='email' id='email' name='email' />
        </div>
        <div className="form-group">
          <label htmlFor='department'>
            Department
          </label>
          <input type='text' id='department' name='department' />
        </div>
        <div className="form-group">
          <label htmlFor='role'>
            Role
          </label>
          <select id="role" name="role">
            <option value={'Ops'}>Ops</option>
            <option value={'Admin'}>Admin</option>
            <option value={'Engineer'}>Engineer</option>
            <option value={'Finance'}>Finance</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor='employee-id'>
            Employee ID
          </label>
          <input type='text' id='employee-id' name='employee-id' value='asd' disabled />
        </div>
      </form>
    </div>
  );
};

export default Step1;
