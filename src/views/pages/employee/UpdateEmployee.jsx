import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { selectEmployee } from './../../../redux/modules/employee/selector';
import { connect, useDispatch } from 'react-redux';
import InputField from './../../../components/employee-input-field/InputField';
import * as EMPLOYEE_ACTION from './../../../redux/modules/employee/actions'
import * as EMPLOYEE_API from './../../../services/employee'
import { useParams } from 'react-router';


const DEFAULT_PIN_CODE_PROPS = {
    num1: '',
    num2: '',
    num3: '',
    num4: ''
};

const UpdateEmployee = ({ EMPLOYEE }) => 
{
    const { id } = useParams();
    const dispatch = useDispatch();

    const [ employee, setEmployee ] = useState(EMPLOYEE.employee);
    const [ pin, setPin ] = useState(DEFAULT_PIN_CODE_PROPS);

    const onClickSave = () => {
        dispatch(EMPLOYEE_ACTION.updateEmployeeStart({
            ...employee,
            role_id: employee?.role?.value,
            pin_code: Object.values(pin).join('')
        }));
    }

    const onLoadFetchEmployee = async () =>
    {
        try {
            const { data } = await EMPLOYEE_API.findByIDAsync(id);

            const [ num1, num2, num3, num4 ] = data.pin_code.split('');
            const role = data.roles[0];
            
            setEmployee({
                ...data,
                role: {
                    label: role.name,
                    value: role.name
                }
            });

            setPin({ num1, num2, num3, num4 });

        } catch ({ message }) {}
    }

    useEffect(() => 
    {
        onLoadFetchEmployee();

        return () => {
            setEmployee(EMPLOYEE.employee);
            setPin(DEFAULT_PIN_CODE_PROPS);
        }
    }, []);

    return (
        <InputField 
            employee={ employee }
            setEmployee={ setEmployee }
            pin={ pin }
            setPin={ setPin }
            onClickSave={ onClickSave }

        />
    )
}

const mapStateToProps = createStructuredSelector({
    EMPLOYEE: selectEmployee
});

export default connect(mapStateToProps)(UpdateEmployee)
