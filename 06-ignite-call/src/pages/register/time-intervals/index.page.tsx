import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalItem,
  Intervalinputs,
  IntervalsContainer,
} from './styles'
import { ArrowRight } from 'phosphor-react'

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Definas os intervalos de horários que vocês está disponível em cada
          dia da semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form">
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>
            <Intervalinputs>
              <TextInput size="sm" type="time" step={60}></TextInput>
              <TextInput size="sm" type="time" step={60}></TextInput>
            </Intervalinputs>
          </IntervalItem>
        </IntervalsContainer>

        <Button type="submit">
          Próximo Passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
