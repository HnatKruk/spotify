import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { FC } from 'react'

interface StepWrapperProps {
  activeStep: number;
}

const steps = [
  'Track Information',
  'Download picture',
  'Download Track'
]

const StepWrapper: FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep} >
        {steps.map((step, index) => <Step key={index} completed={activeStep > index}>
          <StepLabel>{step}</StepLabel>
        </Step>)}
      </Stepper>
      <Grid container justifyContent='center' style={{ margin: '70px 0', height: 270 }}>
        <Card style={{
          width: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {children}
        </Card>
      </Grid>
    </Container>
  )
}

export default StepWrapper