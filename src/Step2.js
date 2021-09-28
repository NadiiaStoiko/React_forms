import React from "react";
import {MainContainer} from "./components/MainContainer";
import Typography from "@material-ui/core/Typography";
import {Form} from "./components/Form";
import {Input} from "./components/Input";
import {useHistory} from "react-router";
import {useForm} from "react-hook-form";
import {PrimaryButton} from "./components/PrimaryButton";
import * as yup from 'yup'; 
import {yupResolver} from "@hookform/resolvers/yup";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import parsePhoneNumberFromString from "libphonenumber-js";

const schema=yup.object().shape({
email: yup.string()
.email('Email should have correct format')
.required('Email is a requared fild')
})

const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if(!phoneNumber){
      return value
    }
  
    return (
      phoneNumber.formatInternational() 
    );
  };

  
export  const Step2=()=>{
    const history=useHistory();
    const{register, handleSubmit, formState: { errors }, watch}=useForm({
        mode:'onBlur',
        resolver: yupResolver(schema)
    });
    const hasPhone= watch('hasPhone');

    const onSubmit=(data)=>{
        history.push('./step3')
    }

return(
<MainContainer>
<Typography component='h2' variant='h5'> 🦄 Step2</Typography>
<Form onSubmit={handleSubmit(onSubmit)}>
    <Input 
    {...register('email')}
    id='email'
    type='email'
    label='Email'
    required 
    error={!!errors.email}
    helperText={errors?.email?.message}
    />
    <FormControlLabel control={
        <Checkbox 
        // name='hasPhone'
        {...register('hasPhone')}
        // inputRef={register}
        color='primary'>
        </Checkbox>
    } 
    label='Do you have a phone?'/>

    {
        hasPhone &&
        <Input
        ref={register}
        id='phoneNumber'
        type='tel'
        label='Phone number'
        {...register('phoneNumber')}
        onChange={(event) => {
            event.target.value = normalizePhoneNumber(event.target.value);
          }}
        
        />
    }
    <PrimaryButton>Next</PrimaryButton>
</Form>
</MainContainer>
)
}