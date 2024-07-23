import { Stepper, Step, StepLabel } from '@mui/material'

const steps = ['Order Placed', 'Confirmed', 'Cooking', 'Shipped', 'Delivered']

// eslint-disable-next-line react/prop-types
const OrderTraker = ({ activeStep }) => {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          // eslint-disable-next-line react/jsx-key
          <Step>
            <StepLabel className="" sx={{ color: '#b22830', fontSize: '44px' }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default OrderTraker
